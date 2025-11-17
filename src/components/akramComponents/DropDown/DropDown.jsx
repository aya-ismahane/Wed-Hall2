import React from "react";
import "./DropDown.css";
import { Link } from "react-router-dom";
const DropDown = ({ isAuth, setIsAuth, clicked, setClicked }) => {
  console.log(isAuth);
  return (
    <div className="dropDown">
      <ul>
        {/* <li>
          <Link
            to={""}
            onClick={() => {
              setClicked(false);
            }}
          >
            Profile
          </Link>
        </li> */}
        {/* <li>
          <Link
            to={"/mybooking"}
            onClick={() => {
              setClicked(false);
            }}
          >
              My profile
          </Link>
        </li> */}
        <li>
          <Link
            to={"/"}
            onClick={() => {
              setIsAuth(false);
              setClicked(false);
            }}
          >
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default DropDown;
