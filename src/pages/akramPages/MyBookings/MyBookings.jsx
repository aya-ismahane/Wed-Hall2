import React, { useState } from "react";
import "./MyBookings.css";
import BookingInfo from "../../../components/akramComponents/BookingInfo/BookingInfo";
import FavouriteList from "../../../components/akramComponents/FavouriteLIst/FavouriteList";
import EditProfileUser from "../../../components/akramComponents/editProfileUser/EditProfileUser";
import { useAuth } from "../../../context/AuthContext";
const MyBookings = ({
  myFavourite,
  setMyFavourite,
}) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  if (!user) return <div className="profile-container">Please log in.</div>;

  return (
    <div>
      <div className="profile-fluid">
        <div className="profile">
          <div className="owner-card">
            <img src={user.picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="Profile" className="owner-img" />
            <h3>{user.full_name || user.fullName}</h3>
            <p>{user.email}</p>
            <p>{user.phone || 'No phone provided'} </p>
            <p>{user.wilaya}</p>
            <button
              onClick={() => {
                setIsEditing(!isEditing);
              }}
              className="edit-btn"
            >
              Edit Profile
            </button>
            {isEditing && (
              <EditProfileUser
                owner={user}
                onClose={() => setIsEditing(false)}
              />
            )}
          </div>
        </div>
      </div>
      <div className="favourite">
        <FavouriteList
          myFavourite={myFavourite}
          setMyFavourite={setMyFavourite}
        />
      </div>
      <div className="table-fluid">
        <br />
        {/* <h1 className="my_booking">My Booking</h1> */}
        <BookingInfo
          myFavourite={myFavourite}
          setMyFavourite={setMyFavourite}
        />
      </div>
    </div>
  );
};

export default MyBookings;
