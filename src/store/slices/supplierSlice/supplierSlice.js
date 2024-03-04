import { createSlice } from '@reduxjs/toolkit';

export const supplierSlice = createSlice({
    name: 'supplier',
    initialState: {
        isSaving: false,
    messageSaved: "",
    suppliers: [],
    activeSupplier: null,
    // supplier: {
    //     id: 'ABC123',
    //     name: '',
    //     siteLink: '',
    //     imageUrl: '',
    // }
    },
    reducers: {
        savingNewSupplier: (state) => {
            state.isSaving = true;
          },
          addNewEmptySupplier: (state, action) => {
            //state.suppliers.push(action.payload);
            state.isSaving = false;
          },
          setActiveSupplier: (state, action) => {
            state.activeSupplier = action.payload;
          },
          setSuppliers: (state, action) => {
            state.suppliers = action.payload;
          },
          setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = "";
          },
          setPhotoToActiveSupplier: (state, action) => {
            state.activeSupplier.imageUrl = action.payload;
            state.isSaving = false;
          },
          clearsuppliersOnLogout: (state) => {
            state.isSaving = false,
            state.messageSaved = "",
            state.suppliers = [],
            state.activeSupplier = null;
          },
          supplierUpdated: (state, action) => {
            state.isSaving = false;
            state.suppliers = state.suppliers.map((supplier) => {
              if (supplier.id === action.payload.id) {
                return action.payload;
              }
              return supplier;
            });
            state.messageSaved = `:D`;
          },
          addNewSupplier: (state, action) => {
            // console.log('action.payload: ', action.payload);
            state.isSaving = false,
            state.suppliers.push(action.payload);
            state.messageSaved = `:D`;
          },
          deletesupplierById: (state, action) => {
            state.suppliers = state.suppliers.filter(
              (supplier) => supplier.id !== action.payload
            );
          },
          deleteActiveSupplier: (state) => {
            state.activeSupplier = null;
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
  addNewEmptySupplier,
  addNewSupplier,
  supplierUpdated,
  clearsuppliersOnLogout,
  deleteActiveSupplier,
  deletesupplierById,
  savingNewSupplier,
  setActiveSupplier,
  setPhotoToActiveSupplier,
  setSaving,
  setSuppliers,
  clearMessage,
 } = supplierSlice.actions;