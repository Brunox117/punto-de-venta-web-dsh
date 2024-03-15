import { createSlice } from "@reduxjs/toolkit";

export const discountTitleSlice = createSlice({
  name: "discountTitle",
  initialState: {
    isSaving: false,
    messageSaved: "",
    activeTitle: null,
  },
  reducers: {
    savingNewTitle: (state) => {
      state.isSaving = true;
    },
    addNewEmptyTitle: (state, action) => {
      state.isSaving = false;
    },
    finishSaving: (state) => {
      state.isSaving = false;
    },
    setActiveTitle: (state, action) => {
      state.activeTitle = action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = "";
    },
    clearTitlesOnLogout: (state) => {
      (state.isSaving = false),
        (state.messageSaved = ""),
        (state.activeTitle = null);
    },
    titleUpdated: (state, action) => {
      state.isSaving = false;
      state.activeTitle = action.payload;
      state.messageSaved = `:D`;
    },
    deleteActiveTitle: (state) => {
      state.activeTitle = null;
    },
    clearMessage: (state) => {
      state.messageSaved = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  savingNewTitle,
  addNewEmptyTitle,
  clearMessage,
  clearTitlesOnLogout,
  deleteActiveTitle,
  setActiveTitle,
  setSaving,
  titleUpdated,
  finishSaving,
} = discountTitleSlice.actions;
