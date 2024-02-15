import { useDispatch, useSelector } from "react-redux";
import {
  setActiveProduct,
  startDeletingProductById,
} from "../../../store/slices/productSlice";
import { Button, Grid } from "@mui/material";
import { Product } from "./Product";

export const Products = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const onEdit = (product) => {
    dispatch(setActiveProduct(product));
  };
  const onDelete = (product) => {
    dispatch(startDeletingProductById(product));
  };
  return (
    <>
      <Grid container spacing={10}>
        {products.map((product) => (
          <Grid item key={product.id}>
            <Product product={product}></Product>
            <Button onClick={() => onEdit(product)}>Editar</Button>
            <Button onClick={() => onDelete(product)}>Borrar</Button>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
