import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";

export default function Registered() {
  const event = useSelector(state => state.registerEvent);
  return (
    <div>
      <h1>You are registered to {event.name}!</h1>
      <p>
        You should receive an email confirmation shortly. If not, make sure to
        check your spams, ya know? View other <Link to="/events">events</Link>
      </p>
      <LinkContainer to="/events">
        <Button>Back to Events</Button>
      </LinkContainer>
    </div>
  );
}
