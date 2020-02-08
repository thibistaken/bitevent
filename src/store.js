import { createStore } from "redux";

const initialState = {
  user: undefined,
  sessionId: "",
  events: [],
  registerEvent: ""
};
function reducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, user: action.email };
    case "NEW_EVENTS":
      return { ...state, events: action.events };
    case "LOGOUT":
      return { ...state, user: "", sessionId: "" };
    case "RSVP":
      return { ...state, registerEvent: action.registerEvent };
    default:
      return state;
  }
}

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
