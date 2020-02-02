import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Profile() {
  const username = useSelector(state => state.user);
  const events = useSelector(state => state.events);
  console.log(events.length);
  const userEvents = events.filter(event => event.username === username);

  //   useEffect(() => {
  //     async function fetchEventsAttending() {
  //       const response = await fetch("/events/attending");
  //       const body = await response.json();
  //       if (body.success) {
  //         console.log(body.message);
  //       }
  //     }
  //     fetchEventsAttending();
  //   }, []);

  return (
    <div>
      <h1>Hello, {username}</h1>
      <h2>Events created</h2>
      <ul>
        {userEvents.map((event, idx) => {
          return (
            <li key={idx}>
              <Link to={`/event/${event._id}`}>{event.name}</Link>
            </li>
          );
        })}
      </ul>
      <h2>Events attending</h2>
      <ul></ul>
    </div>
  );
}
