import React from "react";
import './Footer.css'
import { Flex } from "antd";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer-fluid">
      <hr />
      <div className="footer">
        <div>
          <h1 className="siteName">Wed Hall</h1>
          <p>
            YOUR Satisfaction is <br />
            OUR periority
          </p>
          <p className="icons" >
            <i class="fa-brands fa-linkedin-in fa-lg"></i>
            <i class="fa-brands fa-twitter fa-lg"></i>
            <i class="fa-brands fa-facebook-messenger fa-lg"></i>
            <i class="fa-brands fa-telegram fa-lg"></i>
          </p>
        </div>
        <div>
          <h5 className="title">company</h5>
          <p><Link to={''} style={{color:'black' ,textDecoration:'none'}}>About Us</Link> </p>
          <p><Link to={''} style={{color:'black' ,textDecoration:'none'}}>Book</Link></p>
          <p><Link to={''} style={{color:'black' ,textDecoration:'none'}}>Contact Us</Link></p>
        </div>
        <div>
          <h5 className="title">Cities</h5>
          <p>Algeirs</p>
          <p>Annaba</p>
          <p>Constantine</p>
          <p>Oran</p>
        </div>
        <div className="last-fluid" style={{display:'flex' ,justifyContent:'center' ,width:'100%'}}>
          <p>We will Send You Updates About Weding Halls</p>
        </div>
      </div>
      <hr />
      <div>
        &copy;WedHalls 2025 ,all rights are reserved
      </div>
    </div>
  );
};

export default Footer;
