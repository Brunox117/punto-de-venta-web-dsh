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
        savingNewBranch: (state) => {
            state.isSaving = true;
          },
          addNewEmptyBranch: (state, action) => {
            //state.branches.push(action.payload);
            state.isSaving = false;
          },
          setActiveBranch: (state, action) => {
            state.activeBranch = action.payload;
          },
          setBranches: (state, action) => {
            state.branches = action.payload;
          },
          setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = "";
          },
          setPhotoToActiveBranch: (state, action) => {
            state.activeBranch.imageUrl = action.payload;
            state.isSaving = false;
          },
          clearbranchesOnLogout: (state) => {
            state.isSaving = false,
            state.messageSaved = "",
            state.branches = [],
            state.activeBranch = null;
          },
          branchUpdated: (state, action) => {
            state.isSaving = false;
            state.branches = state.branches.map((branch) => {
              if (branch.id === action.payload.id) {
                return action.payload;
              }
              return branch;
            });
            state.messageSaved = `:D`;
          },
          addNewBranch: (state, action) => {
            // console.log('action.payload: ', action.payload);
            state.isSaving = false,
            state.branches.push(action.payload);
            state.messageSaved = `:D`;
          },
          deletebranchById: (state, action) => {
            state.activeBranch = null;
            state.branches = state.branches.filter(
              (branch) => branch.id !== action.payload
            );
          },
          deleteActiveBranch: (state) => {
            state.activeBranch = null;
          },
          updateFormatedName: (state, action) => {
            state.activeCategory.formatedName = action.payload;
          },
          clearMessage: (state) => {
            state.messageSaved = '';
          }
    }
});


// Action creators are generated for each case reducer function
export const { 
  addNewEmptyBranch,
  addNewBranch,
  branchUpdated,
  clearbranchesOnLogout,
  deleteActiveBranch,
  deletebranchById,
  savingNewBranch,
  setActiveBranch,
  setPhotoToActiveBranch,
  setSaving,
  setBranches,
  clearMessage,
 } = branchSlice.actions;