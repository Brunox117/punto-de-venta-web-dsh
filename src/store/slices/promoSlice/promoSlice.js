import { createSlice } from "@reduxjs/toolkit";

export const promoSlice = createSlice({
  name: "promo",
  initialState: {
    isSaving: false,
    messageSaved: "",
    promos: [],
    activePromo: null,
    // banner: {
    //   align: "",
    //   id: "abc123",
    //   name: "",
    //   imageUrl1: "",
    //   imageUrl2: "",
    //   imageUrlG: "",
    // },
  },
  reducers: {
    savingNewPromo: (state) => {
      state.isSaving = true;
    },
    addNewEmptyPromo: (state, action) => {
      // state.products.push(action.payload);
      state.isSaving = false;
    },
    setActivePromo: (state, action) => {
      state.activePromo = action.payload;
    },
    setPromos: (state, action) => {
      state.promos = action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = "";
    },
    setPhotoToActivePromo: (state, action) => {
      if (action.payload.imgNumber === 1)
        state.activePromo.imageUrl1 = action.payload.imageUrl;
      if (action.payload.imgNumber === 2)
        state.activePromo.imageUrl2 = action.payload.imageUrl;
      if (action.payload.imgNumber === 3)
        state.activePromo.imageUrlG = action.payload.imageUrl;
      state.isSaving = false;
    },
    clearPromosOnLogout: (state) => {
      (state.isSaving = false),
        (state.messageSaved = ""),
        (state.promos = []),
        (state.activePromo = null);
    },
    promoUpdated: (state, action) => {
      state.isSaving = false;
      state.promos = state.promos.map((promo) => {
        if (promo.id === action.payload.id) {
          return action.payload;
        }
        return promo;
      });
      state.messageSaved = `:D`;
    },
    addNewPromo: (state, action) => {
      (state.isSaving = false), state.promos.push(action.payload);
      state.messageSaved = `:D`;
    },
    deletePromoById: (state, action) => {
      state.activePromo = null;
      state.promos = state.promos.filter(
        (promo) => promo.id !== action.payload
      );
      state.messageSaved = `:D`;
    },
    deleteActivePromo: (state) => {
      state.activePromo = null;
    },
    clearMessage: (state) => {
      state.messageSaved = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewEmptyPromo,
  addNewPromo,
  clearMessage,
  clearPromosOnLogout,
  deleteActivePromo,
  deletePromoById,
  promoUpdated,
  savingNewPromo,
  setActivePromo,
  setPhotoToActivePromo,
  setPromos,
  setSaving,
} = promoSlice.actions;
