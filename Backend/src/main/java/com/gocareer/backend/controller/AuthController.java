package com.gocareer.backend.controller;

import com.gocareer.backend.model.User;
import com.gocareer.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // =========================
    // SIGNUP
    // =========================
    @PostMapping("/signup")
    public String signup(
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam("mobile") String mobile,
            @RequestParam(value = "skills", required = false) String skills,
            @RequestParam(value = "document", required = false) MultipartFile document
    ) {

        // Check email exists
        if (userRepository.findByEmail(email).isPresent()) {
            return "Email already exists";
        }

        // Create user object
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(password); // plain text (OK for demo)
        user.setMobile(mobile);
        user.setSkills(skills);

        // -------- FILE UPLOAD FIX --------
        if (document != null && !document.isEmpty()) {
            try {
                // Create uploads folder if not exists
                Path uploadDir = Paths.get("uploads").toAbsolutePath();
                Files.createDirectories(uploadDir);

                // Save file
                Path filePath = uploadDir.resolve(document.getOriginalFilename());
                document.transferTo(filePath.toFile());

                // Store filename in DB
                user.setDocument(document.getOriginalFilename());

            } catch (Exception e) {
                e.printStackTrace();
                return "File upload failed";
            }
        }

        userRepository.save(user);
        return "Signup successful";
    }

    // =========================
    // LOGIN
    // =========================
    @PostMapping("/login")
    public String login(
            @RequestParam("email") String email,
            @RequestParam("password") String password
    ) {

        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return "Login successful";
        }

        return "Invalid email or password";
    }
}
