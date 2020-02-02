import React, { useEffect, useState } from "react";
import "./Events.css";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function EventDetails(props) {
  const [event, setEvent] = useState(undefined);
  const username = useSelector(state => state.user);
  const eventId = props.match.params.eventId;
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadEventDetails() {
      const response = await fetch(`/event/?id=${eventId}`);
      const body = await response.json();
      if (body.success) {
        setEvent(body.event);
        return;
      }
      console.log("error", body.message);
    }
    loadEventDetails();
  }, [eventId]);

  async function handleDeleteEvent() {
    const response = await fetch(`/delete-event/?id=${eventId}`);
    const body = await response.json();
    if (body.success) {
      history.push("/deleted");
    }
  }
  async function handleRegisterEvent() {
    const data = new FormData();
    data.append("username", username);
    console.log("username", username);
    data.append("eventId", eventId);
    const response = await fetch("/register-event", {
      method: "POST",
      body: data
    });
    const body = await response.json();
    if (body.success) {
      dispatch({ type: "RSVP" });
      history.push("/register");
    }
  }

  return event ? (
    <div>
      <Card>
        <h2>{event.name}</h2>
        <ListGroup variant="flush">
          <ListGroup.Item>Name: {event.desc}</ListGroup.Item>
          <ListGroup.Item>Time: {event.time}</ListGroup.Item>
          <ListGroup.Item>Capacity: {event.capacity} </ListGroup.Item>
          <ListGroup.Item>Location: {event.location}</ListGroup.Item>
        </ListGroup>
        <h2>Confirmed Attendees</h2>
      </Card>
      <LinkContainer to="/events">
        <Button variant="outline-secondary">Back to Events</Button>
      </LinkContainer>
      <Button variant="outline-danger" onClick={() => handleDeleteEvent()}>
        Delete Event
      </Button>
      <Button variant="outline-primary" onClick={() => handleRegisterEvent()}>
        RSVP
      </Button>
    </div>
  ) : (
    <div>why wait?</div>
  );
}
