import { useDispatch, useSelector } from "react-redux";
import { Product } from "../components/products/Product";
import { ProductsForm } from "../forms/ProductsForm";
import { CreateBox } from "../components/";
import { createNewProduct } from "../../store/slices/productSlice";
import { Products } from "../components/products/Products";
import { Alert } from "@mui/material";

export const ProductosView = () => {
  const { activeProduct } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(createNewProduct());
  };
  return (
    <>
      {categories.length === 0 ? (
        <Alert severity="error">Para crear un producto primero debes crear una categoría</Alert>
      ) : (
        <></>
      )}
      {!!activeProduct ? (
        <>
          <ProductsForm />
          <Product product={activeProduct}/>
        </>
      ) : (
        <CreateBox title="Crear producto" onClick={onClick} />
      )}
      <Products />
    </>
  );
};
