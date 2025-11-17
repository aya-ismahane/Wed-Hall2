import React, { useState } from "react";
import "../App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Topbar from "../AishaComponents/Topbar/Topbar.jsx";
import OwnerProfileCard from "../AishaComponents/OwnerProfileCard/OwnerProfileCard.jsx";
import HallList from "../AishaComponents/HallList/HallList.jsx";
import ProfilePopup from "../AishaComponents/ProfilePopup/ProfilePopup.jsx";

function Dashboard({ owner, setOwner }) {

  const safeOwner = owner || { fullName: "", picture: "" };
  const initialHalls = [
    {
      id: 1,
      name: "Layalina",
      location: "Bejaia",
      price: "1,000 DZD",
      rating: 4,
      description:
        "Un lieu raffiné grgegrth hrtret eryrt eryr eryrt ey trjhtr htrh reytrh reytyh et chaleureux pour célébrer l'amour et créer des souvenirs inoubliables.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXoDQrg-pp9HyTJQhhGWfBj4NarwGvhzd5YA&s",
    },
    {
      id: 2,
      name: "El Bahia",
      location: "Alger",
      price: "1,200 DZD",
      rating: 4.5,
      description:
        "Un espace élégant au cœur d'Alger, parfait pour des cérémonies modernes et romantiques.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRroEznKZFiBg5K6Y4U6EYYHwxIhw9L4sKnEg&s",
    },
    {
      id: 3,
      name: "Palais des Fêtes",
      location: "Tizi Ouzou",
      price: "900 DZD",
      rating: 4.8,
      description:
        "Un lieu spacieux et décoré avec goût, idéal pour les grandes célébrations de mariage.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa3HJ67YQ2F-RC04EvSn_F3rOJE_a0GuiVcQ&s",
    },
    {
      id: 4,
      name: "Le Rêve d’Or",
      location: "Oran",
      price: "1,500 DZD",
      rating: 3.5,
      description:
        "Une salle prestigieuse avec un service haut de gamme et une ambiance féerique.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa3HJ67YQ2F-RC04EvSn_F3rOJE_a0GuiVcQ&s",
    },
    {
      id: 5,
      name: "Layalina",
      location: "Bejaia",
      price: "1,000 DZD",
      rating: 4,
      description:
        "Un lieu raffiné grgegrth hrtret eryrt eryr eryrt ey trjhtr htrh reytrh reytyh et chaleureux pour célébrer l'amour et créer des souvenirs inoubliables.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXoDQrg-pp9HyTJQhhGWfBj4NarwGvhzd5YA&s",
    }
  ];

  // make halls stateful
  const [halls, setHalls] = useState(initialHalls);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="app-container">
      <Topbar owner={owner} />
      <div className="dashboard">
        <div className="Owner-section">
          <OwnerProfileCard owner={owner} onEdit={() => setIsEditing(true)} />
        </div>

        <div className="section-two">
          {/* passing both halls and setHalls */}
          <HallList halls={halls} setHalls={setHalls} limit={4} />
        </div>
      </div>

      {isEditing && (
        <ProfilePopup
          owner={owner}
          setOwner={setOwner}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
}

export default Dashboard;
