import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const loggedIn = useSelector(state => state.user);
  const Container = styled.section`
    display: flex;
    justify-content: center;
    color: white;
    padding: 180px;
    height: 100vh;
    background-color: #f2a900;
  `;
  const Title = styled.h1`
    font-weight: 900;
    font-size: 150px;
    line-height: 90%;
    width: 600px;
    font-family: "Source Sans Pro", sans-serif;
  `;
  const StyledLink = styled.a`
    font-family: "Courier New";
    color: white;
    font-size: 2em;
  `;
  const Paragraph = styled.p`
    font-family: "Open Sans";
  `;
  const FlexSection = styled.div`
    justify-content: center;
  `;
  const Image = styled.img`
    animation: rotation 3s infinite linear;
    width: 80px;
    @keyframes rotation {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(359deg);
      }
    }
  `;
  return (
    <Container>
      <Title>BITCOIN ONLY. BE MAXI.</Title>
      {loggedIn ? (
        <StyledLink>
          <Link to="/events">Browse Events</Link>
        </StyledLink>
      ) : (
        <FlexSection>
          <Paragraph>
            Meet local bitcoiners in your city. Starting in Montreal.
          </Paragraph>
          <Image src="/uploads/btclogo.png" />
          <StyledLink>
            <Link to="/events">>> Create an account</Link>
          </StyledLink>
        </FlexSection>
      )}
    </Container>
  );
}

export default Home;
