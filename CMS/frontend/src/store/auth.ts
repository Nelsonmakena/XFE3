import type { ApiResponse } from "@/types/types";
import { handleAxiosError } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface loginData {
  email?: string;
  username?: string;
  password: string;
}
interface TokenData {
  iat: number;
  exp: number;
}
interface checkAuth {
  success: boolean;
  message: string;
  data: (Employee & TokenData) | (Admin & TokenData) | null;
}

export interface Employee {
  first_name: string;
  last_name: string;
  account_id: string;
  role: string;
}
export interface Admin {
  id: string;
  user_name: string;
}
export interface User {
  isLoading: boolean;
  user: Employee | Admin | null;
  authenticated: boolean;
  isCheckingAuth: boolean;
}
const initialState: User = {
  isLoading: true,
  user: null,
  authenticated: false,
  isCheckingAuth: true,
};

///employee login
export const employeeLogin = createAsyncThunk<
  ApiResponse<Employee>,
  loginData,
  { rejectValue: ApiResponse<never> }
>("employee-log", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post<ApiResponse<Employee>>(
      "/api/auth/login",
      data,
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

///admin login
export const adminLogin = createAsyncThunk<
  ApiResponse<Admin>,
  loginData,
  { rejectValue: ApiResponse<never> }
>("admin-log", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post<ApiResponse<Admin>>(
      "/api/auth/admin-login",
      data,
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

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
      .addCase(employeeLogin.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.user = action.payload.data;
          state.isLoading = false;
          state.authenticated = true;
        }
      })
      .addCase(employeeLogin.pending, (state) => {
        state.authenticated = false;
        state.isLoading = true;
      })
      .addCase(employeeLogin.rejected, (state) => {
        state.authenticated = false;
        state.isLoading = false;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.user = action.payload.data;
          state.isLoading = false;
          state.authenticated = true;
        }
      })
      .addCase(adminLogin.pending, (state) => {
        state.authenticated = false;
        state.isLoading = true;
      })
      .addCase(adminLogin.rejected, (state) => {
        state.authenticated = false;
        state.isLoading = false;
      })

      .addCase(checkAuth.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isCheckingAuth = false;
          state.user = action.payload.data;
          state.authenticated = true;
          state.isLoading = false;
        } else {
          state.isCheckingAuth = false;
          state.authenticated = false;
        }
      })
      .addCase(checkAuth.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authenticated = false;
        state.isLoading = false;
        state.isCheckingAuth = false;
      });
  },
});
export default authSlice.reducer;
