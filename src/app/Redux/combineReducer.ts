import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import chartReducer from "./chart/chartSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  chart: chartReducer,
});

export default rootReducer;
