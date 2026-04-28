import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();

  // Track user info dynamically
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  // Update user info on mount and whenever localStorage changes
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);

    // Listen to storage events in case user logs in/out in another tab
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setShowProfile(false);
    navigate("/"); // go to home
  };

  return (
    <header className="header">
      <div className="left">
        <img src="/Images/4.jpg" alt="Logo" className="logo" />
        <span className="title">GO CAREER</span>
      </div>

      <div className="right">
        {/* Show login/signup if user is NOT logged in */}
        {!user && (
          <>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/signup")}>Sign Up</button>
          </>
        )}

        {/* Show profile icon if user IS logged in */}
        {user && (
          <div className="profile-container">
            <span
              className="profile-icon"
              onClick={() => setShowProfile(!showProfile)}
              style={{ cursor: "pointer", fontSize: "24px" }}
            >
              &#x22EE; {/* vertical three dots */}
            </span>

            {showProfile && (
              <div className="profile-dropdown">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
