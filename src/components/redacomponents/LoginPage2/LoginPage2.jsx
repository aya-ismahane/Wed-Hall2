import React from "react";
import "./LoginPage2.css";
import { useNavigate } from "react-router-dom";


const LoginPage2 = () => {
    const navigate = useNavigate();
  return (
    <div className="logincontainer">

      


      <img className="loginback" src="/back5.png" alt="background" />
      <img className="logocomplet" src="/logo12.png" alt="logo" />



      <div className="labels-container">
        <p className="font0">WED HALL</p>
        <p className="font1">Forget Password?</p>

        <p className="font3">Don't worry! It happens. Please enter the email associated with your account.</p>

        <label className="label">
          <span className="label-text">email address:</span>
          <input className="input" type="text" />
        </label>

        {/* <label className="label">
          <span className="label-text">Password:</span>
          <input className="input" type="password" />
        </label> */}

        {/* <p className="font3">Forgot Password?</p> */}
        <button onClick={() => navigate("/login3")} className="loginn">Send Code</button>



        


      </div>
    </div>
  );
};

export default LoginPage2;


