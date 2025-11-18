import React from 'react'

import "./WeddingCard.css"

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';




const WeddingCard = ({hall}) => {
  return (
    <div>


         <Card style={{ width: '18rem' }}>

      <Card.Img variant='top' src={hall.image}   style={{ height: '200px' }}/>
      <Card.Body>



        <Card.Title >{hall.title}</Card.Title>
        
        <Card.Text>
        {hall.description}
        </Card.Text>
        {/* <Button class="booknow" variant="primary">Book Now</Button> */}
        {/* <button class="booknow">Book Now</button> */}



      </Card.Body>
     </Card>

    </div>
  )
}

export default WeddingCard