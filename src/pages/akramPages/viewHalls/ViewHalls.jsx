import React, { useState, useEffect } from "react";
import "./ViewHalls.css";
import HallsList from "../../../components/akramComponents/HallsList/HallsList";
import Filter from "../../../components/akramComponents/filter/Filter";
import { useAuth } from "../../../context/AuthContext";

const ViewHalls = ({
  isAuth,
  setIsAuth,
  myFavourite,
  setMyFavourite,
  favourite,
  setFavourite,
}) => {
  const { API_BASE, user, role } = useAuth();
  const [allHalls, setAllHalls] = useState([]);
  const [halls, setHalls] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const res = await fetch(`${API_BASE}/akramWork/getAllHalls.php`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setAllHalls(data);
          setHalls(data);
        } else {
          console.error("API returned non-array:", data);
        }
      } catch (err) {
        console.error("Failed to fetch halls:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHalls();
  }, [API_BASE]);

  useEffect(() => {
    if (!API_BASE || !user?.id || role !== "client") return;
    const fetchFavourites = async () => {
      try {
        const res = await fetch(`${API_BASE}/akramWork/getFavoriteHalls.php?id=${user.id}`, { credentials: "include" });
        const data = await res.json();
        if (data.status === "success" && Array.isArray(data.favorites)) {
          const mapped = data.favorites.map((f) => ({
            id: f.id,
            name: f.hall_name,
            price: f.hall_price,
            lat: f.hall_att,
            lng: f.hall_leng,
            description: f.hall_desc,
            images: typeof f.hall_images === "string" ? JSON.parse(f.hall_images || "[]") : (f.hall_images || []),
            location: f.wilaya || "Algiers",
          }));
          setMyFavourite(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch favourites", err);
      }
    };
    fetchFavourites();
  }, [API_BASE, user?.id, role, setMyFavourite]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filteredHalls = allHalls.filter((hall) =>
      hall.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setHalls(filteredHalls);
  };

  if (loading) {
    return (
      <div className="container-viewhalls" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white' }}>
        <h2>Loading Halls...</h2>
      </div>
    );
  }

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
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="search"
              className="input"
              placeholder="search"
              onChange={handleSearch}
              value={searchTerm}
            />
          </span>
        </div>

        <Filter
          halls={halls}
          setHalls={setHalls}
          weddingHalls={allHalls}
        />
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
            API_BASE={API_BASE}
            user={user}
            userRole={role}
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
