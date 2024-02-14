import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    isSaving: false,
    messageSaved: "",
    categories: [],
    activeCategory: null,
    // category: {
    //     id: 'ABC123',
    //     name: '',
    //     imageUrl: '',
    // }
  },
  reducers: {
    savingNewcategory: (state) => {
      state.isSaving = true;
    },
    addNewEmptycategory: (state, action) => {
      // state.categories.push(action.payload);
      state.isSaving = false;
    },
    setActivecategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    setcategories: (state, action) => {
      state.categories = action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = "";
    },
    setPhotoToActivecategory: (state, action) => {
      state.activeCategory.imageUrl = action.payload;
      state.isSaving = false;
    },
    clearcategoriesOnLogout: (state) => {
      (state.isSaving = false),
        (state.messageSaved = ""),
        (state.categories = []),
        (state.activeCategory = null);
    },
    categoryUpdated: (state, action) => {
      state.isSaving = false;
      state.categories = state.categories.map((category) => {
        if (category.id === action.payload.id) {
          return action.payload;
        }
        return category;
      });
      state.messageSaved = `:D`;
    },
    addNewCategory: (state, action) => {
      console.log('action.payload: ', action.payload);
      state.isSaving = false,
      state.categories.push(action.payload);
      state.messageSaved = `:D`;
    },
    deletecategoryById: (state, action) => {
      state.activeCategory = null;
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
    },
    deleteActivecategory: (state) => {
      state.activeCategory = null;
    },
    updateFormatedName: (state, action) => {
      state.activeCategory.formatedName = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewCategory,
  updateFormatedName,
  addNewEmptycategory,
  categoryUpdated,
  clearcategoriesOnLogout,
  deleteActivecategory,
  deletecategoryById,
  savingNewcategory,
  setActivecategory,
  setPhotoToActivecategory,
  setSaving,
  setcategories,
} = categorySlice.actions;
