import React from "react";
import { Link } from "react-router-dom";
import Container from "./styles/Container.jsx";

export default function Done() {
  return (
    <Container>
      <h1>Event is posted!</h1>
      <p>
        View all other <Link to="/events">events</Link>
      </p>
    </Container>
  );
}
