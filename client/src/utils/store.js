import { createStore, combineReducers, applyMiddleware } from "redux";
// import { configureStore } from "@reduxjs/toolkit";

import thunk from "redux-thunk";

import { composeWithDevTools } from "@redux-devtools/extension";
import { rootReducer } from "./rootReducers";

const finalReducer = combineReducers({
  rootReducer,
});

const initialState = {
  rootReducer: {
    cartProducts: localStorage.getItem("cartProducts")
      ? JSON.parse(localStorage.getItem("cartProducts"))
      : [],
  },
};

const middleware = [thunk];

const store = createStore(
  finalReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
