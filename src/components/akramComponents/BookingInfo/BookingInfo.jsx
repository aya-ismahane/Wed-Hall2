import React, { useState } from "react";
import Table from "react-bootstrap/Table";
// import OneRow from "../OneRow/OneRow";
import "./BookingInfo.css";
import { previousBookings } from "../../../booking";
import Button from "react-bootstrap/esm/Button";
const BookingInfo = () => {
  const [bookings, setBooking] = useState(previousBookings);
  // console.log(bookings);
  return (
    <div className="bookingInfo-container">
      {/* <Table >
        <thead>
          <tr>
            <th>Hall</th>
            <th>Date</th>
            <th>Location</th>
            <th>Status</th>
          </tr>
        </thead>

      </Table> */}
      <h1>My booking</h1>
      <br />
      <Table size="sm">
        <thead className="header">
          <tr className="frow">
            <th>Hall</th>
            <th>Date</th>
            <th>Location</th>
            <th>Status</th>
          </tr>
        </thead>
        {bookings
          .sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom))
          .map((bk) => (
            <tbody>
              <tr className="body">
                <td>{bk.hallName}</td>
                <td>
                  from {bk.dateFrom} to {bk.dateTo}
                </td>
                <td>{bk.location}</td>
                <td>
                  <Button
                    className="status_btn"
                    style={{
                      color:
                        bk.status === "Accepted"
                          ? "green"
                          : bk.status === "Rejected"
                          ? "red"
                          : "orange",
                      // backgroundColor: "white",
                      // border: "none",
                      // fontWeight: "600",
                    }}
                  >
                    {bk.status}
                  </Button>
                </td>
              </tr>
            </tbody>
          ))}
      </Table>
      {/* <OneRow/> */}
    </div>
  );
};

export default BookingInfo;
