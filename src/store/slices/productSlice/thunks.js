import { FirebaseDB } from "../../../firebase/config";
import { fileUpload, imgDelete } from "../../../helpers";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import {
  addNewEmptyProduct,
  addNewProduct,
  deleteActiveProduct,
  deleteProductById,
  productUpdated,
  savingNewProduct,
  setActiveProduct,
  setPhotoToActiveProduct,
  setProducts,
  setSaving,
} from "./productSlice";
import { loadProducts } from "../../../helpers/firebaseDB/loadFromFirebase";

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
      console.log(`producto creado con el id: ${productToFirestore}`);
      dispatch(setActiveProduct(productToFirestore));
      dispatch(addNewProduct(productToFirestore));
    } else {
      delete productToFirestore.id;
      const docRef = doc(FirebaseDB, `products/${activeProduct.id}`);
      await setDoc(docRef, productToFirestore, { merge: true });
      dispatch(productUpdated(activeProduct));
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

export const startDeletingProductById = (product) => {
  return async (dispacth, getState) => {
    const { activeProduct } = getState().product;
    if (activeProduct && activeProduct.id === product.id) {
      dispacth(startDeletingProduct());
    }
    const imageUrl = product.imageUrl;
    if (imageUrl !== "") {
      await imgDelete(imageUrl);
    }
    if (product.id === "") {
    } else {
      const docRef = doc(FirebaseDB, `products/${product.id}`);
      await deleteDoc(docRef);
      dispacth(deleteProductById(product.id));
    }
  };
};

export const startLoadingProducts = () => {
  return async (dispatch) => {
    const products = await loadProducts();
    dispatch(setProducts(products));
  };
};
