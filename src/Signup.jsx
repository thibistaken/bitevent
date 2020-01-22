import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("req sent to /signup endpoint");
    const data = new FormData();
    data.append("username", username);
    data.append("password", password);
    const response = await fetch("/signup", { method: "POST", body: data });
    const body = await response.json();
    console.log("res received from server", body);
    if (body.success) {
      alert(body.message);
      dispatch({ type: "LOGIN_SUCCESS", payload: username });
      return;
    }
    alert(body.message);
  }
  return (
    <div>
      <Form>
        <h2>Sign Up</h2>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter username"
            onChange={event => setUsername(event.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={event => setPassword(event.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={() => handleSubmit()}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
