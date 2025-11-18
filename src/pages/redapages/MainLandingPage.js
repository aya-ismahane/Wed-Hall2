import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import Landingpage from "../../components/redacomponents/landingpage/Landingpage";
import CardGroup from "../../components/redacomponents/ourservices/CardGroup";
import WeddingHall from "../../components/redacomponents/WeddingHall/WeddingHall";
import AboutUs from "../../components/redacomponents/aboutus/AboutUs";
import Testimonials from "../../components/redacomponents/OurClients/Testimonials";
// import Landingpage from './components/landingpage/Landingpage';
// import CardGroup from './components/ourservices/CardGroup';
// import WeddingHall from './components/WeddingHall/WeddingHall';
// // import WeddingCard from './components/WeddingHall/WeddingCard';
// import AboutUs from './components/aboutus/AboutUs';
// import Testimonials from './components/OurClients/Testimonials';
// import Landingpage from './components/landingpage/Landingpage';

// import CardGroup from './components/ourservices/CardGroup';

// import WeddingHall from './components/WeddingHall/WeddingHall';

const MainLandingPage = () => {
  return (
    <div>
      <Landingpage />
      <CardGroup />
      <WeddingHall />
      <div id="aboutus">
        <AboutUs />
      </div>
      <Testimonials />
    </div>
  );
};

export default MainLandingPage;
