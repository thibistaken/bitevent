import React from "react";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";

function Home() {
  return (
    <div>
      <h1>Meet Local Bitcoiners</h1>
      <p>
        One of the best things on this planet is meeting with your local bitcoin
        community. Too often, organizing events relies on Meetup and Eventbrite,
        which charge fees (even for free events) and hold cash in escrow for a
        few business days after the event is done. There is also no way to RSVP
        to an event in a private way. We're trying to fix this.
      </p>
      <LinkContainer to="/events">
        <Button variant="primary" type="button">
          Browse Events
        </Button>
      </LinkContainer>
    </div>
  );
}

export default Home;
