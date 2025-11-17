// import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Rating from "../Rating/Rating";
import "./OneHall.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const OneHall = ({ hall, isAuth, setIsAuth, myFavourite, setMyFavourite }) => {
  // const [favourite, setFavourite] = useState(false);
  const isFav = myFavourite.some((item) => item.id === hall.id);

  const toggleFavourite = () => {
    if (isFav) {
      // remove from favourites
      setMyFavourite(myFavourite.filter((item) => item.name !== hall.name));
    } else {
      // add to favourites
      setMyFavourite([...myFavourite, hall]);
    }
  };
  // !this is the importation of the useNavigate
  const navigate = useNavigate();
  // const [myFavourite, setMyFavourite] = useState([]);
  return (
    <div>
      <Card className="Card">
        <Card.Img
          variant="top"
          src={hall.image}
          style={{ height: "200px" }}
          className="image"
        />
        <Card.Body>
          <div className="content">
            <div>
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                height={65}
                width={65}
                style={{
                  borderRadius: "50%",
                  boxShadow: "0px 0px 5px gray",
                  position: "absolute",
                  top: "-3.5rem",
                  right: "12rem",
                  border: "4px solid white",
                }}
              />
              {isAuth && (
                <div
                  style={{ position: "absolute", top: "-3rem", right: "-0rem" }}
                >
                  <i
                    className={`${
                      isFav ? "fa-solid" : "fa-regular"
                    } fa-heart fa-xl`}
                    style={{
                      color: "#ffffff",
                      textShadow: "0px 0px 5px gray",
                      cursor: "pointer",
                    }}
                    onClick={toggleFavourite}
                  ></i>
                </div>
              )}
            </div>

            <div className="tirating">
              <Card.Title className="title">{hall.name}</Card.Title>
            </div>
            {/* <div>
            </div> */}
            <div>
              <Card.Text className="location">
                <div>
                  <i class="fa-solid fa-location-dot"></i> {hall.location}{" "}
                </div>
                <div>
                  <Rating isAuth={isAuth} setIsAuth={setIsAuth} />
                </div>{" "}
              </Card.Text>
            </div>
            <div className="price-container">
              <h5 className="price">{hall.price} CENTIM</h5>
            </div>
            <div className="description">
              <Card.Text className="description">
                {" "}
                {hall.description}{" "}
              </Card.Text>
            </div>
          </div>
          <div className="btn-container">
            <Button
              className="btn"
              onClick={() => {
                navigate(`/${hall.id}`);
              }}
            >
              Explore
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default OneHall;
