import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Home from "./Home.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const username = useSelector(state => state.username);
  const session = useSelector(state => state.sessionId);
  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("req sent to /login endpoint");
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
        user: email,
        sessionId: body.sessionId
      });
      history.push("/home");
      return;
    }
    alert(body.message);
  }

  return (
    <div>
      {!username ? (
        <Form>
          <h2>Log In</h2>
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
      ) : (
        <Home />
      )}
    </div>
  );
}
