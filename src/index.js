import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./store.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Home.jsx";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import Create from "./Create.jsx";
import Events from "./Events.jsx";
import Done from "./Done.jsx";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/event/new">
        <Create />
      </Route>
      <Route exact path="/events">
        <Events />
      </Route>
      <Route exact path="/done">
        <Done />
      </Route>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
