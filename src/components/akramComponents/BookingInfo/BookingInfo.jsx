import React, { useState } from "react";
import Table from "react-bootstrap/Table";
// import OneRow from "../OneRow/OneRow";
import "./BookingInfo.css";
import { previousBookings } from "../../../booking";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/esm/Button";
const BookingInfo = () => {
  const [bookings, setBookings] = useState(previousBookings);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  // console.log(bookings);
  // !-----------------------------------------------------------
 const handleSort = (column) => {
  let newOrder = "asc";

  if (sortColumn === column) {
    newOrder = sortOrder === "asc" ? "desc" : "asc";
  }

  setSortColumn(column);
  setSortOrder(newOrder);

  let sorted = [...bookings];

  if (column === "hallName") {
    sorted.sort((a, b) =>
      newOrder === "asc"
        ? a.hallName.localeCompare(b.hallName)
        : b.hallName.localeCompare(a.hallName)
    );
  }

  if (column === "date") {
    sorted.sort((a, b) => {
      const dateA = new Date(a.dateFrom);
      const dateB = new Date(b.dateFrom);
      return newOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
  }

  if (column === "location") {
    sorted.sort((a, b) =>
      newOrder === "asc"
        ? a.location.localeCompare(b.location)
        : b.location.localeCompare(a.location)
    );
  }

  if (column === "status") {
    const priority = (status) => {
      if (status === "Accepted") return 1;
      if (status === "Pending") return 2;
      if (status === "Rejected") return 3;
      return 4;
    };

    sorted.sort((a, b) =>
      newOrder === "asc"
        ? priority(a.status) - priority(b.status)
        : priority(b.status) - priority(a.status)
    );
  }

  setBookings(sorted);
};


  // !-----------------------------------------------------------

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
      {/* <Table size="sm">
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
      </Table> */}
      <div className="table-wrapper">
        <table className="styled-table">
          <thead>
            <tr>
              <th onClick={() => handleSort("hallName")}>
                Hall
                <FontAwesomeIcon icon={faSort} />
              </th>
              <th onClick={() => handleSort("date")}>
                <FontAwesomeIcon icon={faSort} />
                date
              </th>
              <th onClick={() => handleSort("location")}>
                <FontAwesomeIcon icon={faSort} />
                location
              </th>
              {/* <th>Period</th> */}
              <th onClick={() => handleSort("status")}>status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((bk) => (
              <tr key={bk.id}>
                <td>{bk.hallName}</td>
                <td>
                  {bk.dateFrom} → {bk.dateTo}
                </td>
                <td>{bk.location}</td>
                <td>{bk.status}</td>
                {/* <td className="action-buttons">
                        <button className="accept" onClick={() => handleAccept(req)}>
                          <FontAwesomeIcon icon={faCheckCircle} />
                        </button>
                        <button className="reject" onClick={() => setConfirmReject(req)}>
                          <FontAwesomeIcon icon={faTimesCircle} />
                        </button>
                      </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <OneRow/> */}
    </div>
  );
};

export default BookingInfo;
