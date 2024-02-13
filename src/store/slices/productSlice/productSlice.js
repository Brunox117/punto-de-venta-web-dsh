import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    isSaving: false,
    messageSaved: "",
    products: [],
    activeProduct: null,
    // product: {
    //     id: 'abc123',
    //     name: '',
    //     price: 0,
    //     imageUrl: '',
    //     categories: [],
    // }
  },
  reducers: {
    savingNewProduct: (state) => {
      state.isSaving = true;
    },
    addNewEmptyProduct: (state, action) => {
      state.products.push(action.payload);
      state.isSaving = false;
    },
    setActiveProduct: (state, action) => {
      state.activeProduct = action.payload;
    },
    setProducts: (state) => {
      state.products = action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = "";
    },
    setPhotoToActiveProduct: (state, action) => {
      state.activeProduct.imageUrl = action.payload;
      state.isSaving = false;
    },
    clearProductsOnLogout: (state) => {
      state.isSaving = false,
      state.messageSaved = "",
      state.products = [],
      state.activeProduct = null;
    },
    productUpdated: (state, action) => {
      state.isSaving = false;
      state.products = state.products.map((product) => {
        if (product.id === action.payload.id) {
          return action.payload;
        }
        return product;
      });
      state.messageSaved = `:D`;
    },
    deleteProductById: (state, action) => {
      state.activeProduct = null;
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    deleteActiveProduct: (state) => {
      state.activeProduct = null;
    },
    clearMessage: (state) => {
      state.messageSaved = '';
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  savingNewProduct,
  addNewEmptyProduct,
  clearProductsOnLogout,
  deleteProductById,
  productUpdated,
  setActiveProduct,
  setPhotoToActiveProduct,
  setProducts,
  setSaving,
  clearMessage,
  deleteActiveProduct,
} = productSlice.actions;
