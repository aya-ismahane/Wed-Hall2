import React, { useState } from "react";
import "./SignupPageo.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const SignupPageo = () => {
  const navigate = useNavigate();
  const { registerOwner, login } = useAuth();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wilaya, setWilaya] = useState(""); // Added wilaya field

  const handleSignup = async () => {
    const n = name.trim();
    const ph = phone.trim();
    const e = email.trim();
    const p = password.trim();
    const w = wilaya.trim();

    if (!n) return alert("Name cannot be empty");
    if (!ph) return alert("Phone cannot be empty");
    if (!/^\d{10}$/.test(ph)) return alert("Phone number must be 10 digits");
    if (!e) return alert("Email cannot be empty");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) return alert("Invalid email");
    if (!p) return alert("Password cannot be empty");
    if (p.length < 6) return alert("Password must be at least 6 characters");
    if (!w) return alert("Wilaya cannot be empty");

    const result = await registerOwner({
      fullName: n,
      email: e,
      password: p,
      phone: ph,
      wilaya: w
    });

    if (result.status === "success") {
      const loginResult = await login(e, p);
      if (loginResult.success) {
        navigate("/OwnerProfilePage");
      } else {
        alert("Account created. Please log in.");
        navigate("/login");
      }
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
        <p className="font1">Sign Up as an Owner</p>

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
          <span className="label-text">Wilaya:</span>
          <input
            className="input"
            value={wilaya}
            onChange={e => setWilaya(e.target.value)}
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

export default SignupPageo;
