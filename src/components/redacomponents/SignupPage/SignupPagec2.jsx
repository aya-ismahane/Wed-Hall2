// import React, { useState } from "react";
// // import React from "react";
// import "./SignupPagec2.css";
// import { useNavigate } from "react-router-dom";
// import { clients } from "../../../clients";
// import { owners } from "../../../owners";

// const SignupPagec2 = () => {
//     const navigate = useNavigate();
//             const [email,setemail]=useState("")
//             const [password,setpassword]=useState("")
//             const [arrclient ,setarrclient]=useState(clients)
//             const [arrowner ,setarrowner]=useState(owners)
        
//             // console.log(phone)
//             const checkemailpassword = () => {
//           if (!password.trim()) {
//             return alert("password cannot be empty");
//           }
        
//           if (!email.trim()) {
//             return alert("email cannot be empty");
//           }
        
//           if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
//             return alert("invalid email");
//           }

//           if(arrowner.filter(owner=>owner.email===email).length > 0 || arrclient.filter(client=>client.email===email).length > 0 ){
//             return alert("this email address already have an account")
//           }
//           navigate("/landingpage")
//         }
//   return (
//     <div className="logincontainer">

      


//       <img className="loginback" src="/back5.png" alt="background" />
//       <img className="logocomplet" src="/logo12.png" alt="logo" />



//       <div className="labels-container">
//         <p className="font0">WED HALL</p>
//         <p className="font1">Sign Up as a Client</p>

        

//         <label className="label">
//           <span className="label-text">email address:</span>
//           <input className="input" type="text" />
//         </label>

//         <label className="label">
//           <span className="label-text">Password:</span>
//           <input className="input" type="text" />
//         </label>

        
        
//         <button onClick={checkemailpassword} className="loginn">Sign up</button>

//         <p className="font3">you already have an account?</p>
//         <p  onClick={() => navigate("/login")} className="font3">Log In now</p>





//       </div>
//     </div>
//   );
// };

// export default SignupPagec2;




















// import React, { useState } from "react";
// import "./SignupPagec2.css";
// import { useNavigate } from "react-router-dom";
// import { clients } from "../../../clients";
// import { owners } from "../../../owners";

// const SignupPagec2 = () => {

//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [arrclient] = useState(clients);
//   const [arrowner] = useState(owners);

//   const checkemailpassword = () => {
//     const e = email.trim();
//     const p = password.trim();

//     if (!p) {
//       return alert("password cannot be empty");
//     }

//     // example: require at least 6 chars (adjust as you like)
//     if (p.length < 6) {
//       return alert("password must be at least 6 characters");
//     }

//     if (!e) {
//       return alert("email cannot be empty");
//     }

//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) {
//       return alert("invalid email");
//     }

//     const emailExists =
//       arrowner.some((owner) => owner.email === e) ||
//       arrclient.some((client) => client.email === e);

//     if (emailExists) {
//       return alert("this email address already has an account");
//     }

//     // proceed (consider saving user to list/state here)
//     navigate("/landingpage");
//   };

//   return (
//     <div className="logincontainer">
//       <img className="loginback" src="/back5.png" alt="background" />
//       <img className="logocomplet" src="/logo12.png" alt="logo" />

//       <div className="labels-container">
//         <p className="font0">WED HALL</p>
//         <p className="font1">Sign Up as a Client</p>

//         <label className="label">
//           <span className="label-text">email address:</span>
//           <input
//             className="input"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="you@example.com"
//           />
//         </label>

//         <label className="label">
//           <span className="label-text">Password:</span>
//           <input
//             className="input"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter password"
//           />
//         </label>

//         <button onClick={checkemailpassword} className="loginn">
//           Sign up
//         </button>

//         <p className="font3">you already have an account?</p>
//         <p onClick={() => navigate("/login")} className="font3">
//           Log In now
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignupPagec2;


































// import React, { useState } from "react";
// import "./SignupPagec2.css";
// import { useNavigate } from "react-router-dom";
// import { clients } from "../../../clients";
// import { owners } from "../../../owners";

// const SignupPagec2 = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   // keep these read-only if you don't plan to edit them
//   const [arrclient] = useState(clients || []);
//   const [arrowner] = useState(owners || []);

//   // Diagnostic helper
//   const dbg = (...args) => console.log("[SignupPagec2]", ...args);

//   const checkemailpassword = (e) => {
//     // If this component ever gets wrapped in a <form>, prevent submit reload:
//     if (e && typeof e.preventDefault === "function") e.preventDefault();

//     const eTrim = email.trim();
//     const pTrim = password.trim();

//     dbg("values:", { email, password });
//     dbg("trimmed:", { eTrim, pTrim });

//     if (!pTrim) {
//       alert("password cannot be empty");
//       dbg("password empty -> stop");
//       return;
//     }

//     if (pTrim.length < 6) {
//       alert("password must be at least 6 characters");
//       dbg("password too short -> stop");
//       return;
//     }

//     if (!eTrim) {
//       alert("email cannot be empty");
//       dbg("email empty -> stop");
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(eTrim)) {
//       alert("invalid email");
//       dbg("email regex failed -> stop");
//       return;
//     }

//     // inspect owners/clients shapes
//     dbg("owners length:", arrowner.length, "clients length:", arrclient.length);
//     if (arrowner.length > 0) dbg("owner sample:", arrowner[0]);
//     if (arrclient.length > 0) dbg("client sample:", arrclient[0]);

//     const existsInOwners = arrowner.some((owner) => owner.email === eTrim);
//     const existsInClients = arrclient.some((client) => client.email === eTrim);
//     dbg("existsInOwners:", existsInOwners, "existsInClients:", existsInClients);

//     if (existsInOwners || existsInClients) {
//       alert("this email address already has an account");
//       return;
//     }

//     dbg("All checks passed — navigating to /landingpage");
//     navigate("/landingpage");
//   };

//   return (
//     <div className="logincontainer">
//       <img className="loginback" src="/back5.png" alt="background" />
//       <img className="logocomplet" src="/logo12.png" alt="logo" />

//       <div className="labels-container">
//         <p className="font0">WED HALL</p>
//         <p className="font1">Sign Up as a Client</p>

//         <label className="label">
//           <span className="label-text">email address:</span>
//           <input
//             className="input"
//             type="email"
//             value={email}
//             onChange={(ev) => {
//               setEmail(ev.target.value);
//               dbg("onChange email:", ev.target.value);
//             }}
//             placeholder="you@example.com"
//           />
//         </label>

//         <label className="label">
//           <span className="label-text">Password:</span>
//           <input
//             className="input"
//             type="password"
//             value={password}
//             onChange={(ev) => {
//               setPassword(ev.target.value);
//               dbg("onChange password:", ev.target.value);
//             }}
//             placeholder="Enter password"
//           />
//         </label>

//         {/* make sure this is type="button" so it doesn't submit any parent form */}
//         <button type="button" onClick={checkemailpassword} className="loginn">
//           Sign up
//         </button>

//         <p className="font3">you already have an account?</p>
//         <p onClick={() => navigate("/login")} className="font3">
//           Log In now
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignupPagec2;


































import React, { useState, useEffect } from "react";
import "./SignupPagec2.css";
import { useNavigate } from "react-router-dom";

const SignupPagec2 = () => {
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

    // Check if client with same email or phone already exists
    if (clients.some(c => c.email === e || c.phone === ph)) {
      return alert("This email or phone already has an account");
    }

    // Create new client object
    const newClient = { name: n, phone: ph, email: e, password: p };
    const updatedClients = [...clients, newClient];

    // Save to state and localStorage
    setClients(updatedClients);
    localStorage.setItem("clients", JSON.stringify(updatedClients));

    alert("Client account created successfully!");
    navigate("/landingpage");
  };

  return (

    
    <div className="logincontainer">


      
      <div className="labels-container">
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
      </div>
    </div>
  );
};

export default SignupPagec2;
