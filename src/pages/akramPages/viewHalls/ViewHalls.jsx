import React, { useState } from "react";
import "./ViewHalls.css";
import weddingHalls from "../../../halls";
import HallsList from "../../../components/akramComponents/HallsList/HallsList";
import Filter from "../../../components/akramComponents/filter/Filter";
const ViewHalls = ({
  isAuth,
  setIsAuth,
  myFavourite,
  setMyFavourite,
  favourite,
  setFavourite,
}) => {
  const [halls, setHalls] = useState(weddingHalls);
  // console.log(halls);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filteredHalls = weddingHalls.filter((hall) =>
      hall.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setHalls(filteredHalls);
  };
  // console.log(halls)
  return (
    <div className="container-viewhalls">
      <div
        className="container-viewhalls-fluid"
        style={
          {
            // backgroundColor:'black'
          }
        }
      >
        <div>
          <span className="search">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input
              type="search"
              className="input"
              placeholder="search"
              onChange={handleSearch}
            />
            {/* <div className="filter">
            <i class="fa-solid fa-filter"></i>
          </div> */}
          </span>
        </div>

        {/* {isAuth && ( */}
          <Filter
            halls={halls}
            setHalls={setHalls}
            weddingHalls={weddingHalls}
          />
        {/* )} */}
      </div>
      <div className="halls">
        {halls.length > 0 ? (
          <HallsList
            halls={halls}
            isAuth={isAuth}
            setIsAuth={setIsAuth}
            myFavourite={myFavourite}
            setMyFavourite={setMyFavourite}
            favourite={favourite}
            setFavourite={setFavourite}
          />
        ) : (
          <div className="notFound-fluid">
            <h1>Sorry this wedding hall is not available</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewHalls;
