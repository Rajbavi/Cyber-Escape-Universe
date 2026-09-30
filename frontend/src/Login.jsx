import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/accounts/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("access_token", data.access);

        setMessage("Login successful! 🎉");

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        setError(data.error || "Invalid username or password");
      }
    } catch (error) {
      setError(
        "Cannot connect to the server. Make sure Django is running."
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">

        <div className="login-logo">🛡️</div>

        <h1>Welcome Back</h1>

        <p className="login-subtitle">
          Enter the Cyber Escape Universe
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

          <label>Password</label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
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

          <button type="submit" className="login-submit">
            Login
          </button>

        </form>

        <p className="register-text">
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </p>

        <Link to="/">
          <button className="back-home">
            ← Back to Home
          </button>
        </Link>

      </div>
    </div>
  );
}

export default Login;