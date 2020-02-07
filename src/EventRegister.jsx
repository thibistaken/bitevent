import React from "react";
import { useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

export default function EventRegister(props) {
  const eventId = props.match.params.eventId;
  const registerEvent = useSelector(state => state.registerEvent);
  const username = useSelector(state => state.user);
  const history = useHistory();

  async function handleRegisterEvent() {
    const data = new FormData();
    data.append("username", username);
    data.append("eventId", eventId);
    const response = await fetch("/register-event", {
      method: "POST",
      body: data
    });
    const body = await response.json();
    if (body.success) {
      console.log("You have registered successfully.");
      history.push("/registered");
    }
  }
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{registerEvent.name}</Card.Title>
          <Card.Text>{registerEvent.desc}</Card.Text>
          <Card.Text>
            Current capacity: {registerEvent.capacity} people
          </Card.Text>
        </Card.Body>
      </Card>
      <Form>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your name, or pseudonym."
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Your email to send your ticket. We will destruct it after the event."
          ></Form.Control>
        </Form.Group>
        <Button variant="secondary" onClick={() => history.goBack()}>
          Back
        </Button>
        <Button
          variant="primary"
          type="submit"
          onClick={event => handleRegisterEvent(event)}
        >
          RSVP Now
        </Button>
      </Form>
    </div>
  );
}
