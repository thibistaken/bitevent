import React from "react";
import { Link } from "react-router-dom";

export default function Deleted() {
  return (
    <div>
      <h1>Event is deleted!</h1>
      <p>
        View the other <Link to="/events">events</Link>
      </p>
    </div>
  );
}
