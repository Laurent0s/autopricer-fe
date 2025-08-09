import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CAR_DATA } from "@/types/CarData";
import { api } from "@/lib/api";
import axios from "axios";

export interface PriceAnalysisRequest {
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

export type PriceDistribution = Record<string, number>;

export interface ModelPriceStats {
  averagePrice: number;
  medianPrice: number;
  minPrice: number;
  maxPrice: number;
  totalListings: number;
  priceDistribution: PriceDistribution;
}

export type BrandModels = Record<string, ModelPriceStats>;

export interface PriceAnalysisResponse {
  data: Record<keyof typeof CAR_DATA, BrandModels>;
}

export const fetchPriceAnalysis = createAsyncThunk<
  PriceAnalysisResponse,
  PriceAnalysisRequest,
  { rejectValue: string }
>(
  "post/fetchPriceAnalysis",
  async (payload: PriceAnalysisRequest, { rejectWithValue }) => {
    try {
      const { data } = await api.post<PriceAnalysisResponse>(
        "/price-analyze",
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
  data: PriceAnalysisResponse | null;
  status: Status;
  error: string | null;
}

const initialState: PriceAnalysisState = {
  data: null,
  status: "idle",
  error: null,
};

const priceAnalysisSlice = createSlice({
  name: "priceAnalysis",
  initialState,
  reducers: {
    /** Optional helper to clear state from UI */
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPriceAnalysis.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPriceAnalysis.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchPriceAnalysis.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? action.error.message ?? "Unknown error";
      });
  },
});

export const { reset } = priceAnalysisSlice.actions;

export const selectPriceData = (s: { priceAnalysis: PriceAnalysisState }) =>
  s.priceAnalysis.data;
export const selectPriceStatus = (s: { priceAnalysis: PriceAnalysisState }) =>
  s.priceAnalysis.status;
export const selectPriceError = (s: { priceAnalysis: PriceAnalysisState }) =>
  s.priceAnalysis.error;

export default priceAnalysisSlice.reducer;
