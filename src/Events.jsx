import React, { useEffect, useState } from "react";
import Login from "./Login.jsx";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import TitleMedium from "./styles/TitleMedium.jsx";
import ContainerEvents from "./styles/ContainerEvents.jsx";
import SearchBarContainer from "./styles/SearchBarContainer.jsx";
import SearchResultsContainer from "./styles/SearchResultsContainer.jsx";
import EventCard from "./EventCard.jsx";
import "./Events.css";

export default function Events() {
  const username = useSelector(state => state.user);
  const nonFilteredEvents = useSelector(state => state.events);
  console.log("non-filtered", nonFilteredEvents);
  const [eventSearchName, setEventSearchName] = useState("");
  const [eventSearchCategory, setEventSearchCategory] = useState("");
  const [eventSearchCity, setEventSearchCity] = useState("");
  const [eventSearchDate, setEventSearchDate] = useState("");
  const dispatch = useDispatch();
  const eventsFiltered = nonFilteredEvents.filter(event => {
    return event.name.includes(eventSearchName) &&
      event.category.includes(eventSearchCategory) &&
      event.location.includes(eventSearchCity) &&
      !eventSearchDate
      ? true
      : new Date(event.date) >= new Date(eventSearchDate);
  });
  const eventsFilteredCategoryBitcoinMeetup = nonFilteredEvents.filter(
    event => {
      return event.category === "Bitcoin Meetup";
    }
  );
  const eventsFilteredCategoryConference = nonFilteredEvents.filter(event => {
    return event.category === "Conference";
  });
  const eventsFilteredCategorySocratic = nonFilteredEvents.filter(event => {
    return event.category === "Socratic Seminar";
  });
  const eventsFilteredCategorySchelling = nonFilteredEvents.filter(event => {
    return event.category === "Schelling Dinner";
  });
  const eventsFilteredCategoryBbq = nonFilteredEvents.filter(event => {
    return event.category === "BBQ";
  });
  const eventsFilteredCityMontreal = nonFilteredEvents.filter(event => {
    return event.location === "Montreal";
  });
  const eventsFilteredCityToronto = nonFilteredEvents.filter(event => {
    return event.location === "Toronto";
  });
  const eventsFilteredCityOttawa = nonFilteredEvents.filter(event => {
    return event.location === "Ottawa";
  });
  const eventsFilteredCityQuebec = nonFilteredEvents.filter(event => {
    return event.location === "Quebec City";
  });
  const eventsFilteredCityVancouver = nonFilteredEvents.filter(event => {
    return event.location === "Vancouver";
  });
  const eventsFilteredCityHalifax = nonFilteredEvents.filter(event => {
    return event.location === "Halifax";
  });

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
        <ContainerEvents>
          <SearchBarContainer>
            <TitleMedium>Discover Bitcoin Events</TitleMedium>
            <Form>
              <Form.Control
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                onChange={event => setEventSearchName(event.target.value)}
              />

              <Form.Group controlId="formBasicCapacity">
                <Form.Label>Type</Form.Label>
                <Form.Control
                  as="select"
                  onChange={event => setEventSearchCategory(event.target.value)}
                >
                  <option value="" defaultValue>
                    All ({eventsFiltered.length})
                  </option>
                  <option value="Bitcoin Meetup">
                    Bitcoin Meetup ({eventsFilteredCategoryBitcoinMeetup.length}
                    )
                  </option>
                  <option value="Conference">
                    Conference ({eventsFilteredCategoryConference.length})
                  </option>
                  <option value="Socratic Seminar">
                    Socratic Seminar ({eventsFilteredCategorySocratic.length})
                  </option>
                  <option value="Schelling Dinner">
                    Schelling Dinner ({eventsFilteredCategorySchelling.length})
                  </option>
                  <option value="BBQ">
                    BBQ ({eventsFilteredCategoryBbq.length})
                  </option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Location</Form.Label>
                <Form.Control
                  as="select"
                  onChange={event => setEventSearchCity(event.target.value)}
                >
                  <option value="Montreal">
                    Montreal ({eventsFilteredCityMontreal.length})
                  </option>
                  <option value="Toronto">
                    Toronto ({eventsFilteredCityToronto.length})
                  </option>
                  <option value="Ottawa">
                    Ottawa ({eventsFilteredCityOttawa.length})
                  </option>
                  <option value="Quebec City">
                    Quebec City ({eventsFilteredCityQuebec.length})
                  </option>
                  <option value="Vancouver">
                    Vancouver ({eventsFilteredCityVancouver.length})
                  </option>
                  <option value="Halifax">
                    Halifax ({eventsFilteredCityHalifax.length})
                  </option>
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
          </SearchBarContainer>

          {eventsFiltered.length === 0 ? (
            <div>
              Sorry, no events! Go <Link to="/new/event">create one</Link> now!
            </div>
          ) : (
            <SearchResultsContainer>
              {eventsFiltered.map((event, idx) => {
                return <EventCard event={event} />;
              })}
            </SearchResultsContainer>
          )}
        </ContainerEvents>
      ) : (
        <>
          <Login />
        </>
      )}
    </div>
  );
}
