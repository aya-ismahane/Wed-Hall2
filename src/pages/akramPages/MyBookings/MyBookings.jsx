import React, { useState } from "react";
import "./MyBookings.css";
import BookingInfo from "../../../components/akramComponents/BookingInfo/BookingInfo";
import FavouriteList from "../../../components/akramComponents/FavouriteLIst/FavouriteList";
import EditProfileUser from "../../../components/akramComponents/editProfileUser/EditProfileUser";
const MyBookings = ({
  owner,
  setOwner,
  onEdit,
  myFavourite,
  setMyFavourite,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  console.log("isEditing", isEditing);
  return (
    <div>
      <div className="profile-fluid">
        <div className="profile">
          {/* <div className="avatar">
            <img src="/assets/avatar.png" height={150} width={150} alt="" />
          </div> */}
          {/* <div className="info-container">
            <div className="userName">UserName</div>
            <div className="name">Name family name</div>
            <div className="email">
              <i class="fa-solid fa-envelope"></i> email@example.com
            </div>
            <div className="phone">
              <i class="fa-solid fa-phone"></i> phone number
            </div>
            <div className="city">
              <i class="fa-solid fa-location-dot"></i> city adress
            </div>
          </div> */}
          <div className="owner-card">
            <img src={owner.picture} alt="Profile" className="owner-img" />
            <h3>{owner.fullName}</h3>
            <p>{owner.email}</p>
            <p>{owner.phoneNum} </p>
            <p>{owner.wilaya}</p>
            {/* <EditProfileUser owner={owner} setOwner={setOwner} /> */}
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
                owner={owner}
                setOwner={setOwner}
                onClose={() => setIsEditing(false)}
                onEdit={() => setIsEditing(true)}
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
