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
            state.suppliers.push(action.payload);
            state.isSaving = false;
          },
          setActiveSupplier: (state, action) => {
            state.activeSupplier = action.payload;
          },
          setsuppliers: (state) => {
            state.suppliers = action.payload;
          },
          setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = "";
          },
          setPhotoToactiveSupplier: (state, action) => {
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
          deletesupplierById: (state, action) => {
            state.activeSupplier = null;
            state.suppliers = state.suppliers.filter(
              (supplier) => supplier.id !== action.payload
            );
          },
          deleteactiveSupplier: (state) => {
            state.activeSupplier = null;
          },
          clearMessage: (state) => {
            state.messageSaved = '';
          }
    }
});


// Action creators are generated for each case reducer function
export const { 
  addNewEmptySupplier,
  supplierUpdated,
  clearsuppliersOnLogout,
  deleteactiveSupplier,
  deletesupplierById,
  savingNewSupplier,
  setActiveSupplier,
  setPhotoToactiveSupplier,
  setSaving,
  setsuppliers,
  clearMessage,
 } = supplierSlice.actions;