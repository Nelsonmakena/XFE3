import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface loginData {
  email: string;
  password: string;
}

interface checkAuth {
  success: boolean;
  message: string;
  data: User["user"];
}
export interface User {
  isLoading: boolean;
  user: {
    first_name: string;
    last_name: string;
    instructor_id: string;
    role: string;
  };
  authenticated: boolean;
}
const initialState: User = {
  isLoading: true,
  user: { first_name: "", last_name: "", instructor_id: "", role: "" },
  authenticated: false,
};
///instructor login
export const InstructorLogin = createAsyncThunk(
  "instructor-log",
  async (data: loginData) => {
    const response = await axios.post("/api/auth/instructor", data);
    return response.data;
  },
);

//checking auth
export const checkAuth = createAsyncThunk<checkAuth>("check-auth", async () => {
  const response = await axios.get<checkAuth>("/api/auth/check-auth");
  return response.data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(InstructorLogin.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.user = action.payload.data;
          state.isLoading = false;
          state.authenticated = true;
        }
      })
      .addCase(InstructorLogin.pending, (state) => {
        state.authenticated = false;
        state.isLoading = true;
      })
      .addCase(InstructorLogin.rejected, (state) => {
        state.authenticated = false;
        state.isLoading = false;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.user = action.payload.data;
          state.authenticated = true;
        } else {
          state.isLoading = false;
          state.authenticated = false;
        }
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.authenticated = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authenticated = false;
        state.isLoading = false;
      });
  },
});
export default authSlice.reducer;
