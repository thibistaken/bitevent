import React from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Home from "./Home.jsx";
import NavBar from "./NavBar.jsx";
import { Link } from "react-router-dom";

function App() {
  const username = useSelector(state => state.username);
  const dispatch = useDispatch();
  return (
    <div>
      <NavBar />
    </div>
  );
}

export default App;
