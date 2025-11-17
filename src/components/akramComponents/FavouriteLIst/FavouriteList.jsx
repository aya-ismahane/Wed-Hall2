import React, { useState } from "react";
import Favourite from "../Favourite/Favourite";
import { favourite } from "../../../favourite";
// import Card from "react-bootstrap/Card";
// import Button from "react-bootstrap/Button";
import "./FavouriteList.css";
const FavouriteList = ({ myFavourite, setMyFavourite }) => {
  const [fav, setFav] = useState(favourite);
  // console.log("fav", fav);
  console.log("myFavourite", myFavourite);
  return (
    <div className="favourite-fluid">
      {myFavourite.length > 0 && (
        <div>
          <h1 className="myFavourite">My Favourites</h1>
          <br />
          <div className="favourite-list">
            {myFavourite.map((one) => (
              <Favourite
                one={one}
                myFavourite={myFavourite}
                setMyFavourite={setMyFavourite}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FavouriteList;
