import {
  addNewEmptyProduct,
  savingNewProduct,
  setActiveProduct,
  setSaving,
} from "./productSlice";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";

export const createNewProduct = () => {
  return async (dispatch) => {
    dispatch(savingNewProduct());
    const newProduct = {
      name: "",
      price: 0,
      imageUrl: "",
      categories: [],
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
    //PREGUNTAR SI TIENE O NO ID SI TIENE SE LE DEBERIA ASIGNAR UN ID
    console.log(productToFirestore.id);
    if (productToFirestore.id === null) {
    }
  };
};
