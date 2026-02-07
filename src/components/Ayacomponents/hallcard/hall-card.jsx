import "./hall-card.css";
import arrow from "../../../images/assets/arrow.svg";
import component from "../../../images/assets/component.svg";
import locate from "../../../images/assets/locate.svg";
import sched from "../../../images/assets/sched.svg";
import pfp from "../../../images/assets/owner.png";
import React, { useEffect, useState } from "react";
import Schedule from "../schedule/Schedule.jsx";
import MapLeaf from "../map/Map.jsx";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const HallCard = ({
  services,
}) => {
  const { API_BASE, user, role } = useAuth();
  const navigate = useNavigate();
  const params = useParams();

  const [currentHall, setCurrentHall] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [booked, setBooked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [bookedDates, setBookedDates] = useState([]);

  // Fetch hall details
  useEffect(() => {
    const fetchHall = async () => {
      try {
        const res = await fetch(`${API_BASE}/akramWork/getAllHalls.php`);
        const data = await res.json();
        if (Array.isArray(data)) {
          const id = Number(params.id);
          const found = data.find((h) => h.id === id);
          if (found) setCurrentHall(found);
        }
      } catch (err) {
        console.error("Failed to fetch hall details", err);
      }
    };
    fetchHall();
  }, [API_BASE, params.id]);

  // Fetch booked dates for this hall
  useEffect(() => {
    const fetchBookedDates = async () => {
      if (!currentHall) return;

      try {
        const res = await fetch(`${API_BASE}/ayaWork/getHallBookings.php?hall_id=${currentHall.id}`);
        const bookings = await res.json();

        if (Array.isArray(bookings)) {
          setBookedDates(bookings);
        }
      } catch (err) {
        console.error("Failed to fetch booked dates", err);
      }
    };
    fetchBookedDates();
  }, [API_BASE, currentHall]);

  const handleBookClick = () => {
    if (!user) {
      alert("Please login to book a hall");
      navigate("/login");
      return;
    }
    if (role === 'owner') {
      alert("Owners cannot book halls. Please login as a client.");
      return;
    }
    if (!booked) setShowBooking(!showBooking);
  };

  const handleFromChange = (e) => {
    const date = e.target.value;
    setFromDate(date);
    if (toDate && toDate < date) setToDate("");
  };

  const handleToChange = (e) => {
    const date = e.target.value;
    if (fromDate && date <= fromDate) {
      alert("'To' date must be after 'From' date!");
      setToDate("");
    } else {
      setToDate(date);
    }
  };

  // Check if selected dates conflict with existing bookings
  const checkDateConflict = (start, end) => {
    return bookedDates.some(booking => {
      const bookingStart = new Date(booking.start_date);
      const bookingEnd = new Date(booking.end_date);
      const selectedStart = new Date(start);
      const selectedEnd = new Date(end);

      // Check for overlap
      return (
        (selectedStart <= bookingEnd && selectedEnd >= bookingStart) ||
        (selectedStart >= bookingStart && selectedStart <= bookingEnd) ||
        (selectedEnd >= bookingStart && selectedEnd <= bookingEnd)
      );
    });
  };

  const handleConfirm = async () => {
    if (!fromDate || !toDate) {
      alert("Please select valid dates");
      return;
    }

    // Check for date conflicts
    if (checkDateConflict(fromDate, toDate)) {
      alert("These dates are already booked. Please select different dates.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/ayaWork/createHallBooking.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          client_id: user.id,
          hall_id: currentHall.id,
          start_date: fromDate,
          end_date: toDate,
          total_price: currentHall.price // Simplified price logic
        })
      });
      const data = await res.json();

      if (data.status === 'success') {
        alert(`Booking confirmed from ${fromDate} to ${toDate}`);
        setBooked(true);
        setShowBooking(false);
        // Refresh booked dates
        const refreshRes = await fetch(`${API_BASE}/ayaWork/getHallBookings.php?hall_id=${currentHall.id}`);
        const refreshedBookings = await refreshRes.json();
        if (Array.isArray(refreshedBookings)) {
          setBookedDates(refreshedBookings);
        }
      } else {
        alert(data.error || "Booking failed");
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("An error occurred while booking");
    }
  };

  if (!currentHall) return <div>Loading Hall Details...</div>;

  return (
    <div style={{ backgroundColor: "transparent" }}>
      <button className="back" onClick={() => window.history.back()}>
        <img src={arrow} className="arrow" alt="arrow" />
      </button>

      <div className="hall-card">
        {/* Services Section */}
        <div className="hall-services">
          {/* Available Services */}
          <div className="services">
            <div className="title">
              <img src={component} alt="Components" />
              <h2>Available services</h2>
            </div>
            <div className="service-tags">
              {services && services.length > 0 ? (
                services.map((s, i) => (
                  <span key={i} className="service-tag">
                    {s}
                  </span>
                ))
              ) : (
                <>
                  <span className="service-tag">Catering</span>
                  <span className="service-tag">Music</span>
                  <span className="service-tag">Furniture</span>
                  <span className="service-tag">Parking</span>
                  <span className="service-tag">Suite bridal</span>
                  <span className="service-tag">Air conditioning</span>
                </>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="services">
            <div className="title">
              <img src={locate} alt="Locate" />
              <h2>Location</h2>
            </div>
            <div className="map">
              <MapLeaf hallLat={currentHall.lat || 36.75} hallLng={currentHall.lng || 3.05} zoom={14} />
            </div>
          </div>

          {/* Schedule */}
          <div className="services">
            <div className="schedule">
              <div className="title">
                <img src={sched} alt="Schedule" />
                <h2>Schedule</h2>
              </div>
              <Schedule bookedDates={bookedDates} pinnedDate={10} />
            </div>
          </div>
        </div>

        {/* Hall Info */}
        <div className="hall-card-info">
          <div className="image-holder">
            <div className="owner-pfp">
              <Link to="/profile">
                <img src={pfp} alt="Owner profile" />
              </Link>
            </div>

            <img src={currentHall?.images?.[0] || currentHall?.image?.[0]} alt="main" className="main" />
            <img src={currentHall?.images?.[1] || currentHall?.image?.[1]} alt="side2" className="small1" />
            <img src={currentHall?.images?.[2] || currentHall?.image?.[2]} alt="side3" className="small2" />
            <div className="small3" onClick={() => setShowPopup(true)}>
              <img src={currentHall?.images?.[0] || currentHall?.image?.[0]} alt="side4" />
              <div className="see-more-overlay">See more</div>
            </div>
            {showPopup && (
              <div className="popup" onClick={() => setShowPopup(false)}>
                <button className="close-popup">&times;</button>
                <div
                  className="popup-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  {(currentHall.images || currentHall.image)?.map((hi, index) => (
                    <img key={index} src={hi} alt={`Hall image ${index + 1}`} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="hall-details">
            <div className="info-name">
              <h2 className="hall-name">{currentHall.name}</h2>
              <p className="hall-rating">{currentHall.rating} ★</p>
            </div>
            <p className="hall-location">{currentHall.location}</p>
            <p className="hall-description">{currentHall.description}</p>
            <p className="price">{Number(currentHall.price).toLocaleString()} DZD</p>

            <button
              className={`book-now-button ${booked ? "gray" : showBooking ? "active" : ""
                }`}
              onClick={handleBookClick}
            >
              {booked ? "Booked" : showBooking ? "Booking..." : "Book Now"}
            </button>

            {showBooking && !booked && (
              <div className="booking-section">
                <div className="booking-inputs">
                  <div className="input-group">
                    <label>From</label>
                    <input
                      type="date"
                      className="date-input"
                      value={fromDate}
                      onChange={handleFromChange}
                    />
                  </div>
                  <div className="input-group">
                    <label>To</label>
                    <input
                      type="date"
                      className="date-input"
                      value={toDate}
                      onChange={handleToChange}
                      min={fromDate || ""}
                    />
                  </div>
                </div>

                <div className="total-price-preview">
                  Total: {currentHall.price} DZD (Estimate)
                </div>

                <button className="confirm-button" onClick={handleConfirm}>
                  Confirm
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HallCard;
