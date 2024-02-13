import { FirebaseDB } from "../../../firebase/config";
import { fileUpload, imgDelete } from "../../../helpers";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import {
  addNewEmptycategory,
  categoryUpdated,
  deleteActivecategory,
  deletecategoryById,
  savingNewcategory,
  setActivecategory,
  setPhotoToActivecategory,
  setSaving,
} from "./categorySlice";

export const createNewCategory = () => {
  return async (dispatch) => {
    dispatch(savingNewcategory());
    const newCategory = {
      id: "",
      name: "",
      imageUrl: "",
    };
    await dispatch(addNewEmptycategory(newCategory));
    dispatch(setActivecategory(newCategory));
  };
};

export const startSaveCategory = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());
    const { activeCategory } = getState().category;
    const categoryToFirestore = { ...activeCategory };
    //PREGUNTAR SI TIENE O NO ID SI NO TIENE SE LE DEBERIA ASIGNAR UN ID
    if (categoryToFirestore.id === "") {
      const newDoc = doc(collection(FirebaseDB, `categories/`));
      const setDocResp = await setDoc(newDoc, activeCategory);
      console.log({ newDoc, setDocResp });
      categoryToFirestore.id = newDoc.id;
      console.log(`category creada con el id: ${categoryToFirestore.id}`);
      dispatch(setActivecategory(categoryToFirestore));
      dispatch(categoryUpdated(categoryToFirestore.id));
    } else {
      delete categoryToFirestore.id;
      const docRef = doc(FirebaseDB, `categorys/${activeCategory.id}`);
      await setDoc(docRef, categoryToFirestore, { merge: true });
      dispatch(categoryUpdated(activeCategory.id));
    }
  };
};

export const startUploadingImg = (file) => {
  return async (dispatch, getState) => {
    const { activeCategory } = getState().category;
    const imageUrl = activeCategory.imageUrl;
    if (imageUrl !== "") {
      await imgDelete(imageUrl);
    }
    dispatch(setSaving());
    const imgUrl = await fileUpload(file);
    dispatch(setPhotoToActivecategory(imgUrl));
  };
};

export const startDeletingCategory = () => {
  return async (dispatch, getState) => {
    const { activeCategory } = getState().category;
    const imageUrl = activeCategory.imageUrl;
    if (imageUrl !== "") {
      await imgDelete(imageUrl);
    }
    if (activeCategory.id === "") {
      dispatch(deleteActivecategory());
    } else {
      const docRef = doc(FirebaseDB, `products/${activeCategory.id}`);
      await deleteDoc(docRef);
      dispatch(deletecategoryById(activeCategory.id));
    }
  };
};
