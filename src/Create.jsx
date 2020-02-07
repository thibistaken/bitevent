import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Login from "./Login.jsx";
import "./Create.css";

export default function Create() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [photos, setPhotos] = useState([]);
  const username = useSelector(state => state.user);
  console.log("username", username);
  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();
    const d = new Date();
    const timestamp = d.toLocaleString();
    const data = new FormData();
    data.append("name", name);
    data.append("desc", desc);
    data.append("date", date);
    data.append("startTime", startTime);
    data.append("endTime", endTime);
    data.append("location", location);
    data.append("capacity", capacity);
    data.append("username", username);
    data.append("timestamp", timestamp);
    for (const photo of photos) {
      data.append("photo", photo);
    }
    const response = await fetch("/new-event", { method: "POST", body: data });
    const body = await response.json();
    if (body.success) {
      console.log("new event created!");
      console.log("timestamp", timestamp);
      history.push("/done");
      alert(body.message);
      return;
    }
    alert(body.message);
  }
  return (
    <div>
      {username ? (
        <div className="form-wrapper">
          <Form>
            <h1>Create an Event</h1>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the name of your event"
                onChange={event => setName(event.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicDesc">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description of your event"
                onChange={event => setDesc(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Date
                <Form.Control
                  type="date"
                  onChange={event => setDate(event.target.value)}
                  required
                />
              </Form.Label>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Start Time
                <Form.Control
                  type="time"
                  onChange={event => setStartTime(event.target.value)}
                  required
                />
              </Form.Label>
              <Form.Label>
                End Time
                <Form.Control
                  type="time"
                  onChange={event => setEndTime(event.target.value)}
                  required
                />
              </Form.Label>
            </Form.Group>
            <Form.Group controlId="formBasicLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Location of your event"
                onChange={event => setLocation(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicCapacity">
              <Form.Label>Capacity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Number of guests"
                onChange={event => setCapacity(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicPhotos">
              <Form.Label>Photo</Form.Label>
              <Form.Control
                type="file"
                name="photos"
                multiple
                placeholder="Add one photo for your event"
                onChange={event => setPhotos(event.target.files)}
                required
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              onClick={event => handleSubmit(event)}
            >
              Submit
            </Button>
          </Form>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}
