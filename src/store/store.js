import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./slices/productSlice/productSlice";
import { branchSlice } from "./slices/branchSlice/branchSlice";
import { categorySlice } from "./slices/categorySlice/categorySlice";


export const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    branch: branchSlice.reducer,
    category: categorySlice.reducer,
  },
});
