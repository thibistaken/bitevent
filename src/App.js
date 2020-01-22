import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Signup from "./Signup.jsx";

function App() {
  const username = useSelector(state => state.username);
  const dispatch = useDispatch();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <h3>Make it work</h3>
      <div>Username: {username}</div>
      <Button
        variant="outline-primary"
        onClick={() => dispatch({ type: "LOGIN_SUCCESS", payload: "Thibaud" })}
      >
        Change Username
      </Button>
      <Signup />
    </div>
  );
}

export default App;
