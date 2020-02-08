import React, { useEffect, useState } from "react";
import Login from "./Login.jsx";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import "./Events.css";

export default function Events() {
  const username = useSelector(state => state.user);
  const nonFilteredEvents = useSelector(state => state.events);
  console.log("non-filtered", nonFilteredEvents);
  const [eventSearchName, setEventSearchName] = useState("");
  const [eventSearchCategory, setEventSearchCategory] = useState("");
  const [eventSearchDate, setEventSearchDate] = useState("");
  const dispatch = useDispatch();
  const eventsFiltered = nonFilteredEvents.filter(event => {
    return event.name.includes(eventSearchName) &&
      event.category.includes(eventSearchCategory) &&
      !eventSearchDate
      ? true
      : new Date(event.date) >= new Date(eventSearchDate);
  });

  console.log("filtered events", eventsFiltered);

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
          <Form inline>
            <Form.Control
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              onChange={event => setEventSearchName(event.target.value)}
            />

            <Form.Group controlId="formBasicCapacity">
              <Form.Label>Event Type</Form.Label>
              <Form.Control
                as="select"
                onChange={event => setEventSearchCategory(event.target.value)}
              >
                <option value="" defaultValue>
                  All
                </option>
                <option value="Bitcoin Meetup">Bitcoin Meetup</option>
                <option value="Conference">Conference</option>
                <option value="Socratic Seminar">Socratic Seminar</option>
                <option value="Schelling Dinner">Schelling Dinner</option>
                <option value="BBQ">BBQ</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Date
                <Form.Control
                  type="date"
                  onChange={event => setEventSearchDate(event.target.value)}
                  required
                />
              </Form.Label>
            </Form.Group>
            <Button type="submit" variant="outline-success">
              Search
            </Button>
          </Form>

          <div>
            {eventsFiltered.length === 0 ? (
              <div>
                Sorry, no events! Go <Link to="/new/event">create one</Link>{" "}
                now!
              </div>
            ) : (
              <div className="events-wrapper">
                {eventsFiltered.map((event, idx) => {
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
