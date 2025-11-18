import './hall-card.css';
import arrow from '../../../images/assets/arrow.svg';
import component from '../../../images/assets/component.svg';
import locate from '../../../images/assets/locate.svg';
import sched from '../../../images/assets/sched.svg';
import hall from '../../../images/assets/hall.png';
import pfp from '../../../images/assets/owner.png';
import React, { useState } from "react";
import Schedule from "../schedule/Schedule.jsx";
import MapLeaf from "../map/Map.jsx";

const HallCard = ({ img, name, rating, location, description, price, services }) => {
  const [showBooking, setShowBooking] = useState(false);
  const [booked, setBooked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Example booked days (from Schedule) - November 2025
  const scheduleBookedDays = [5, 12, 19];
  const bookedDates = scheduleBookedDays.map(day => `2025-11-${String(day).padStart(2, '0')}`);

  const handleBookClick = () => {
    if (!booked) setShowBooking(!showBooking);
  };

  const handleFromChange = (e) => {
    const date = e.target.value;
    if (bookedDates.includes(date)) {
      alert("This 'From' date is already booked!");
      setFromDate("");
    } else {
      setFromDate(date);
      if (toDate && toDate < date) setToDate("");
    }
  };

  const handleToChange = (e) => {
    const date = e.target.value;
    if (bookedDates.includes(date)) {
      alert("This 'To' date is already booked!");
      setToDate("");
    } else if (fromDate && date <= fromDate) {
      alert("'To' date must be after 'From' date!");
      setToDate("");
    } else {
      setToDate(date);
    }
  };

  const handleConfirm = () => {
    if (!fromDate || !toDate) {
      alert("Please select valid dates");
      return;
    }
    alert(`Booking confirmed from ${fromDate} to ${toDate}`);
    setBooked(true);
    setShowBooking(false);
  };
  

  return (
    <div style={{backgroundColor:'transparent'}}>
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
                  <span key={i} className="service-tag">{s}</span>
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
              <MapLeaf hallLat={36.689} hallLng={2.895} />
            </div>
          </div>

          {/* Schedule */}
          <div className="services">
            <div className="schedule">
              <div className="title">
                <img src={sched} alt="Schedule" />
                <h2>Schedule</h2>
              </div>
              <Schedule bookedDates={scheduleBookedDays} pinnedDate={10} />
            </div>
          </div>
        </div>

        {/* Hall Info */}
        <div className="hall-card-info">
          <div className="image-holder">
            <div className="owner-pfp">
              <img src={pfp} alt="owner" />
            </div>

            <img src={hall} alt="main" className="main" />
            <img src={hall} alt="side2" className="small1" />
            <img src={hall} alt="side3" className="small2" />
            <div className="small3" onClick={() => setShowPopup(true)}>
              <img src={hall} alt="side4" />
              <div className="see-more-overlay">See more</div>
            </div>
            {showPopup && (

           <div className="popup" onClick={() => setShowPopup(false)}>
                <button className="close-popup">&times;</button>
                <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                  <img src={hall} alt="1" />
                  <img src={hall} alt="2" />
                  <img src={hall} alt="3" />
                  <img src={hall} alt="4" />
                  <img src={hall} alt="5" />
                </div>
              </div>
            )}
          </div>

          <div className="hall-details">
            <div className="info-name">
              <h2 className="hall-name">{name}</h2>
              <p className="hall-rating">{rating}</p>
            </div>
            <p className="hall-location">{location}</p>
            <p className="hall-description">{description}</p>
            <p className="price">{price}</p>

            <button
              className={`book-now-button ${booked ? "gray" : showBooking ? "active" : ""}`}
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
