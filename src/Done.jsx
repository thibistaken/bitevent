import React from "react";
import { Link } from "react-router-dom";
import Container from "./styles/Container.jsx";
import { LinkContainer } from "react-router-bootstrap";
import Button from "react-bootstrap/Button";
import TitleMedium from "./styles/TitleMedium.jsx";
export default function Done() {
  return (
    <Container>
      <div>
        <TitleMedium>Event is posted!</TitleMedium>
        <div>
          Congratulations. View all other events that are currently live.
        </div>
        <LinkContainer to="/events">
          <Button>Back to Events</Button>
        </LinkContainer>
      </div>
    </Container>
  );
}
