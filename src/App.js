import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// !this is the importation of Akram
import { Route, Routes } from "react-router-dom";
import ViewHalls from "./pages/akramPages/viewHalls/ViewHalls";
import MyBooking from "./pages/akramPages/MyBookings/MyBookings";
import { useState } from "react";
import Footer from "./components/akramComponents/Footer/Footer";
// import Filter from "./components/akramComponents/filter/Filter";
import BarrNav from "./components/akramComponents/BarrNav/BarrNav";
// !-----------------------------------------------------------------
function App() {
  // !this are the variables used by akram 
    const [isAuth, setIsAuth] = useState(true);
  const [owner, setOwner] = useState({
    fullName: "Sophie Bennett",
    email: "sophie.bennett@gmail.com",
    wilaya: "Algiers",
    phoneNum: "0546789843",
    picture:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  });
  const [myFavourite, setMyFavourite] = useState([]);
  const [favourite, setFavourite] = useState(false);
// !--------------------------------------------------------------
  return (
    <div className="App">
      {/* ! this are the routes of akram */}
      <BarrNav isAuth={isAuth} setIsAuth={setIsAuth} owner={owner} />
      <Routes>
        <Route
          path="/explore"
          element={
            <ViewHalls
              isAuth={isAuth}
              setIsAuth={isAuth}
              myFavourite={myFavourite}
              setMyFavourite={setMyFavourite}
              favourite={favourite}
              setFavourite={setFavourite}
              // isAuth={isAuth}
            />
          }
        ></Route>
        <Route
          path="/mybooking"
          element={
            <MyBooking
              owner={owner}
              setOwner={setOwner}
              setMyFavourite={setMyFavourite}
              myFavourite={myFavourite}
              // onEdit={() => setIsEditing(true)}
            />
          }
        ></Route>
        {/* <Route path="/filter" element={<Filter/>}></Route> */}
        <Route path="/:id"></Route>
      </Routes>
      <Footer />
      {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
    </div>
  );
}

export default App;
