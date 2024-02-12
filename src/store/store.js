import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./slices/productSlice/productSlice";

export const store = configureStore({
  reducer: {
    product: productSlice.reducer,
  },
});
