import { FirebaseDB } from "../../../firebase/config";
import { fileUpload, imgDelete } from "../../../helpers";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import {
  addNewEmptyTitle,
  savingNewTitle,
  setActiveTitle,
  setSaving,
  finishSaving,
} from "./discountsTitleSlice";
import { loadDiscountTitle } from "../../../helpers/firebaseDB/loadFromFirebase";

export const createNewTitle = () => {
  return async (dispatch) => {
    dispatch(savingNewTitle());
    const newTitle = {
      id: "",
      title: "",
      subtitle: "",
    };
    await dispatch(addNewEmptyTitle(newTitle));
    dispatch(setActiveTitle(newTitle));
  };
};

export const startSaveTitle = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());
    const { activeTitle } = getState().discountTitle;
    const titleToFirestore = { ...activeTitle };
    //PREGUNTAR SI TIENE O NO ID SI NO TIENE SE LE DEBERIA ASIGNAR UN ID
    if (titleToFirestore.id === "") {
      const newDoc = doc(collection(FirebaseDB, `discountTitle/`));
      titleToFirestore.id = newDoc.id;
      dispatch(setActiveTitle(titleToFirestore));
    } else {
      delete titleToFirestore.id;
      const docRef = doc(FirebaseDB, `discountTitles/${activeTitle.id}`);
      await setDoc(docRef, titleToFirestore, { merge: true });
    }
    dispatch(finishSaving());
  };
};

export const startDeletingTitle = () => {
  return async (dispatch, getState) => {
    const { activeTitle } = getState().discountTitle;
    if (activeTitle.id === "") {
      dispatch(setActiveTitle(null));
    } else {
      const docRef = doc(FirebaseDB, `discountTitles/${activeTitle.id}`);
      await deleteDoc(docRef);
      dispatch(setActiveTitle(null));
    }
  };
};

export const startLoadingTitle = () => {
  return async (dispatch) => {
    const title = await loadDiscountTitle();
    dispatch(setActiveTitle(title));
  };
};
