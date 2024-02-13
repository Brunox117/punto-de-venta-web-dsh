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
            state.branches.push(action.payload);
            state.isSaving = false;
          },
          setActiveBranch: (state, action) => {
            state.activeBranch = action.payload;
          },
          setbranches: (state) => {
            state.branches = action.payload;
          },
          setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = "";
          },
          setPhotoToactiveBranch: (state, action) => {
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
          deletebranchById: (state, action) => {
            state.activeBranch = null;
            state.branches = state.branches.filter(
              (branch) => branch.id !== action.payload
            );
          },
          deleteactiveBranch: (state) => {
            state.activeBranch = null;
          },
          clearMessage: (state) => {
            state.messageSaved = '';
          }
    }
});


// Action creators are generated for each case reducer function
export const { 
  addNewEmptyBranch,
  branchUpdated,
  clearbranchesOnLogout,
  deleteactiveBranch,
  deletebranchById,
  savingNewBranch,
  setActiveBranch,
  setPhotoToactiveBranch,
  setSaving,
  setbranches,
  clearMessage,
 } = branchSlice.actions;