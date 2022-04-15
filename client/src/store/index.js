import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice";
import weatherSlice from "./WeatherSlice";

const store = configureStore({
  reducer: { auth: authSlice, weather: weatherSlice },
});

export default store;
