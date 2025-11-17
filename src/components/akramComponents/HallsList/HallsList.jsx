import React from "react";
import OneHall from "../OneHall/OneHall";
import "./HallsList.css";
const HallsList = ({
  halls,
  isAuth,
  setIsAuth,
  myFavourite,
  setMyFavourite,
  favourite,
  setFavourite,
}) => {
  return (
    <div className="halls-container">
      {halls.map((hall, index) => (
        <OneHall
          key={index}
          hall={hall}
          isAuth={isAuth}
          setIsAuth={setIsAuth}
          myFavourite={myFavourite}
          setMyFavourite={setMyFavourite}
          favourite={favourite}
          setFavourite={setFavourite}
        />
      ))}
    </div>
  );
};

export default HallsList;
