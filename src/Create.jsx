import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Login from "./Login.jsx";

export default function Create() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState(0);
  const [photos, setPhotos] = useState("");
  const username = useSelector(state => state.user);
  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData();
    data.append("name", name);
    data.append("desc", desc);
    data.append("time", time);
    data.append("location", location);
    data.append("guests", guests);
    data.append("photos", photos);
    const response = await fetch("/new-event", { method: "POST", body: data });
    const body = await response.json();
    if (body.success) {
      alert(body.message);
      history.push("/done");
    }
    return;
  }
  return (
    <div>
      {username ? (
        <div>
          <Form>
            <h2>Create an event</h2>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the name of your event"
                onChange={event => setName(event.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicDesc">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description of your event"
                onChange={event => setDesc(event.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicTime">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="number"
                placeholder="Time of your event"
                onChange={event => setTime(event.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Location of your event"
                onChange={event => setLocation(event.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicGuests">
              <Form.Label>Guests</Form.Label>
              <Form.Control
                type="number"
                placeholder="Number of guests"
                onChange={event => setGuests(event.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPhotos">
              <Form.Label>Photos</Form.Label>
              <Form.Control
                type="file"
                multiple
                name="photo"
                placeholder="Photos for your event"
                onChange={event => setPhotos(event.target.value)}
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
