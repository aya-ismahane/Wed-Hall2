import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HallCard from "../../components/Ayacomponents/hallcard/hall-card";
import { useAuth } from "../../context/AuthContext";
import "leaflet/dist/leaflet.css";

const Halldesc = () => {
  const { id } = useParams();
  const { API_BASE } = useAuth();
  const [hall, setHall] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHall = async () => {
      try {
        const response = await fetch(`${API_BASE}/akramWork/getAllHalls.php`);
        const data = await response.json();

        // Find the specific hall by ID
        const foundHall = data.find(h => h.id === parseInt(id));

        if (foundHall) {
          setHall(foundHall);
        } else {
          setError("Hall not found");
        }
      } catch (err) {
        console.error("Error fetching hall:", err);
        setError("Failed to load hall details");
      } finally {
        setLoading(false);
      }
    };

    fetchHall();
  }, [id, API_BASE]);

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'red' }}>{error}</div>;
  }

  if (!hall) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Hall not found</div>;
  }

  return (
    <div>
      <HallCard {...hall} />
    </div>
  );
};

export default Halldesc;
