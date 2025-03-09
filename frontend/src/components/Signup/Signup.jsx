import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState(""); // Add email state
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const calculatePasswordStrength = (pwd) => {
    const hasLower = /[a-z]/.test(pwd);
    const hasUpper = /[A-Z]/.test(pwd);
    const hasSpecial = /[!@#$%^&*]/.test(pwd);
    const length = pwd.length >= 8;

    if (hasLower && hasUpper && hasSpecial && length) return "Strong";
    if ((hasLower || hasUpper) && length) return "Medium";
    return "Weak";
  };

  useEffect(() => {
    const newErrors = {};

    if (username && username.length < 8) {
      newErrors.username = "Username must be at least 8 characters";
    }

    if (password) {
      if (
        !/[a-z]/.test(password) ||
        !/[A-Z]/.test(password) ||
        !/[!@#$%^&*]/.test(password)
      ) {
        newErrors.password =
          "Must include lowercase, uppercase, and special character";
      }
    }

    if (confirmPassword && confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords must match";
    }

    if (email && !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email format is invalid";
    }

    setErrors(newErrors);
    setPasswordStrength(calculatePasswordStrength(password));
  }, [username, password, confirmPassword, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!username) newErrors.username = "Username is required";
    if (!password) newErrors.password = "Password is required";
    if (!confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required";
    if (!email) newErrors.email = "Email is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (username.length < 8) {
      setErrors({ username: "Username must be at least 8 characters" });
      return;
    }

    if (
      !/[a-z]/.test(password) ||
      !/[A-Z]/.test(password) ||
      !/[!@#$%^&*]/.test(password)
    ) {
      setErrors({
        password: "Must include lowercase, uppercase, and special character",
      });
      return;
    }

    if (password !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords must match" });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors({ email: "Email format is invalid" });
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/user/register", {
        username,
        password,
        email, // Send email to backend
      });

      alert("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      setAuthError(error.response?.data.message || "Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <img className="user-icon" src="/user.png" alt="User Icon" />
      <h2 className="signup-title">Create a New Account</h2>

      {authError && <div className="auth-error">{authError}</div>}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <div className="input-wrapper">
            <img
              className="input-icon"
              src="/user Input.png"
              alt="User-Input Icon"
            />
            <input
              type="text"
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
          </div>
          {errors.username && <div className="error">{errors.username}</div>}
        </div>

        <div className="input-group">
          <div className="input-wrapper">
            <img
              className="input-icon"
              src="/padlock.png"
              alt="Password Icon"
            />
            <input
              type={showPassword ? "text" : "password"}
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <span
              className={`eye-icon ${showPassword ? "eye-open" : "eye-closed"}`}
              onClick={() => setShowPassword(!showPassword)}
            ></span>
          </div>
          {errors.password && <div className="error">{errors.password}</div>}
          {password && (
            <div className={`strength ${passwordStrength.toLowerCase()}`}>
              Password Strength: {passwordStrength}
            </div>
          )}
        </div>

        <div className="input-group">
          <div className="input-wrapper">
            <img
              className="input-icon"
              src="/padlock.png"
              alt="Password Icon"
            />
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="input-field"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
            />
            <span
              className={`eye-icon ${
                showConfirmPassword ? "eye-open" : "eye-closed"
              }`}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            ></span>
          </div>
          {errors.confirmPassword && (
            <div className="error">{errors.confirmPassword}</div>
          )}
        </div>

        <div className="input-group">
          <div className="input-wrapper">
            <img className="input-icon" src="/email.png" alt="Email Icon" />
            <input
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          {errors.email && <div className="error">{errors.email}</div>}
        </div>

        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
