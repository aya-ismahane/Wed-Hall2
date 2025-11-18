// import React from "react";
// import "./LogInPage.css";
// import { useNavigate } from "react-router-dom";

// // si les images sont dans src, tu peux aussi les importer:
// // import back from "./back5.png";
// // import logo from "./logo11.png";

// const LogInPage = () => {
//   const navigate = useNavigate();
//   return (
  
    
//     <div className="logincontainer">

//       {/* Si images dans public: src="/back5.png" ; si importées : src={back} */}


//       <img className="loginback" src="/back5.png" alt="background" />
//       <img className="logocomplet" src="/logo12.png" alt="logo" />



//       <div className="labels-container">
//         <p className="font0">WED HALL</p>
//         <p className="font1">LOG IN</p>

//         <label className="label">
//           <span className="label-text">Username:</span>
//           <input className="input" type="text" />
//         </label>

//         <label className="label">
//           <span className="label-text">Password:</span>
//           <input className="input" type="password" />
//         </label>

//         <p style={{ cursor: "pointer" }} onClick={() => navigate("/login2")} className="font3">Forgot Password?</p>
        

        

//         <button className="loginn"  onClick={() => navigate("/Landingpage")}>Login</button>
//         <p className="font3">Don't have an account?</p>
//         <p className="font3">Register Now</p>


//       </div>
//     </div>
//   );
// };

// export default LogInPage;


import React, { useState } from "react";
import "./LogInPage.css";
import { useNavigate } from "react-router-dom";
import { clients } from "../../../clients";
import { owners } from "../../../owners";

const LogInPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [arrclient] = useState(clients || []);
  const [arrowner] = useState(owners || []);

  const handleLogin = () => {
    const e = email.trim();
    const p = password.trim();

    if (!e) return alert("email cannot be empty");
    if (!p) return alert("password cannot be empty");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e))
      return alert("invalid email format");

    // look for email in both lists
    const client = arrclient.find((c) => c.email === e);
    const owner = arrowner.find((o) => o.email === e);

    const user = client || owner;

    if (!user) return alert("No account found with this email");

    // check password (make sure your objects store passwords!)
    if (user.password !== p)
      return alert("Incorrect password");

    // Login success
    navigate("/landingpage");
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
