import { createStore } from "redux";

const initialState = { username: "" };
function reducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, username: action.payload };
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
