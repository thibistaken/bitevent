import React from "react";
import { useSelector, useDispatch } from "react-redux";

function Home() {
  const username = useSelector(state => state.username);
  const dispatch = useDispatch();
  return <div>Home</div>;
}

export default Home;
