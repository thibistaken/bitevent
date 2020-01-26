import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

function NavBar() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    async function checkLoggedIn() {
      const data = new FormData();
      data.append("user", user);
      const response = await fetch("/session");
      const body = await response.json();
      if (body.user) {
        dispatch({ type: "LOGIN_SUCCESS", user: body.user });
      }
    }
    checkLoggedIn();
  }, []);

  return (
    <div>
      <Navbar bg="light">
        <Link to="/">
          <Navbar.Brand>BitEvent</Navbar.Brand>
        </Link>
        <Nav className="mr-auto">
          <Link to="/events">
            <Nav.Link>Events</Nav.Link>
          </Link>
          <Link to="/create">
            <Nav.Link>Create</Nav.Link>
          </Link>
        </Nav>
        {!user ? (
          <>
            <Link to="/login">
              <Button variant="outline-secondary">Log In</Button>
            </Link>
            <Link to="/signup">
              <Button variant="primary" type="button">
                Sign Up
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Navbar.Text>Signed in as :{user}</Navbar.Text>
            <Link to="/">
              <Button
                variant="outline-danger"
                onClick={() => dispatch({ type: "LOGOUT" })}
              >
                Logout
              </Button>
            </Link>
          </>
        )}
      </Navbar>
    </div>
  );
}

export default NavBar;
