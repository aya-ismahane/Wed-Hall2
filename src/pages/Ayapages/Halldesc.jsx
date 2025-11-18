import React from "react";
import Header from "../../components/Ayacomponents/header/Header";
import HallCard from "../../components/Ayacomponents/hallcard/hall-card"; 
import "leaflet/dist/leaflet.css";
import hallImg from "../../images/assets/hall.png";

const hall = {
  name: "Layalina",
  rating: "★★★★★",
  location: "Sidi Abdellah, Algiers",
  description:
    "Elegant hall with modern design, ideal for weddings and engagements. Elegant hall with modern design, ideal for weddings and engagements. Elegant hall with modern design, ideal for weddings and engagements.",
  price: "250,000 DZD",
  img: hallImg,
};

const Halldesc = () => {
  return (
    <div style={{backgroundColor:'black'}}>
      <Header />
      <HallCard {...hall} />
    </div>
  );
};

export default Halldesc;
