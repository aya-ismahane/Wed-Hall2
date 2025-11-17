import React from "react";
import "./LogInPage.css";
import { useNavigate } from "react-router-dom";

// si les images sont dans src, tu peux aussi les importer:
// import back from "./back5.png";
// import logo from "./logo11.png";

const LogInPage = () => {
  const navigate = useNavigate();
  return (
  
    
    <div className="logincontainer">

      {/* Si images dans public: src="/back5.png" ; si importées : src={back} */}


      <img className="loginback" src="/back5.png" alt="background" />
      <img className="logocomplet" src="/logo12.png" alt="logo" />



      <div className="labels-container">
        <p className="font0">WED HALL</p>
        <p className="font1">LOG IN</p>

        <label className="label">
          <span className="label-text">Username:</span>
          <input className="input" type="text" />
        </label>

        <label className="label">
          <span className="label-text">Password:</span>
          <input className="input" type="password" />
        </label>

        <p style={{ cursor: "pointer" }} onClick={() => navigate("/login2")} className="font3">Forgot Password?</p>
        

        

        <button className="loginn"  onClick={() => navigate("/Landingpage")}>Login</button>
        <p className="font3">Don't have an account?</p>
        <p className="font3">Register Now</p>


      </div>
    </div>
  );
};

export default LogInPage;


