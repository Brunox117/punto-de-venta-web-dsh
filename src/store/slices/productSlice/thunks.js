import { addNewEmptyProduct, savingNewProduct, setActiveProduct } from "./productSlice";

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
