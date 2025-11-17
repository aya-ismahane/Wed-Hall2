import React from "react";
import "./SignupPagec.css";
import { useNavigate } from "react-router-dom";

const SignupPagec = () => {
    const navigate = useNavigate();
  return (
    <div className="logincontainer">

      


      <img className="loginback" src="/back5.png" alt="background" />
      <img className="logocomplet" src="/logo12.png" alt="logo" />



      <div className="labels-container">
        <p className="font0">WED HALL</p>
        <p className="font1">Sign Up as a Client</p>

        

        <label className="label">
          <span className="label-text">full name:</span>
          <input className="input" type="text" />
        </label>

        <label className="label">
          <span className="label-text">phone number:</span>
          <input className="input" type="text" />
        </label>

        
        
        <button onClick={() => navigate("/signupc2")} className="loginn">Continue</button>

        <p className="font3">you already have an account?</p>
        <p onClick={() => navigate("/login")} className="font3">Log In now</p>





      </div>
    </div>
  );
};

export default SignupPagec;


