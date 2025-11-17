import React from "react";
import "./signupchoice.css";
import { useNavigate } from "react-router-dom";


const Signupchoice = () => {
    const navigate = useNavigate();
  return (
    
    <div className="logincontainer">

      


      <img className="loginback" src="/back5.png" alt="background" />
      <img className="logocomplet" src="/logo12.png" alt="logo" />



      <div className="labels-container">
        <p className="font0">WED HALL</p>
        <p id="font1" className="font1">Sign Up as:</p>


        <p className="font1">Owner</p>
        <p className="font3">As an Owner, you can publish your venues, set availability, manage bookings, and connect with clients looking for the perfect place to celebrate their special day.</p>
        <button onClick={() => navigate("/signupo")} className="loginn">Owner-Sign Up</button>


        <p className="font1">Client</p>
        <p className="font3">As a Client, you can browse available venues, check details and prices, save favorites, and book the perfect wedding hall for your event.</p>
        <button onClick={() => navigate("/signupc")} className="loginn">Client-Sign Up</button>


        

        


      </div>
    </div>
  );
};

export default Signupchoice;


