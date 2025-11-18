import React from 'react'

import WeddingCard from './WeddingCard';
import {Link} from 'react-router-dom'
import "./WeddingHall.css"
import { cardsData } from './tophall';



const WeddingHall = () => {
    const halls=cardsData
  return (
    <div>

        <div class="webname2" >
            WED HALL
        </div>

        <div class="services2" >
            Our Popular Wedding Halls
        </div>

        <div class="weddingtable">
            {  halls.map(hall => <WeddingCard hall={hall}/>) }
        </div>

        <div>
            {/* <Link to="/explore">
            <button class="explorebutton">Explore more</button>
            </Link> */}
            <a href="/explore">
                <button className="explorebutton">Explore more</button>
            </a>
            
        </div>



    </div>





    
  )
}

export default WeddingHall