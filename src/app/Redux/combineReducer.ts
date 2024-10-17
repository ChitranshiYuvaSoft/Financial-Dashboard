import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import coinReducer from "./coin/coinSlice";
import chartReducer from "./chart/chartSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  coin: coinReducer,
  chart: chartReducer,
});

export default rootReducer;
