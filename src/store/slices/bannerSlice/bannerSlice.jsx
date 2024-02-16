import { createSlice } from "@reduxjs/toolkit";

export const bannerSlice = createSlice({
  name: "banner",
  initialState: {
    isSaving: false,
    messageSaved: "",
    banners: [],
    activeBanner: null,
    // product: {
    //     id: 'abc123',
    //     name: '',
    //     imageUrl: '',
    // }
  },
  reducers: {
    savingNewBanner: (state) => {
      state.isSaving = true;
    },
    addNewEmptyBanner: (state, action) => {
      // state.products.push(action.payload);
      state.isSaving = false;
    },
    setActiveBanner: (state, action) => {
      state.activeBanner = action.payload;
    },
    setBanners: (state, action) => {
      state.banners = action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = "";
    },
    setPhotoToActiveBanner: (state, action) => {
      state.activeBanner.imageUrl = action.payload;
      state.isSaving = false;
    },
    clearBannersOnLogout: (state) => {
      (state.isSaving = false),
        (state.messageSaved = ""),
        (state.banners = []),
        (state.activeBanner = null);
    },
    bannerUpdated: (state, action) => {
      state.isSaving = false;
      state.banners = state.banners.map((banner) => {
        if (banner.id === action.payload.id) {
          return action.payload;
        }
        return banner;
      });
      state.messageSaved = `:D`;
    },
    addNewBanner: (state, action) => {
      (state.isSaving = false), state.banners.push(action.payload);
      state.messageSaved = `:D`;
    },
    deleteBannerById: (state, action) => {
      state.activeBanner = null;
      state.banners = state.banners.filter(
        (banner) => banner.id !== action.payload
      );
    },
    deleteActiveBanner: (state) => {
      state.activeBanner = null;
    },
    clearMessage: (state) => {
      state.messageSaved = "";
    },
  },
});

export const {
  addNewBanner,
  bannerUpdated,
  addNewEmptyBanner,
  clearBannersOnLogout,
  clearMessage,
  deleteActiveBanner,
  deleteBannerById,
  savingNewBanner,
  setActiveBanner,
  setBanners,
  setPhotoToActiveBanner,
  setSaving,
} = bannerSlice.actions;
