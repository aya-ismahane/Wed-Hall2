import React, { useEffect, useState } from "react";
import "./FIlter.css";
import Dropdown from "react-bootstrap/Dropdown";

const Filter = ({ halls, setHalls, weddingHalls }) => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        console.error("Error:", err);
        alert("Please allow location access to filter by distance.");
      }
    );
  }, []);
  console.log("userLocation", userLocation);
  // !this is the function used to calculate the distance between two points using the Haversine formula
  const [distanceFilter, setDistanceFilter] = useState(null);
  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  }
  // !this is the function used to convert degrees to radians
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  // !this is the function used to filter halls based on distance
  const filterByDistance = (min, max) => {
    if (!userLocation) {
      alert("Please allow location access to filter by distance.");
      return;
    }
    setHalls(
      weddingHalls.filter((hl) => {
        const distance = getDistanceFromLatLonInKm(
          userLocation.lat,
          userLocation.lng,
          hl.lat,
          hl.lng
        );
        return distance > min && distance <= max;
      })
    );
  };
  // !this is the function used to get the value of the startin gand the end date
  const [periodDate, setPeriodDate] = useState({ startDate: "", endDate: "" });

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    const newPeriod = { ...periodDate, [name]: value };

    // Validate
    if (newPeriod.startDate && newPeriod.endDate) {
      if (new Date(newPeriod.endDate) < new Date(newPeriod.startDate)) {
        // Reset invalid input
        // if (name === "endDate") {
        alert("the end can not be greater than then start");
        e.target.value = "";
        newPeriod.endDate = "";
        newPeriod.startDate = "";
      }
    }

    setPeriodDate(newPeriod);
    filterByDate(newPeriod);
  };

  console.log(periodDate);
  // !this is the function used to filter by the dates
  const filterByDate = (period = periodDate) => {
  if(period.startDate && period.endDate){
    const start = new Date(period.startDate);
    const end = new Date(period.endDate);

    setHalls(
      weddingHalls.filter(hl => {
        const bookings = hl.bookingPeriod || [];
        return bookings.every(bp =>
          new Date(bp.endDate) < start || new Date(bp.startDate) > end
        );
      })
    );
  }
};

  // !this is the start of the main function
  return (
    <div>
      <div className="filter">
        {/* <Form.Select aria-label="Default select example">
          <option>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select> */}
        <div className="inside-filter">
          <Dropdown className="d-inline  ">
            <Dropdown.Toggle className="toggle">Start</Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  setPeriodDate({ ...periodDate, startDate: "", endDate: "" });
                  setHalls(weddingHalls);
                }}
              >
                ALL
              </Dropdown.Item>
              {/* <Dropdown.Item> */}
              <div className="date-container">
                {" "}
                <label for="startDate">start:</label>
                <input
                  id="startDate"
                  type="date"
                  className="dateperiod"
                  name="startDate"
                  value={periodDate.startDate}
                  onChange={handleDateChange}
                />
              </div>

              {/* </Dropdown.Item> */}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown className="d-inline" autoClose="inside">
            <Dropdown.Toggle className="toggle">end</Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  setHalls(weddingHalls);
                }}
              >
                ALL
              </Dropdown.Item>
              <div className="date-container">
                {" "}
                <label htmlFor="endDate">end:</label>
                <input
                  id="endDate"
                  type="date"
                  className="dateperiod"
                  name="endDate"
                  value={periodDate.endDate}
                  onChange={handleDateChange}
                />
              </div>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown className="d-inline" autoClose="outside">
            <Dropdown.Toggle className="toggle">Localisation</Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  setHalls(weddingHalls);
                }}
              >
                ALL
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  filterByDistance(0, 5);
                }}
              >
                From 0 To 5 KM{" "}
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  filterByDistance(5, 10);
                }}
              >
                From 5 To 10 KM{" "}
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  filterByDistance(10, 20);
                }}
              >
                From 10 To 20 KM{" "}
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  filterByDistance(20, 30);
                }}
              >
                From 20 To 30 KM{" "}
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  filterByDistance(30, 1000000000000000);
                }}
              >
                More than 30 KM{" "}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="d-inline" autoClose={false}>
            <Dropdown.Toggle className="toggle">Price</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  setHalls(weddingHalls);
                }}
              >
                ALL
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setHalls(
                    weddingHalls.filter(
                      (hl) => hl.price >= 5000000 && hl.price < 10000000
                    )
                  );
                }}
              >
                From 5 to 10 millions{" "}
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setHalls(
                    weddingHalls.filter(
                      (hl) => hl.price >= 10000000 && hl.price < 20000000
                    )
                  );
                }}
              >
                from 10 to 20 milllions{" "}
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setHalls(
                    weddingHalls.filter(
                      (hl) => hl.price >= 20000000 && hl.price < 30000000
                    )
                  );
                }}
              >
                from 20 to 30 millions
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setHalls(
                    weddingHalls.filter(
                      (hl) => hl.price >= 30000000 && hl.price <= 40000000
                    )
                  );
                }}
              >
                from 30 to 40 millions
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setHalls(weddingHalls.filter((hl) => hl.price >= 40000000));
                }}
              >
                more than 40 millions
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          
        </div>
      </div>
    </div>
  );
};

export default Filter;
