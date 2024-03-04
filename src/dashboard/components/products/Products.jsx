import { useDispatch, useSelector } from "react-redux";
import {
  setActiveProduct,
  startDeletingProductById,
} from "../../../store/slices/productSlice";
import { Grid } from "@mui/material";
import { Product } from "./Product";

export const Products = ({products}) => {
  const dispatch = useDispatch();
  // const { products } = useSelector((state) => state.product);
  const onEdit = (product) => {
    dispatch(setActiveProduct(product));
  };
  const onDelete = (product) => {
    dispatch(startDeletingProductById(product));
  };
  return (
      <Grid container justifyContent="center" sx={{
      }}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3} xl={2}>
            <Product product={product} onEdit={onEdit} onDelete={onDelete} />
          </Grid>
        ))}
        
      </Grid>
  );
};
