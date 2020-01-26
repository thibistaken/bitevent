import { createStore } from "redux";

const initialState = { user: "", sessionId: "" };
function reducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, user: action.user };
    case "LOGOUT":
      return { ...state, sessionId: "" };
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
