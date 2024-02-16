import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./slices/productSlice/productSlice";
import { branchSlice } from "./slices/branchSlice/branchSlice";
import { categorySlice } from "./slices/categorySlice/categorySlice";
import { supplierSlice } from "./slices/supplierSlice";
import { postSlice } from "./slices/postSlice/postSlice";
import { bannerSlice } from "./slices/bannerSlice/bannerSlice";


export const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    branch: branchSlice.reducer,
    category: categorySlice.reducer,
    supplier: supplierSlice.reducer,
    post: postSlice.reducer,
    banner: bannerSlice.reducer,
  },
});
