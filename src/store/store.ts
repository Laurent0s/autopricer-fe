import { configureStore } from "@reduxjs/toolkit";
import priceAnalysisReducer from "@/store/slices/PriceAnalysisSlice";
import priceYearsReducer from "@/store/slices/PriceYearsSlice";
import priceBudgerReducer from "@/store/slices/PriceBudgetSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      priceAnalysis: priceAnalysisReducer,
      priceYears: priceYearsReducer,
      priceBudget: priceBudgerReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
