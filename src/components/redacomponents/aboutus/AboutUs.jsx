import React from 'react'


// import AboutUSCard from "/AboutUSCard"
import "./AboutUsCard.css"

// import { AboutUsData } from './AboutUss';
import { AboutUsData } from './AboutUss';
import AboutUsCard from './AboutUsCard';




const AboutUs = () => {
    const halls=AboutUsData
  return (
    <div>
      

        <div class="webname2" >
            WED HALL
        </div>

        <div class="services2" >
            About Us
        </div>

        <div class="weddingtablee">
            {  halls.map(us => <AboutUsCard us={us}/>) }
        </div>

      

    </div>

  )
}

export default AboutUs