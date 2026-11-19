import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import employeeSlice from "./employee";
import accountSlice from "./accounts";

const store = configureStore({
  reducer: {
    auth: authSlice,
    employee: employeeSlice,
    accounts: accountSlice,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
