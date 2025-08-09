import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CAR_DATA } from "@/app/PriceAnalysis/page";
import axios from "axios";

export interface PriceBudgetRequest {
  price: number;
  page: number;
  limit: number;
  brand: keyof typeof CAR_DATA | null;
  model: string | null;
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

export interface PriceBudgetResponse {
  totalOffers: string;
  data: PriceBudgetsCar[];
}

export interface PriceBudgetsCar {
  brand: string;
  model: string;
  generation: string;
  years: string;
  avgPrice: number;
  medianPrice: number;
  listings: number;
  engine: string;
  transmission: string;
  fuel: string;
  drive: string;
  imageUrl: string;
}

export const fetchBudget = createAsyncThunk<
  PriceBudgetResponse,
  PriceBudgetRequest,
  { rejectValue: string }
>(
  "post/fetchPriceAnalysis",
  async (payload: PriceBudgetRequest, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<PriceBudgetResponse>(
        "/api/price-budget",
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
  data: PriceBudgetResponse | null;
  status: Status;
  error: string | null;
}

const initialState: PriceAnalysisState = {
  data: null,
  status: "idle",
  error: null,
};

const priceBudgetSlice = createSlice({
  name: "priceYears",
  initialState,
  reducers: {
    /** Optional helper to clear state from UI */
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBudget.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchBudget.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchBudget.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? action.error.message ?? "Unknown error";
      });
  },
});

export const { reset } = priceBudgetSlice.actions;

export const selectPriceData = (s: { priceAnalysis: PriceAnalysisState }) =>
  s.priceAnalysis.data;
export const selectPriceStatus = (s: { priceAnalysis: PriceAnalysisState }) =>
  s.priceAnalysis.status;
export const selectPriceError = (s: { priceAnalysis: PriceAnalysisState }) =>
  s.priceAnalysis.error;

export default priceBudgetSlice.reducer;
