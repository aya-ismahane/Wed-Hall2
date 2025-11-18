// import React from "react";
// import "./SignupPageo2.css";
// import { useNavigate } from "react-router-dom";

// const SignupPageo2 = () => {
//     const navigate = useNavigate();
//   return (
    
//     <div className="logincontainer">

      


//       <img className="loginback" src="/back5.png" alt="background" />
//       <img className="logocomplet" src="/logo12.png" alt="logo" />



//       <div className="labels-container">
//         <p className="font0">WED HALL</p>
//         <p className="font1">Sign Up as an Owner</p>

        

//         <label className="label">
//           <span className="label-text">email address:</span>
//           <input className="input" type="text" />
//         </label>

//         <label className="label">
//           <span className="label-text">Password:</span>
//           <input className="input" type="text" />
//         </label>

        
        
//         <button onClick={() => navigate("/landingpage")} className="loginn">sign up</button>

//         <p className="font3">you already have an account?</p>
//         <p  onClick={() => navigate("/login")} className="font3">Log In now</p>



        


//       </div>
//     </div>
//   );
// };

// export default SignupPageo2;


import React, { useState } from "react";
import "./SignupPageo2.css";
import { useNavigate } from "react-router-dom";
import { clients } from "../../../clients";
import { owners } from "../../../owners";

const SignupPageo2 = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [arrclient] = useState(clients || []);
  const [arrowner] = useState(owners || []);

  const checkEmailPassword = () => {
    const e = email.trim();
    const p = password.trim();

    if (!p) {
      return alert("password cannot be empty");
    }

    if (p.length < 6) {
      return alert("password must be at least 6 characters");
    }

    if (!e) {
      return alert("email cannot be empty");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) {
      return alert("invalid email");
    }

    const emailExists =
      arrowner.some((owner) => owner.email === e) ||
      arrclient.some((client) => client.email === e);

    if (emailExists) {
      return alert("this email address already has an account");
    }

    // proceed (save owner to state/storage here if needed)
    navigate("/landingpage");
  };

  return (
    <div className="logincontainer">
      <img className="loginback" src="/back5.png" alt="background" />
      <img className="logocomplet" src="/logo12.png" alt="logo" />

      <div className="labels-container">
        <p className="font0">WED HALL</p>
        <p className="font1">Sign Up as an Owner</p>

        <label className="label">
          <span className="label-text">email address:</span>
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

        <button type="button" onClick={checkEmailPassword} className="loginn">
          Sign up
        </button>

        <p className="font3">you already have an account?</p>
        <p onClick={() => navigate("/login")} className="font3">
          Log In now
        </p>
      </div>
    </div>
  );
};

export default SignupPageo2;
