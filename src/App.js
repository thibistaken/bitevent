import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import NavBar from "./NavBar.jsx";
import Home from "./Home.jsx";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import Create from "./Create.jsx";
import Events from "./Events.jsx";
import Done from "./Done.jsx";
import Profile from "./Profile.jsx";
import EventDetails from "./EventDetails.jsx";
import Deleted from "./Deleted.jsx";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function loadEvents() {
      const response = await fetch("/all-events");
      console.log(response);
      const body = await response.json();
      if (body.success) {
        console.log("body.events", body.events);
        console.log("events are being displayed");
        dispatch({ type: "NEW_EVENTS", events: body.events });
      }
    }
    loadEvents();
  }, [dispatch]);

  return (
    <div>
      <NavBar />
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route path="/new/event">
        <Create />
      </Route>
      <Route exact path="/event/:eventId" component={EventDetails} />
      <Route exact path="/events">
        <Events />
      </Route>
      <Route exact path="/done">
        <Done />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route exact path="/deleted">
        <Deleted />
      </Route>
    </div>
  );
}

export default App;
