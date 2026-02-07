import React, { useState, useEffect } from "react";
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import OwnerProfileCard from "../../components/AishaComponents/OwnerProfileCard/OwnerProfileCard.jsx";
import HallList from "../../components/AishaComponents/HallList/HallList.jsx";
import ProfilePopup from "../../components/AishaComponents/ProfilePopup/ProfilePopup.jsx";
import { useAuth } from "../../context/AuthContext";

/**
 * Owner's profile page. Uses OwnerProfileCard as the main profile component.
 */
function OwnerProfilePage() {
  const { user, API_BASE, refreshUser } = useAuth();
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchOwnerHalls = async () => {
      try {
        const res = await fetch(`${API_BASE}/aishaWork/getOwnerHalls.php`, {
          credentials: "include",
        });
        const data = await res.json();
        if (Array.isArray(data)) {
          setHalls(data);
        } else if (data.error) {
          console.error("Error fetching halls:", data.error);
        }
      } catch (err) {
        console.error("Failed to fetch owner halls", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOwnerHalls();
  }, [API_BASE]);

  const handleEditProfile = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);

  const refreshHalls = async () => {
    try {
      const res = await fetch(`${API_BASE}/aishaWork/getOwnerHalls.php`, { credentials: "include" });
      const data = await res.json();
      if (Array.isArray(data)) setHalls(data);
    } catch (err) {
      console.error("Failed to refresh halls", err);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <OwnerProfileCard owner={user} onEdit={handleEditProfile} />
        </div>
        <div className="col-md-8">
          <HallList
            halls={halls}
            API_BASE={API_BASE}
            ownerId={user?.id}
            refreshHalls={refreshHalls}
          />
        </div>
      </div>

      {showPopup && (
        <ProfilePopup
          owner={user}
          onClose={handleClosePopup}
          API_BASE={API_BASE}
          onSaveSuccess={() => refreshUser()}
        />
      )}
    </div>
  );
}

export default OwnerProfilePage;
