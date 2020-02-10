import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";
import Container from "./styles/Container.jsx";
import TitleMedium from "./styles/TitleMedium.jsx";

export default function Registered() {
  const event = useSelector(state => state.registerEvent);
  return (
    <Container>
      <div>
        <TitleMedium>You are registered to {event.name}!</TitleMedium>
        <p>
          You should receive an email confirmation shortly. If not, make sure to
          check your spams, ya know?
        </p>
        <LinkContainer to="/events">
          <Button>Back to Events</Button>
        </LinkContainer>
      </div>
    </Container>
  );
}
