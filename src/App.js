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

// this is importation of reda
// import { Route, Routes } from 'react-router-dom';
import MainLandingPage from './pages/redapages/MainLandingPage';
import LogIn from './pages/redapages/LogIn';

import LogIn2 from './pages/redapages/LogIn2';
import LogIn3 from './pages/redapages/LogIn3';
import Signupo from './pages/redapages/Signupo';

import Signupc from './pages/redapages/Signupc';
import Signupo2 from './pages/redapages/Signupo2';
import Signupc2 from './pages/redapages/Signupc2';
import Signupch from './pages/redapages/signupch';

// !-----------------------------------------------------------------

// ---------------------Aisha's imports-----------------------------------------
import Dashboard from "./pages/Aishapages/Dashboard";
import RequestsPage from "./pages/Aishapages/RequestsPage";
import HistoryPage from "./pages/Aishapages/HistoryPage";
import profilePic from "./images/profilepic.jpg";
// !this is the importation of aya
import Halldesc from "./pages/Ayapages/Halldesc";

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
        <Route path="/:id" element={<Halldesc/>}></Route>



{/* // this si root of reda */}


                <Route path='/landingpage' element={<MainLandingPage/>}>

      </Route>
      <Route path='/login' element={<LogIn/>}>

      </Route>
      <Route path='/login2' element={<LogIn2/>}>

      </Route>
      <Route path='/login3' element={<LogIn3/>}>

      </Route>
      <Route path='/Signupo' element={<Signupo/>}>

      </Route>
      <Route path='/Signupc' element={<Signupc/>}>

      </Route>
      <Route path='/Signupo2' element={<Signupo2/>}>

      </Route>
      <Route path='/Signupc2' element={<Signupc2/>}>

      </Route>
      <Route path='/Signupch' element={<Signupch/>}>

      </Route>
      {/* <Route path='*' element={<Error/>}>

      </Route> */}

        {/* Aisha routes */}
        <Route path="/profile" element={<Dashboard owner={owner} setOwner={setOwner} />} />
        <Route path="/Dashboard" element={<Dashboard owner={owner} setOwner={setOwner} />} />
        <Route path="/requests" element={<RequestsPage owner={owner} />} />
        <Route path="/history" element={<HistoryPage owner={owner} />} />



      </Routes>
      <Footer />
      {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
    </div>
  );
}

export default App;
