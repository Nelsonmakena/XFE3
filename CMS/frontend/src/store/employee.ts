import type { ApiResponse } from "@/types/types";
import { handleAxiosError } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Employee {
  role: string;
}

interface EmpoloyeeRole {
  role_id: string;
  role_name: string;
  role_description: string;
  employeeCount: number;
}

interface initialState {
  employeeRoles: EmpoloyeeRole[];
  employees: Employee[];
}

const initialState: initialState = {
  employeeRoles: [],
  employees: [],
};

///fetching employee roles

export const getEmployeeRoleList = createAsyncThunk<
  ApiResponse<EmpoloyeeRole[]>,
  void,
  { rejectValue: ApiResponse<never> }
>("employee-role", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<ApiResponse<EmpoloyeeRole[]>>(
      "/api/admin/employee-role",
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

///adding a new employee role
export const newEmployeeRole = createAsyncThunk<
  ApiResponse<EmpoloyeeRole>,
  void,
  { rejectValue: ApiResponse<never> }
>("new-employee-role", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.put<ApiResponse<EmpoloyeeRole>>(
      "/api/admin/employee-role",
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const employeeSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeRoleList.fulfilled, (state, action) => {
        if (action.payload.success && action.payload.data) {
          state.employeeRoles = action.payload.data;
        }
      })
      .addCase(newEmployeeRole.fulfilled, (state, action) => {
        if (action.payload.success && action.payload.data) {
          state.employeeRoles.push(action.payload.data);
        }
      });
  },
});

export default employeeSlice.reducer;
