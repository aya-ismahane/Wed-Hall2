import React from 'react'

import WeddingCard from './WeddingCard';
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
            <button class="explorebutton">Explore more</button>
        </div>



    </div>





    
  )
}

export default WeddingHall