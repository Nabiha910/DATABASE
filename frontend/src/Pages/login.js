import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import "./login.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  // Static Admin credentials
  const adminEmail = "nabiha";
  const adminPassword = "password123";

  const handleLoginSuccess = (response) => {
    const userObj = {
      name: "Google User",
      email: "user@gmail.com", // Note: response.credential doesn't give full profile by default
    };

    setUser(userObj);
    localStorage.setItem("loggedInUser", JSON.stringify(userObj));
    navigate("/women"); // redirect after login
  };

  const handleLoginFailure = (error) => {
    console.log("Login Failed:", error);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleManualLogin = (e) => {
    e.preventDefault();

    // Hardcoded admin login check
    if (
      formData.username === adminEmail &&
      formData.password === adminPassword
    ) {
      const userObj = {
        name: "Admin Nabiha",
        email: adminEmail,
        isAdmin: true,
      };

      setUser(userObj);
      localStorage.setItem("loggedInUser", JSON.stringify(userObj));
      navigate("/Admin"); // Redirect to admin page
    } else {
      alert("Invalid credentials ❌");
    }
  };

  const backgroundStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL + "/images/c1.jpeg"})`,
  };

  return (
    <div className="page-wrapper">
      <div className="background-image" style={backgroundStyle} />

      <div className="bubbles">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="login-box">
        <h2>Login to Your Account</h2>

        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
        />

        <p>OR</p>

        <form onSubmit={handleManualLogin}>
          <input
            type="text"
            name="username"
            placeholder="Username (Admin: nabiha)"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password (Admin: password123)"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>

        {user && (
          <div className="user-info">
            <h3>Logged in as:</h3>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
