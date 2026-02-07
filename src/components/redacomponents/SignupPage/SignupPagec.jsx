import React, { useState } from "react";
import "./SignupPagec.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const SignupPagec = () => {
  const navigate = useNavigate();
  const { registerClient } = useAuth();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState(""); // Added city field as per backend

  const handleSignup = async () => {
    const n = name.trim();
    const ph = phone.trim();
    const e = email.trim();
    const p = password.trim();
    const c = city.trim();

    if (!n) return alert("Name cannot be empty");
    if (!ph) return alert("Phone cannot be empty");
    if (!/^\d{10}$/.test(ph)) return alert("Phone number must be 10 digits");
    if (!e) return alert("Email cannot be empty");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) return alert("Invalid email");
    if (!p) return alert("Password cannot be empty");
    if (p.length < 6) return alert("Password must be at least 6 characters");

    const result = await registerClient({
      fullName: n,
      email: e,
      password: p,
      phone: ph,
      city: c
    });

    if (result.status === "success") {
      alert("Client account created successfully!");
      navigate("/explore");
    } else {
      alert(result.error || "Signup failed");
    }
  };

  return (
    <div className="logincontainer">
      <img className="loginback" src="/back5.png" alt="background" />
      <img className="logocomplet" src="/logo12.png" alt="logo" />

      <div className="labels-container">
        <p className="font0">WED HALL</p>
        <p className="font1">Sign Up as a Client</p>

        <label className="label">
          <span className="label-text">Full Name:</span>
          <input
            className="input"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>

        <label className="label">
          <span className="label-text">Phone Number:</span>
          <input
            className="input"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </label>

        <label className="label">
          <span className="label-text">Email:</span>
          <input
            className="input"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>

        <label className="label">
          <span className="label-text">Password:</span>
          <input
            className="input"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>

        <label className="label">
          <span className="label-text">City:</span>
          <input
            className="input"
            value={city}
            onChange={e => setCity(e.target.value)}
          />
        </label>

        <button onClick={handleSignup} className="loginn">
          Sign Up
        </button>

        <p className="font3">Already have an account?</p>
        <p onClick={() => navigate("/login")} className="font3">Log In now</p>
      </div>
    </div>
  );
};

export default SignupPagec;
