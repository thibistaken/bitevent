import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Title from "./styles/Title.jsx";
import StyledLink from "./styles/StyledLink.jsx";
import Paragraph from "./styles/Paragraph.jsx";
import Container from "./styles/Container.jsx";
import ImageRotateHome from "./styles/ImageRotateHome.jsx";
import FlexSection from "./styles/FlexSection.jsx";
import { LinkContainer } from "react-router-bootstrap";
import Button from "react-bootstrap/Button";
function Home() {
  const loggedIn = useSelector(state => state.user);

  return (
    <Container>
      <div>
        <Title>BITCOIN ONLY. BE MAXI.</Title>
        <Paragraph>
          Meet local bitcoiners in your city. Starting in Montreal.
        </Paragraph>
        <LinkContainer to="/signup">
          <Button variant="primary">Join Now for Free</Button>
        </LinkContainer>
      </div>
      {loggedIn ? (
        <StyledLink>
          <Link to="/events">Browse Events</Link>
        </StyledLink>
      ) : (
        <FlexSection>
          <div>
            <ImageRotateHome src="/uploads/btclogo.png" />
          </div>
        </FlexSection>
      )}
    </Container>
  );
}

export default Home;
