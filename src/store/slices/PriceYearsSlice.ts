import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CAR_DATA from "../../../public/data/cars.json";
import { api } from "@/lib/api";
import axios from "axios";

export interface PriceYearsRequest {
  brand: keyof typeof CAR_DATA;
  model: string;
  ifusa: boolean;
  yearfrom: number | null;
  yearTo: number | null;
  bodyType: string | null;
  fuel: string | null;
  transmission: string | null;
  driveType: string | null;
  mileageFrom: number | null;
  mileageTo: number | null;
  engineFrom: number | null;
  engineTo: number | null;
}

export interface YearStat {
  year: number;
  avg_price: number;
  listings: number;
}

export interface ModelSummary {
  averagePriceFrom: string;
  averagePriceTo: string;
  quantity: string;
  years: YearStat[];
}

export interface PriceYearsResponse {
  data: {
    [brand: string]: {
      [model: string]: ModelSummary;
    };
  };
}

export const fetchPriceYears = createAsyncThunk<
  PriceYearsResponse,
  PriceYearsRequest,
  { rejectValue: string }
>(
  "post/fetchPriceAnalysis",
  async (payload: PriceYearsRequest, { rejectWithValue }) => {
    try {
      const { data } = await api.post<PriceYearsResponse>(
        "/price-years",
        payload,
        { headers: { "Content-Type": "application/json" } },
      );
      return data;
    } catch (err: unknown) {
      let message = "Unknown error";

      if (axios.isAxiosError<{ message?: string }>(err)) {
        message = err.response?.data?.message ?? err.message ?? message;
      } else if (err instanceof Error) {
        message = err.message;
      }

      return rejectWithValue(message);
    }
  },
);

// Slice

type Status = "idle" | "loading" | "succeeded" | "failed";

interface PriceAnalysisState {
  data: PriceYearsResponse | null;
  status: Status;
  error: string | null;
}

const initialState: PriceAnalysisState = {
  data: null,
  status: "idle",
  error: null,
};

const priceYearsSlice = createSlice({
  name: "priceYears",
  initialState,
  reducers: {
    /** Optional helper to clear state from UI */
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPriceYears.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPriceYears.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchPriceYears.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? action.error.message ?? "Unknown error";
      });
  },
});

export const { reset } = priceYearsSlice.actions;

export const selectPriceData = (s: { priceAnalysis: PriceAnalysisState }) =>
  s.priceAnalysis.data;
export const selectPriceStatus = (s: { priceAnalysis: PriceAnalysisState }) =>
  s.priceAnalysis.status;
export const selectPriceError = (s: { priceAnalysis: PriceAnalysisState }) =>
  s.priceAnalysis.error;

export default priceYearsSlice.reducer;
