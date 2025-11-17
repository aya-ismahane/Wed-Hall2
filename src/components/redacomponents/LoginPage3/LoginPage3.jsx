import React from "react";
import "./LoginPage3.css";
import { useNavigate } from "react-router-dom";

const LoginPage3 = () => {
    const navigate = useNavigate();
  return (
    <div className="logincontainer">

      


      <img className="loginback" src="/back5.png" alt="background" />
      <img className="logocomplet" src="/logo12.png" alt="logo" />



      <div className="labels-container">
        <p className="font0">WED HALL</p>
        


        <p className="font1">Please check your email</p>
        <p className="font3">We've sent a code to: helloworld@gmail.com</p>
        <label className="label">
          <span className="label-text">code:</span>
          <input className="input" type="text" />
        </label>
        
        <button onClick={() => navigate("/landingpage")} className="loginn">Verify</button>



      </div>
    </div>
  );
};

export default LoginPage3;


