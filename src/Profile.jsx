import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Profile() {
  const username = useSelector(state => state.user);
  const events = useSelector(state => state.events);
  console.log(events.length);
  const userEvents = events.filter(event => event.username === username);
  const eventsAttending = events.filter(
    event =>
      username === event.attendees.filter(attendee => attendee === username)
  );
  return (
    <div>
      <h1>Hello, {username}</h1>
      <h2>Events created ({userEvents.length})</h2>
      <ul>
        {userEvents.map((event, idx) => {
          return (
            <li key={idx}>
              <Link to={`/event/${event._id}`}>{event.name}</Link>
            </li>
          );
        })}
      </ul>
      <h2>Events attending ({eventsAttending.length})</h2>
      <ul>
        {eventsAttending.map(event => {
          return <li>{event.name}</li>;
        })}
      </ul>
    </div>
  );
}
