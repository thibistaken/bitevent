import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Events from "./Events.jsx";
import TitleMedium from "./styles/TitleMedium.jsx";
import Container from "./styles/Container.jsx";

export default function Login() {
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.user);
  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    const response = await fetch("/login", { method: "POST", body: data });
    const body = await response.json();
    console.log("res received from server", body);
    if (body.success) {
      alert(body.message);
      dispatch({
        type: "LOGIN_SUCCESS",
        email: email,
        sessionId: body.sessionId
      });
      history.push("/events");
      return;
    }
    alert(body.message);
  }

  return (
    <Container>
      {!loggedIn ? (
        <div>
          <Form>
            <TitleMedium>Log In</TitleMedium>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={event => setEmail(event.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={event => setPassword(event.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={event => handleSubmit(event)}
            >
              Submit
            </Button>
          </Form>
          <p>
            Not a user yet? <Link to="/signup">Sign up</Link> instead.
          </p>
        </div>
      ) : (
        <Events />
      )}
    </Container>
  );
}
