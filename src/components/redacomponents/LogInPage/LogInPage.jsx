import React, { useState } from "react";
import "./LogInPage.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const LogInPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const e = email.trim();
    const p = password.trim();

    if (!e) return alert("email cannot be empty");
    if (!p) return alert("password cannot be empty");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e))
      return alert("invalid email format");

    // Call API login
    const result = await login(e, p);

    if (result.success) {
      const { role } = result;
      if (role === 'owner') {
        navigate("/profile");
      } else {
        navigate("/landingpage");
      }
    } else {
      alert(result.error || "Login failed");
    }
  };

  return (
    <div className="logincontainer">
      <img className="loginback" src="/back5.png" alt="background" />
      <img className="logocomplet" src="/logo12.png" alt="logo" />

      <div className="labels-container">
        <p className="font0">WED HALL</p>
        <p className="font1">LOG IN</p>

        <label className="label">
          <span className="label-text">Email:</span>
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </label>

        <label className="label">
          <span className="label-text">Password:</span>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </label>

        <p
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/login2")}
          className="font3"
        >
          Forgot Password?
        </p>

        <button className="loginn" type="button" onClick={handleLogin}>
          Login
        </button>

        <p className="font3">Don't have an account?</p>
        <p
          className="font3"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/signupch")}
        >
          Register Now
        </p>
      </div>
    </div>
  );
};

export default LogInPage;
