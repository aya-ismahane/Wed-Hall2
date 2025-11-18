import React, { useState } from "react";
import "./SignupPageo.css";
import { useNavigate } from "react-router-dom";
import { clients } from "../../../clients";
import { owners } from "../../../owners";

const SignupPageo = () => {
    const navigate = useNavigate();
    const [name,setname]=useState("")
    const [phone,setphone]=useState("")
    const [arrclient ,setarrclient]=useState(clients)
    const [arrowner ,setarrowner]=useState(owners)

    console.log(phone)
    const checknamephone = () => {
  if (!name.trim()) {
    return alert("name cannot be empty");
  }

  if (!phone.trim()) {
    return alert("phone number cannot be empty");
  }

  // check digits only + minimum 10 digits
  if (!/^\d{10}$/.test(phone.trim())) {
    return alert("invalid phone number");
  }
  if(arrowner.filter(owner=>owner.phone===phone).length > 0 || arrclient.filter(client=>client.phone===phone).length > 0 ){
    return alert("this phone number already exist")
  }
  navigate("/signupo2")

}


  return (

    <div className="logincontainer">

      


      <img className="loginback" src="/back5.png" alt="background" />
      <img className="logocomplet" src="/logo12.png" alt="logo" />



      <div className="labels-container">
        <p className="font0">WED HALL</p>
        <p className="font1">Sign Up as an Owner</p>

        

        <label className="label">
          <span className="label-text">full name:</span>
          <input value={name} onChange={(e)=>{setname(e.target.value)}} className="input" type="text" />
        </label>

        <label className="label">
          <span className="label-text">phone number:</span>
          <input value={phone} onChange={(e)=>{setphone(e.target.value)}} className="input" type="text" />
        </label>

        
        
        <button onClick={() => { checknamephone()
           }} className="loginn">Continue</button>

        <p className="font3">you already have an account?</p>
        <p  onClick={() => navigate("/login")} className="font3">Log In now</p>



        


      </div>
    </div>
  );
};

export default SignupPageo;


