import React from "react";
import { Link } from "react-router-dom";
import Container from "./styles/Container.jsx";

export default function Deleted() {
  return (
    <Container>
      <div>
        <h1>Event is deleted!</h1>
        <p>
          View the other <Link to="/events">events</Link>
        </p>
      </div>
    </Container>
  );
}
