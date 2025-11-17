// src/context/RequestsProvider.jsx
import React, { createContext, useState, useContext } from "react";

const RequestsContext = createContext();

export const RequestsProvider = ({ children }) => {
  const [requests, setRequests] = useState([
    { id: 1, client: "Emma Davis", hall: "Golden Palace", phone: "0556789345", from: "2025-11-10", to: "2025-11-12" },
    { id: 2, client: "James Wilson", hall: "Dream Hall", phone: "0798823456", from: "2025-12-01", to: "2025-12-02" },
    { id: 3, client: "ames Wilson", hall: "Dream Hall", phone: "0798823456", from: "2025-12-01", to: "2025-12-02" },
    { id: 4, client: "mes Wilson", hall: "Dream Hall", phone: "0798823456", from: "2025-12-01", to: "2025-12-02" },
    { id: 5, client: "es Wilson", hall: "Dream Hall", phone: "0798823456", from: "2025-12-01", to: "2025-12-02" },
    { id: 6, client: "s Wilson", hall: "Dream Hall", phone: "0798823456", from: "2025-12-01", to: "2025-12-02" },
    { id: 7, client: "Sam Wilson", hall: "Dream Hall", phone: "0798823456", from: "2025-12-01", to: "2025-12-02" },
    { id: 8, client: "Sam Wilson", hall: "Dream Hall", phone: "0798823456", from: "2025-12-01", to: "2025-12-02" },
    { id: 9, client: "Sam Wilson", hall: "Dream Hall", phone: "0798823456", from: "2025-12-01", to: "2025-12-02" },
    { id: 10, client: "Sam Wilson", hall: "Dream Hall", phone: "0798823456", from: "2025-12-01", to: "2025-12-02" },

  ]);

  const [history, setHistory] = useState([
    { id: 101, client: "Lina Roberts", hall: "Royal Orchid", from: "2025-10-10", to: "2025-10-11", status: "Completed" },
  ]);

  const handleAccept = (req) => {
    setHistory([
      ...history,
      { id: Date.now(), client: req.client, hall: req.hall, from: req.from, to: req.to, status: "Completed" },
    ]);
    setRequests(requests.filter((r) => r.id !== req.id));
  };

  const handleReject = (reqId) => {
    setRequests(requests.filter((r) => r.id !== reqId));
  };

  return (
    <RequestsContext.Provider value={{ requests, history, handleAccept, handleReject }}>
      {children}
    </RequestsContext.Provider>
  );
};

export const useRequests = () => useContext(RequestsContext);
