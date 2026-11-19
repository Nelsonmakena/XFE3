import type { ApiResponse } from "@/types/types";
import { handleAxiosError } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface AccountRole {
  account_role_id: string;
  role_name: string;
}

interface NewAccountRoleInput {
  role_name: string;
}
interface initialState {
  accountRoles: AccountRole[];
}

const initialState: initialState = {
  accountRoles: [],
};

//geting list of account roles

export const getAccountRoleList = createAsyncThunk<
  ApiResponse<AccountRole[]>,
  void,
  { rejectValue: ApiResponse<never> }
>("account-role", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<ApiResponse<AccountRole[]>>(
      "/api/admin/account-role",
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

//adding a new account role
export const newAccountRole = createAsyncThunk<
  ApiResponse<AccountRole>,
  NewAccountRoleInput,
  { rejectValue: ApiResponse<never> }
>("new-account-role", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.put<ApiResponse<AccountRole>>(
      "/api/admin/account-role",
      data,
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAccountRoleList.fulfilled, (state, action) => {
        if (action.payload.success && action.payload.data) {
          state.accountRoles = action.payload.data;
        }
      })
      .addCase(newAccountRole.fulfilled, (state, action) => {
        if (action.payload.success && action.payload.data) {
          state.accountRoles.push(action.payload.data);
        }
      });
  },
});

export default accountSlice.reducer;
