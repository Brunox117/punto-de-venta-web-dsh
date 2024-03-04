import { FirebaseDB } from "../../../firebase/config";
import { fileUpload, imgDelete } from "../../../helpers";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import {
  addNewSupplier,
  addNewEmptySupplier,
  supplierUpdated,
  deleteActiveSupplier,
  deletesupplierById,
  savingNewSupplier,
  setActiveSupplier,
  setPhotoToActiveSupplier,
  setSaving,
  setSuppliers,
} from "./supplierSlice";
import { loadSuppliers } from "../../../helpers/firebaseDB/loadFromFirebase";
export const createNewSupplier = () => {
  return async (dispatch) => {
    dispatch(savingNewSupplier());
    const newSupplier = {
      id: "",
      name: "",
      imageUrl: "",
      siteLink: "",
    };
    await dispatch(addNewEmptySupplier(newSupplier));
    dispatch(setActiveSupplier(newSupplier));
  };
};

export const startSaveSupplier = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());
    const { activeSupplier } = getState().supplier;
    const supplierToFirestore = { ...activeSupplier };
    //PREGUNTAR SI TIENE O NO ID SI NO TIENE SE LE DEBERIA ASIGNAR UN ID
    if (supplierToFirestore.id === "") {
      const newDoc = doc(collection(FirebaseDB, `suppliers/`));
      supplierToFirestore.id = newDoc.id;
      const setDocResp = await setDoc(newDoc, supplierToFirestore);
      // console.log({ newDoc, setDocResp });
      // console.log(`supplier creada con el id: ${supplierToFirestore.id}`);
      dispatch(setActiveSupplier(supplierToFirestore));
      dispatch(addNewSupplier(supplierToFirestore));
    } else {
      delete supplierToFirestore.id;
      const docRef = doc(FirebaseDB, `suppliers/${activeSupplier.id}`);
      await setDoc(docRef, supplierToFirestore, { merge: true });
      dispatch(supplierUpdated(activeSupplier));
    }
  };
};

export const startUploadingImg = (file) => {
  return async (dispatch, getState) => {
    const { activeSupplier } = getState().supplier;
    const imageUrl = activeSupplier.imageUrl;
    if (imageUrl !== "") {
      await imgDelete(imageUrl);
    }
    dispatch(setSaving());
    const imgUrl = await fileUpload(file);
    dispatch(setPhotoToActiveSupplier(imgUrl));
  };
};

export const startDeletingSupplier = () => {
  return async (dispatch, getState) => {
    const { activeSupplier } = getState().supplier;
    const imageUrl = activeSupplier.imageUrl;
    if (imageUrl !== "") {
      await imgDelete(imageUrl);
    }
    if (activeSupplier.id === "") {
      dispatch(deleteActiveSupplier());
    } else {
      const docRef = doc(FirebaseDB, `suppliers/${activeSupplier.id}`);
      await deleteDoc(docRef);
      dispatch(deletesupplierById(activeSupplier.id));
    }
  };
};

export const startDeletingSupplierById = (supplier) => {
  return async (dispatch, getState) => {
    const { activeSupplier } = getState().supplier;
    if (activeSupplier && activeSupplier.id === supplier.id) {
      dispatch(startDeletingSupplier());
    }
    const imageUrl = supplier.imageUrl;
    if (imageUrl !== "") {
      await imgDelete(imageUrl);
    }
    if (supplier.id === "") {
    } else {
      const docRef = doc(FirebaseDB, `suppliers/${supplier.id}`);
      await deleteDoc(docRef);
      dispatch(deletesupplierById(supplier.id));
    }
  }
}

export const startLoadingSuppliers = () => {
  return async (dispatch) => {
    const suppliers = await loadSuppliers();
    dispatch(setSuppliers(suppliers));
  };
};
