import React from "react";
import Header from "../AyaComponents/Header/Header";
import HallCard from "../AyaComponents/HallCard/HallCard"; 
import "leaflet/dist/leaflet.css";
import hallImg from "../assets/hall.png";

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
    <>
      <Header />
      <HallCard {...hall} />
    </>
  );
};

export default Halldesc;
