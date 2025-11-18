import { useState } from "react";
import "./Schedule.css";

export default function Calendar({ bookedDates = [], pinnedDate = null }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const month = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  const firstDay = new Date(year, currentDate.getMonth(), 1).getDay();
  const totalDays = new Date(year, currentDate.getMonth() + 1, 0).getDate();

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= totalDays; i++) days.push(i);

  const prevMonth = () => {
    setCurrentDate(new Date(year, currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, currentDate.getMonth() + 1, 1));
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={prevMonth}>‹</button>
        <h2>{month} {year}</h2>
        <button onClick={nextMonth}>›</button>
      </div>

      <div className="calendar-grid">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
          <div className="day-name" key={d}>{d}</div>
        ))}

        {days.map((day, index) => {
  const isBooked = day && bookedDates.includes(day);
  const isPinned = day && day === pinnedDate;

  return (
    <div
      key={index}
      className={`day-cell 
        ${isBooked ? "booked" : ""} 
        ${isPinned ? "pinned" : ""}
      `}
    >
      {day}
    </div>
  );
})}

      </div>
    </div>
  );
}
