import React from 'react'
import {Link} from 'react-router-dom'
import "./landingpage.css"

const Landingpage = () => {
  return (
    <div>


      <div class="photobackground"> 

        <img class="background" src="background.jpg" alt="" />

        <div class="ecrituresurimage">
          <h1 class="citation">L'amour écrit 
            l'histoire, notre salle
            en devient le décor
          </h1>

        </div>

        <div class="divbutton">
          <Link to="/explore">
          <button class="bookingbutton">Start Booking</button>
          </Link>
          

        </div>
      


      </div>

      <div class="titre">
        <p class="webname">WED HALL</p>
        <p class="services">Our Services</p>

      </div>
      <div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>


    </div>


  )
}

export default Landingpage