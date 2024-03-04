import { FirebaseDB } from "../../../firebase/config";
import { fileUpload, imgDelete } from "../../../helpers";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import {
  addNewCategory,
  addNewEmptycategory,
  categoryUpdated,
  deleteActivecategory,
  deletecategoryById,
  savingNewcategory,
  setActivecategory,
  setPhotoToActivecategory,
  setSaving,
  setcategories,
} from "./categorySlice";
import { loadCategories } from "../../../helpers/firebaseDB/loadFromFirebase";
export const createNewCategory = () => {
  return async (dispatch) => {
    dispatch(savingNewcategory());
    const newCategory = {
      id: "",
      name: "",
      imageUrl: "",
      formatedName: "",
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
      categoryToFirestore.id = newDoc.id;
      const setDocResp = await setDoc(newDoc, categoryToFirestore);
      // console.log({ newDoc, setDocResp });
      // console.log(`category creada con el id: ${categoryToFirestore.id}`);
      dispatch(setActivecategory(categoryToFirestore));
      dispatch(addNewCategory(categoryToFirestore));
    } else {
      delete categoryToFirestore.id;
      const docRef = doc(FirebaseDB, `categories/${activeCategory.id}`);
      await setDoc(docRef, categoryToFirestore, { merge: true });
      dispatch(categoryUpdated(activeCategory));
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
      const docRef = doc(FirebaseDB, `categories/${activeCategory.id}`);
      await deleteDoc(docRef);
      dispatch(deletecategoryById(activeCategory.id));
    }
  };
};

export const startDeletingCategoryById = (category) => {
  return async (dispatch, getState) => {
    const { activeCategory } = getState().category;
    if (activeCategory && activeCategory.id === category.id) {
      dispatch(startDeletingCategory());
    }
    const imageUrl = category.imageUrl;
    if (imageUrl !== "") {
      await imgDelete(imageUrl);
    }
    if (category.id === "") {
      //YA NO DEBERIA DE CUMPLIRSE ESTE IF NUNCA
    } else {
      const docRef = doc(FirebaseDB, `categories/${category.id}`);
      await deleteDoc(docRef);
      dispatch(deletecategoryById(category.id));
    }
  }
}

export const startLoadingCategories = () => {
  return async (dispatch) => {
    const categories = await loadCategories();
    dispatch(setcategories(categories));
  };
};
