import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Login from "./Login.jsx";

export default function Events() {
  const username = useSelector(state => state.user);
  return (
    <div>
      {username ? (
        <div>
          <h1>Discover Bitcoin Events</h1>
          <p>All events</p>
        </div>
      ) : (
        <>
          <Login />
        </>
      )}
    </div>
  );
}
