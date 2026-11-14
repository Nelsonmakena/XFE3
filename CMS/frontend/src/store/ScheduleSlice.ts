import { type ApiResponse } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface AcademicYear {
  academicYearId: string;
  name: string;
  startDate: string;
  endDate: string;
  terms: {
    termId: string;
    cohortId: string;
    cohortCode: string;
    startDate: string;
    endDate: string;
  }[];
}

interface InitialState {
  academicYears: AcademicYear[];
}

//all schedule related logic

const initialState: InitialState = {
  academicYears: [],
};

//fetching academic year list

export const getAcademicYearList = createAsyncThunk<
  ApiResponse<AcademicYear[]>
>("academic-year-list", async () => {
  const response = await axios.get<ApiResponse<AcademicYear[]>>(
    "/api/admin/academic-year",
    {
      withCredentials: true,
    },
  );
  return response.data;
});

//adding a  new academic year

export const newAcademicYear = createAsyncThunk(
  "new-academic-year",
  async (data) => {
    const response = await axios.put("/api/admin/academic-year", data, {
      withCredentials: true,
    });

    return response.data;
  },
);

export const ScheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAcademicYearList.fulfilled, (state, action) => {
      state.academicYears = action.payload.data ?? [];
    });
  },
});

export default ScheduleSlice.reducer;
