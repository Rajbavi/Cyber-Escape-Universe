import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/accounts/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Registration successful! 🎉");

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (error) {
      setError(
        "Cannot connect to the server. Make sure Django is running."
      );
    }
  };

  return (
    <div className="register-page">
      <div className="register-box">

        <div className="register-logo">🛡️</div>

        <h1>Create Account</h1>

        <p className="register-subtitle">
          Join the Cyber Escape Universe
        </p>

        <form onSubmit={handleSubmit}>

          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
          />

          {error && (
            <p style={{ color: "#ff5c5c", marginTop: "15px" }}>
              {error}
            </p>
          )}

          {message && (
            <p style={{ color: "#00f5ff", marginTop: "15px" }}>
              {message}
            </p>
          )}

          <button
            type="submit"
            className="register-submit"
          >
            Create Account
          </button>
        </form>

        <p className="login-text">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;