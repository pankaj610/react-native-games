import { applyMiddleware, combineReducers, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import appReducer from "./reducers/appReducer";
import devoteeReducer from "./reducers/devoteeReducer";

const middlewares = [thunk];
middlewares.push(createLogger());

const reducers = {
  appReducer,
  devoteeReducer,
};
const initialState = {};
const store = createStore(
  combineReducers(reducers),
  initialState,
  applyMiddleware(...middlewares),
);

export default store;
