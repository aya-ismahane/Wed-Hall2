import React from 'react'

import Card from 'react-bootstrap/Card';
import "./AboutUs.css"


const AboutUsCard = ({us}) => {
  return (
    <div>

        <Card className="onecard" style={{ width: '15rem' }}>

      <Card.Img variant='top' src={us.image}   style={{ height: '230px' }}/>
      <Card.Body>



        <Card.Title class="fullname" >{us.fullname}</Card.Title>
        
        <Card.Text>
        {us.description}
        </Card.Text>


      </Card.Body>
     </Card>

    </div>
  )
}

export default AboutUsCard