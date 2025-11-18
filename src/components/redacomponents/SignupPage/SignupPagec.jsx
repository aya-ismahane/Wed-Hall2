// import React, { useState } from "react";
// // import React from "react";
// import "./SignupPagec.css";
// import { useNavigate } from "react-router-dom";
// import { clients } from "../../../clients";
// import { owners } from "../../../owners";

// const SignupPagec = () => {
//     const navigate = useNavigate();
//     const [name,setname]=useState("")
//         const [phone,setphone]=useState("")
//         const [arrclient ,setarrclient]=useState(clients)
//         const [arrowner ,setarrowner]=useState(owners)
    
//         console.log(phone)
//         const checknamephone = () => {
//       if (!name.trim()) {
//         return alert("name cannot be empty");
//       }
    
//       if (!phone.trim()) {
//         return alert("phone number cannot be empty");
//       }
    
//       // check digits only + minimum 10 digits
//       if (!/^\d{10}$/.test(phone.trim())) {
//         return alert("invalid phone number");
//       }
//       if(arrowner.filter(owner=>owner.phone===phone).length > 0 || arrclient.filter(client=>client.phone===phone).length > 0 ){
//         return alert("this phone number already exist")
//       }
//       navigate("/signupc2")
//     }

//   return (
//     <div className="logincontainer">

      


//       <img className="loginback" src="/back5.png" alt="background" />
//       <img className="logocomplet" src="/logo12.png" alt="logo" />



//       <div className="labels-container">
//         <p className="font0">WED HALL</p>
//         <p className="font1">Sign Up as a Client</p>

        

//         <label className="label">
//           <span className="label-text">full name:</span>
//           <input value={name} onChange={(e)=>{setname(e.target.value)}} className="input" type="text" />
//         </label>

//         <label className="label">
//           <span className="label-text">phone number:</span>
//           <input value={phone} onChange={(e)=>{setphone(e.target.value)}} className="input" type="text" />
//         </label>

        
        
//         <button onClick={checknamephone} className="loginn">Continue</button>

//         <p className="font3">you already have an account?</p>
//         <p onClick={() => navigate("/login")} className="font3">Log In now</p>





//       </div>
//     </div>
//   );
// };

// export default SignupPagec;



import React, { useState, useEffect } from "react";
import "./SignupPagec.css";
import { useNavigate } from "react-router-dom";

const SignupPagec = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clients, setClients] = useState([]);

  // Load existing clients from localStorage
  useEffect(() => {
    const storedClients = JSON.parse(localStorage.getItem("clients")) || [];
    setClients(storedClients);
  }, []);

  const handleSignup = () => {
    const n = name.trim();
    const ph = phone.trim();
    const e = email.trim();
    const p = password.trim();

    if (!n) return alert("Name cannot be empty");
    if (!ph) return alert("Phone cannot be empty");
    if (!/^\d{10}$/.test(ph)) return alert("Phone number must be 10 digits");
    if (!e) return alert("Email cannot be empty");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) return alert("Invalid email");
    if (!p) return alert("Password cannot be empty");
    if (p.length < 6) return alert("Password must be at least 6 characters");

    // Check if email/phone already exists
    if (clients.some(c => c.email === e || c.phone === ph)) {
      return alert("This email or phone already has an account");
    }

    const newClient = { name: n, phone: ph, email: e, password: p };
    const updatedClients = [...clients, newClient];

    setClients(updatedClients);
    localStorage.setItem("clients", JSON.stringify(updatedClients));

    alert("Client account created successfully!");
    navigate("/landingpage");
  };

  return (
    <div className="logincontainer">
      <img className="loginback" src="/back5.png" alt="background" />
      <img className="logocomplet" src="/logo12.png" alt="logo" />

      <div className="labels-container">
        <p className="font0">WED HALL</p>
        <p className="font1">Sign Up as a Client</p>

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

        <button onClick={handleSignup} className="loginn">
          Sign Up
        </button>

        <p className="font3">Already have an account?</p>
        <p onClick={() => navigate("/login")} className="font3">Log In now</p>
      </div>
    </div>
  );
};

export default SignupPagec;
