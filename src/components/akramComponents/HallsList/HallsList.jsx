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
  API_BASE,
  user,
  userRole,
}) => {
  return (
    <div className="halls-container">
      {halls.map((hall, index) => (
        <OneHall
          key={hall.id || index}
          hall={hall}
          isAuth={isAuth}
          setIsAuth={setIsAuth}
          myFavourite={myFavourite}
          setMyFavourite={setMyFavourite}
          favourite={favourite}
          setFavourite={setFavourite}
          API_BASE={API_BASE}
          user={user}
          userRole={userRole}
        />
      ))}
    </div>
  );
};

export default HallsList;
