import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Pages
import ViewHalls from "./pages/akramPages/viewHalls/ViewHalls";
import MyBooking from "./pages/akramPages/MyBookings/MyBookings";
import MainLandingPage from "./pages/redapages/MainLandingPage";
import LogIn from "./pages/redapages/LogIn";
import LogIn2 from "./pages/redapages/LogIn2";
import LogIn3 from "./pages/redapages/LogIn3";
import Signupo from "./pages/redapages/Signupo";
import Signupc from "./pages/redapages/Signupc";
import Signupo2 from "./pages/redapages/Signupo2";
import Signupc2 from "./pages/redapages/Signupc2";
import Signupch from "./pages/redapages/signupch";
import OwnerProfilePage from "./pages/Aishapages/OwnerProfilePage";
import Profile from "./pages/akramPages/Profile/Profile";
import RequestsPage from "./pages/Aishapages/RequestsPage";
import HistoryPage from "./pages/Aishapages/HistoryPage";
import Halldesc from "./pages/Ayapages/Halldesc";


// Components
import Topbar from "./components/AishaComponents/Topbar/Topbar";
import Header from "./components/Ayacomponents/header/Header";
import Footer from "./components/akramComponents/Footer/Footer";
import { useEffect, useState } from "react";

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, role, loading } = useAuth();

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/landingpage" replace />;
  }

  return children;
};
function App() {
  const location = useLocation();
  const { role } = useAuth();

  const [myFavourite, setMyFavourite] = useState([]);
  const [favourite, setFavourite] = useState(false);
  const [isAuth, setIsAuth] = useState(true);

  // Determine which header to show
  const isOwnerRoute = location.pathname.startsWith('/requests') ||
    location.pathname.startsWith('/history') ||
    location.pathname.startsWith('/profile');

  const shouldShowFooter = !/^\/\d+$/.test(location.pathname) && !isOwnerRoute;

  return (
    <div className="App">
      {/* Conditional Header Rendering */}
      {isOwnerRoute && role === 'owner' ? <Topbar /> : <Header />}

      <Routes>
        {/* Public Routes */}
        <Route path="/landingpage" element={<MainLandingPage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/login2" element={<LogIn2 />} />
        <Route path="/login3" element={<LogIn3 />} />
        <Route path="/Signupo" element={<Signupo />} />
        <Route path="/Signupc" element={<Signupc />} />
        <Route path="/Signupo2" element={<Signupo2 />} />
        <Route path="/Signupc2" element={<Signupc2 />} />
        <Route path="/Signupch" element={<Signupch />} />

        {/* Hall Exploration (Public) */}
        <Route
          path="/explore"
          element={
            <ViewHalls
              isAuth={isAuth}
              setIsAuth={setIsAuth}
              myFavourite={myFavourite}
              setMyFavourite={setMyFavourite}
              favourite={favourite}
              setFavourite={setFavourite}
            />
          }
        />

        {/* Profile and protected routes must come before /:id so "profile" isn't matched as a hall id */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              {role === 'owner' ? <OwnerProfilePage /> : <Profile />}
            </ProtectedRoute>
          }
        />

        {/* Owner Protected Routes */}
        <Route
          path="/requests"
          element={
            <ProtectedRoute requiredRole="owner">
              <RequestsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute requiredRole="owner">
              <HistoryPage />
            </ProtectedRoute>
          }
        />

        {/* Client Protected Routes */}
        <Route
          path="/mybooking"
          element={
            <ProtectedRoute requiredRole="client">
              <MyBooking
                setMyFavourite={setMyFavourite}
                myFavourite={myFavourite}
              />
            </ProtectedRoute>
          }
        />

        {/* Hall Details (Public but booking requires auth) - must be after all fixed paths like /profile */}
        <Route path="/:id" element={<Halldesc />} />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/landingpage" replace />} />
      </Routes>

      {shouldShowFooter && <Footer />}
    </div>
  );
}

export default App;
