import { FirebaseDB } from "../../../firebase/config";
import { fileUpload, imgDelete } from "../../../helpers";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import {
  addNewEmptyProduct,
  deleteActiveProduct,
  deleteProductById,
  productUpdated,
  savingNewProduct,
  setActiveProduct,
  setPhotoToActiveProduct,
  setSaving,
} from "./productSlice";

export const createNewProduct = () => {
  return async (dispatch) => {
    dispatch(savingNewProduct());
    const newProduct = {
      name: "",
      price: 0,
      imageUrl: "",
      categories: [],
      id: "",
    };
    await dispatch(addNewEmptyProduct(newProduct));
    dispatch(setActiveProduct(newProduct));
  };
};

export const startSaveProduct = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());
    const { activeProduct } = getState().product;
    const productToFirestore = { ...activeProduct };
    //PREGUNTAR SI TIENE O NO ID SI NO TIENE SE LE DEBERIA ASIGNAR UN ID
    if (productToFirestore.id === "") {
      const newDoc = doc(collection(FirebaseDB, `products/`));
      productToFirestore.id = newDoc.id;
      const setDocResp = await setDoc(newDoc, productToFirestore);
      console.log({ newDoc, setDocResp });
      console.log(`producto creado con el id: ${productToFirestore.id}`);
      dispatch(setActiveProduct(productToFirestore));
      dispatch(productUpdated(productToFirestore.id));
    } else {
      delete productToFirestore.id;
      const docRef = doc(FirebaseDB, `products/${activeProduct.id}`);
      await setDoc(docRef, productToFirestore, { merge: true });
      dispatch(productUpdated(activeProduct.id));
    }
  };
};

export const startUploadingImg = (file) => {
  return async (dispatch, getState) => {
    const { activeProduct } = getState().product;
    const imageUrl = activeProduct.imageUrl;
    if (imageUrl !== "") {
      await imgDelete(imageUrl);
    }
    dispatch(setSaving());
    const imgUrl = await fileUpload(file);
    dispatch(setPhotoToActiveProduct(imgUrl));
  };
};

export const startDeletingProduct = () => {
  return async (dispatch, getState) => {
    const { activeProduct } = getState().product;
    const imageUrl = activeProduct.imageUrl;
    if (imageUrl !== "") {
      await imgDelete(imageUrl);
    }
    if (activeProduct.id === "") {
      dispatch(deleteActiveProduct());
    } else {
      const docRef = doc(FirebaseDB, `products/${activeProduct.id}`);
      await deleteDoc(docRef);
      dispatch(deleteProductById(activeProduct.id));
    }
  };
};
