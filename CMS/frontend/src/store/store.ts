import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import scheduleSlice from "./ScheduleSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    schedule: scheduleSlice,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
