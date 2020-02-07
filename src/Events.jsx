import React, { useEffect } from "react";
import Login from "./Login.jsx";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Badge from "react-bootstrap/Badge";
import "./Events.css";

export default function Events() {
  const username = useSelector(state => state.user);
  const events = useSelector(state => state.events);
  const dispatch = useDispatch();
  useEffect(() => {
    async function loadEvents() {
      const response = await fetch("/all-events");
      const body = await response.json();
      if (body.success) {
        dispatch({ type: "NEW_EVENTS", events: body.events });
      }
    }
    loadEvents();
  }, [dispatch]);

  return (
    <div>
      {username ? (
        <div>
          <h1>Discover Bitcoin Events</h1>
          <LinkContainer to="/new/event">
            <Button>Create an Event</Button>
          </LinkContainer>
          <div>
            {events.length === 0 ? (
              <div>
                Sorry, no events! Go <Link to="/new/event">create one</Link>{" "}
                now!
              </div>
            ) : (
              <div className="events-wrapper">
                {events.map((event, idx) => {
                  return (
                    <Card style={{ width: "auto" }} key={idx}>
                      <Card.Body>
                        <Card.Img
                          variant="top"
                          src={event.filePaths[0]}
                          style={{ width: "7rem" }}
                        />
                        <Card.Title>
                          {event.name}{" "}
                          {event.capacity === 0 ? (
                            <Badge variant="danger">SOLD OUT</Badge>
                          ) : (
                            <Badge variant="secondary">
                              {event.capacity} spots left
                            </Badge>
                          )}
                        </Card.Title>
                        <Card.Text>{event.desc}</Card.Text>
                        <Card.Text>Date: {event.date}</Card.Text>
                        <Card.Text>Time: {event.startTime}</Card.Text>
                        <Card.Text>Capacity: {event.capacity} people</Card.Text>
                        <LinkContainer to={`/event/${event._id}`}>
                          <Button variant="primary">View Event Details</Button>
                        </LinkContainer>
                      </Card.Body>
                      <Card.Footer>
                        <small className="text-muted">
                          Created by{" "}
                          <Link to="/profile/">{event.username}</Link> on{" "}
                          {event.timestamp}
                        </small>
                      </Card.Footer>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <Login />
        </>
      )}
    </div>
  );
}
