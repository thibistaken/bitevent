import React, { useEffect, useState } from "react";
import "./Events.css";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import ContainerEventDetails from "./styles/ContainerEventDetails.jsx";
import Badge from "react-bootstrap/Badge";

export default function EventDetails(props) {
  const [event, setEvent] = useState(undefined);
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

  return event ? (
    <ContainerEventDetails>
      <Card>
        <h2>{event.name}</h2>
        <ListGroup variant="flush">
          <ListGroup.Item>{event.desc}</ListGroup.Item>
          <ListGroup.Item>Start Time: {event.startTime}</ListGroup.Item>
          <ListGroup.Item>End Time: {event.endTime}</ListGroup.Item>
          {event.capacity === 0 ? (
            <Badge variant="danger">Sold Out</Badge>
          ) : (
            <ListGroup.Item>Capacity: {event.capacity} </ListGroup.Item>
          )}{" "}
          <ListGroup.Item>Location: {event.location}</ListGroup.Item>
        </ListGroup>
        <div>
          <h2>Confirmed Attendees ({event.attendees.length})</h2>
          <ul>
            {event.attendees.length === 0 ? (
              <div>No attendees for now.</div>
            ) : (
              <div>
                {event.attendees.map((attendee, idx) => {
                  return <li key={idx}>{attendee}</li>;
                })}
              </div>
            )}
          </ul>
        </div>
        <LinkContainer to="/events">
          <Button variant="outline-secondary">Back to Events</Button>
        </LinkContainer>
        <Button variant="outline-danger" onClick={() => handleDeleteEvent()}>
          Delete Event
        </Button>
        <LinkContainer to={`/register/${eventId}`}>
          <Button
            variant="primary"
            onClick={() => dispatch({ type: "RSVP", registerEvent: event })}
          >
            RSVP
          </Button>
        </LinkContainer>
      </Card>
    </ContainerEventDetails>
  ) : (
    <div>Hold on...</div>
  );
}
