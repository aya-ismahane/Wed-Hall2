import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Rating from "../Rating/Rating";
import "./OneHall.css";
import { useNavigate } from "react-router-dom";

const OneHall = ({ hall, isAuth, setIsAuth, myFavourite, setMyFavourite, API_BASE, user, userRole }) => {
  const isFav = myFavourite.some((item) => item.id === hall.id);

  const toggleFavourite = async () => {
    if (userRole !== "client" || !user?.id || !API_BASE) {
      setMyFavourite(isFav ? myFavourite.filter((item) => item.id !== hall.id) : [...myFavourite, hall]);
      return;
    }
    try {
      if (isFav) {
        const res = await fetch(`${API_BASE}/akramWork/deleteFromFavourite.php`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ client_id: user.id, hall_id: hall.id }),
        });
        if ((await res.json()).status === "success") {
          setMyFavourite(myFavourite.filter((item) => item.id !== hall.id));
        }
      } else {
        const res = await fetch(`${API_BASE}/akramWork/addToFavourite.php`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ client_id: user.id, hall_id: hall.id }),
        });
        if ((await res.json()).status === "success") {
          setMyFavourite([...myFavourite, hall]);
        }
      }
    } catch (err) {
      console.error("Favourite toggle failed", err);
      setMyFavourite(isFav ? myFavourite.filter((item) => item.id !== hall.id) : [...myFavourite, hall]);
    }
  };
  // !this is the importation of the useNavigate
  const navigate = useNavigate();
  // const [myFavourite, setMyFavourite] = useState([]);
  return (
    <div>
      <Card className="Card">
        <Card.Img
          variant="top"
          src={hall.images?.[0] || "https://images.unsplash.com/photo-1519167758481-83f29da8c2b5?w=800"}
          style={{ height: "200px" }}
          className="image"
        />
        <Card.Body>
          <div className="content">
            <div>
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                height={65}
                width={65}
                style={{
                  borderRadius: "50%",
                  boxShadow: "0px 0px 5px gray",
                  position: "absolute",
                  top: "-3.5rem",
                  right: "12rem",
                  border: "4px solid white",
                }}
              />
              {isAuth && (
                <div
                  style={{ position: "absolute", top: "-3rem", right: "-0rem" }}
                >
                  <i
                    className={`${isFav ? "fa-solid" : "fa-regular"
                      } fa-heart fa-xl`}
                    style={{
                      color: "#ffffff",
                      textShadow: "0px 0px 5px gray",
                      cursor: "pointer",
                    }}
                    onClick={toggleFavourite}
                  ></i>
                </div>
              )}
            </div>

            <div className="tirating">
              <Card.Title className="title">{hall.name}</Card.Title>
            </div>
            {/* <div>
            </div> */}
            <div>
              <Card.Text tag="div" className="location">
                <div>
                  <i className="fa-solid fa-location-dot"></i> {hall.location}{" "}
                </div>
                <div>
                  <Rating isAuth={isAuth} setIsAuth={setIsAuth} />
                </div>{" "}
              </Card.Text>
            </div>
            <div className="price-container">
              <h5 className="price">{hall.price} CENTIM</h5>
            </div>
            <div className="description">
              <Card.Text className="description">
                {" "}
                {hall.description}{" "}
              </Card.Text>
            </div>
          </div>
          <div className="btn-container">
            <Button
              className="btn"
              onClick={() => {
                navigate(`/${hall.id}`);
              }}
            >
              Explore
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default OneHall;
