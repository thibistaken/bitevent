import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

export default function NavBar() {
  const user = useSelector(state => state.user);
  console.log("user", user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    async function checkLoggedIn() {
      const response = await fetch("/session");
      const body = await response.json();
      if (body.user) {
        dispatch({ type: "LOGIN_SUCCESS", email: body.user });
      }
    }
    checkLoggedIn();
  }, [dispatch]);

  async function handleLogOut() {
    const response = await fetch("/logout");
    const body = await response.json();
    if (body.success) {
      dispatch({ type: "LOGOUT" });
      console.log("user is logged out");
      history.push("/");
      return;
    }
    alert(body.message);
  }

  const btnStyle = { marginLeft: "10px" };
  const cursorHover = { cursor: "pointer" };

  return (
    <div>
      <Navbar bg="light">
        <LinkContainer to="/">
          <Navbar.Brand>BitEvent</Navbar.Brand>
        </LinkContainer>
        <Nav className="mr-auto">
          <LinkContainer to="/events">
            <Nav.Link>Events</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/new/event">
            <Nav.Link>Create</Nav.Link>
          </LinkContainer>
        </Nav>
        {!user ? (
          <>
            <LinkContainer to="/login">
              <Button variant="outline-secondary">Log In</Button>
            </LinkContainer>
            <LinkContainer to="/signup">
              <Button variant="primary" type="button">
                Sign Up
              </Button>
            </LinkContainer>
          </>
        ) : (
          <>
            <LinkContainer to="/profile" style={cursorHover}>
              <Navbar.Text>Signed in as: {user}</Navbar.Text>
            </LinkContainer>
            <Button
              variant="outline-danger"
              style={btnStyle}
              onClick={() => handleLogOut()}
            >
              Logout
            </Button>
          </>
        )}
      </Navbar>
    </div>
  );
}
