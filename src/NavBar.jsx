import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useHistory, Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

export default function NavBar() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

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
          <LinkContainer to="/event/new">
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
            <Navbar.Text>Signed in as: {user}</Navbar.Text>
            <Button variant="outline-danger" onClick={() => handleLogOut()}>
              Logout
            </Button>
          </>
        )}
      </Navbar>
    </div>
  );
}
