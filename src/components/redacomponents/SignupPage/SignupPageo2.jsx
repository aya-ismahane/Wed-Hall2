import React from "react";
import "./SignupPageo2.css";
import { useNavigate } from "react-router-dom";

const SignupPageo2 = () => {
    const navigate = useNavigate();
  return (
    
    <div className="logincontainer">

      


      <img className="loginback" src="/back5.png" alt="background" />
      <img className="logocomplet" src="/logo12.png" alt="logo" />



      <div className="labels-container">
        <p className="font0">WED HALL</p>
        <p className="font1">Sign Up as an Owner</p>

        

        <label className="label">
          <span className="label-text">email address:</span>
          <input className="input" type="text" />
        </label>

        <label className="label">
          <span className="label-text">Password:</span>
          <input className="input" type="text" />
        </label>

        
        
        <button onClick={() => navigate("/landingpage")} className="loginn">sign up</button>

        <p className="font3">you already have an account?</p>
        <p  onClick={() => navigate("/login")} className="font3">Log In now</p>



        


      </div>
    </div>
  );
};

export default SignupPageo2;


