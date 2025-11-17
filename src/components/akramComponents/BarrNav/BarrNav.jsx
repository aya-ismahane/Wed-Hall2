// import { Dropdown } from "antd";
// import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import DropDown from "../DropDown/DropDown";
import { Link } from "react-router-dom";
// import { Flex } from "antd";
// import NavDropdown from "react-bootstrap/NavDropdown";
const BarrNav = ({ isAuth, setIsAuth, owner }) => {
  // const [clicked, setClicked] = useState(false);
  return (
    <div>
      <Navbar
        expand="lg"
        style={{
          backgroundColor: "#9d735b",
          // marginBottom: "5rem",
          // borderRadius: "5px",
        }}
      >
        <Container>
          <Navbar.Brand
            href="#home"
            className="logoName"
            style={{
              fontFamily: "Great Vibes",
              fontWeight: 500,
              fontStyle: "normal",
              fontSize: "xx-large",
              color: "white",
            }}
          >
            Wed Hall
          </Navbar.Brand>
          <div
            className="container-fluid"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <div
              style={{
                fontFamily: "Poppins",
                fontWeight: 400,
                fontStyle: "normal",
                // color:'white',
              }}
            >
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse>
                <Nav style={{ display: "flex", alignItems: "center" }}>
                  <Nav.Link>
                    <Link
                      to={"/landingpage"}
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      Home
                    </Link>
                  </Nav.Link>
                  {!isAuth ? (
                    <>
                      <Nav.Link
                        href="/login"
                        style={{ color: "white" }}
                        
                      >
                        Log in{" "}
                      </Nav.Link>
                      <Nav.Link
                        href="/Signupch"
                        style={{ color: "white" }}
                        
                      >
                        Sing up
                      </Nav.Link>
                      <Nav.Link href="#link" style={{ color: "white" }}>
                        About us
                      </Nav.Link>
                    </>
                  ) : (
                    <>
                      <Nav.Link href="#link" style={{ color: "white" }}>
                        About us
                      </Nav.Link>{" "}
                      <Nav.Link
                        href="/"
                        style={{ color: "white" }}
                        onClick={() => {
                          setIsAuth(false);
                          // setClicked(false);
                        }}
                      >
                        Logout
                      </Nav.Link>{" "}
                      {/* <Link
                        to={"/"}
                        onClick={() => {
                          setIsAuth(false);
                          setClicked(false);
                        }}
                      >
                        Logout
                      </Link> */}
                      {/* <div style={{ position: "relative" }}>
                        {" "}
                        <div>
                          {" "}
                          <Nav.Link
                            href="#link"
                            style={{ color: "white" }}
                            onClick={() => {
                              setClicked(!clicked);
                            }}
                          >
                            My Account
                            <i
                              class="fa-solid fa-caret-down fa-xs"
                              style={{ color: "#ffffff" }}
                            ></i>
                          </Nav.Link>
                        </div>
                        {clicked && (
                          <div
                            style={{
                              position: "absolute",
                              top: "100%",
                              left: 0,
                              zIndex: 1000,
                            }}
                          >
                            <DropDown
                              isAuth={isAuth}
                              setIsAuth={setIsAuth}
                              clicked={clicked}
                              setClicked={setClicked}
                            />
                          </div>
                        )}
                      </div> */}
                      <Nav.Link>
                        <Link
                          to={"/mybooking"}
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          <img
                            src={owner.picture}
                            alt=""
                            height={55}
                            width={55}
                            style={{
                              borderRadius: "50%",
                              marginLeft: "2rem",
                              boxShadow: "0px 0px 5px gray",
                              border: "3px solid white",
                              backgroundColor: "white",
                            }}
                          />
                        </Link>
                      </Nav.Link>
                    </>
                  )}
                </Nav>
              </Navbar.Collapse>
            </div>
          </div>
        </Container>
      </Navbar>
    </div>
  );
};

export default BarrNav;
