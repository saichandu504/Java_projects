import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data to send
    const dataToSend = new URLSearchParams();
    dataToSend.append("email", loginData.email);
    dataToSend.append("password", loginData.password);

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        body: dataToSend,
      });

      const message = await response.text();

      if (message === "Login successful") {
        alert(message);

        // Store full user info in localStorage
        // For demonstration, name is static; in real app, fetch from backend
        const user = { name: "Sai Chandu", email: loginData.email };
        localStorage.setItem("user", JSON.stringify(user));

        // Trigger storage event so Header updates immediately
        window.dispatchEvent(new Event("storage"));

        // Redirect to Dashboard
        navigate("/dashboard");
      } else {
        alert(message);
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Check console for details.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={loginData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>

      <p className="signup-link">
        Don’t have an account?{" "}
        <span onClick={() => navigate("/signup")}>Sign Up</span>
      </p>
    </div>
  );
}

export default Login;
