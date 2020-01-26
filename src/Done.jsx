import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Done() {
  return (
    <div>
      <h1>Event is posted!</h1>
      <p>
        View all other <Link to="/events">events</Link>
      </p>
    </div>
  );
}
