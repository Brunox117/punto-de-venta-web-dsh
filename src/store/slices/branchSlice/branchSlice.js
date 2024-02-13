import { createSlice } from '@reduxjs/toolkit';

export const branchSlice = createSlice({
    name: 'branch',
    initialState: {
        isSaving: false,
    messageSaved: "",
    branches: [],
    activeBranch: null,
    // branch: {
    //     id: 'ABC123',
    //     name: '',
    //     address: '',
    //     googleMapsLink: '',
    //     imageUrl: '',
    //     schedule: '',
    //     number: '',
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
          }
    }
});


// Action creators are generated for each case reducer function
export const { increment } = branchSlice.actions;