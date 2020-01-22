import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";

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
      <button
        onClick={() => dispatch({ type: "LOGIN_SUCCESS", payload: "Thibaud" })}
      >
        Add Username
      </button>
    </div>
  );
}

export default App;
