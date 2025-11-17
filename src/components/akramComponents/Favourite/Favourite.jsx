import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Rating from "../Rating/Rating";

const Favourite = ({ one }) => {
  // console.log(one);
  return (
    <div>
      <Card className="Card" style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={one.image}
          style={{ height: "200px" }}
          className="image"
        />
        <Card.Body>
          <div className="content">
            <div className="tirating">
              <Card.Title className="title">{one.name}</Card.Title>
            </div>
            {/* <div>
            </div> */}
            <div>
              <Card.Text className="location">
                <div>
                  <i class="fa-solid fa-location-dot"></i> {one.location}{" "}
                </div>
                <div>
                  <Rating isAuth={false} />
                </div>{" "}
              </Card.Text>
            </div>
            <div className="price-container">
              <h5 className="price">{one.price}</h5>
            </div>
            <div className="description">
              <Card.Text> {one.description} </Card.Text>
            </div>
          </div>
          <div className="btn-container">
            <Button className="btn">Explore</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Favourite;
