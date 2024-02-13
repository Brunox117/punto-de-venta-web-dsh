import { useDispatch, useSelector } from "react-redux";
import { Product } from "../components/products/Product";
import { ProductsForm } from "../forms/ProductsForm";
import { CreateBox } from "../components/";
import { createNewProduct } from "../../store/slices/productSlice";

export const ProductosView = () => {
  const { activeProduct } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(createNewProduct());
  };
  return (
    <>
      {!!activeProduct ? (
        <ProductsForm />
      ) : (
        <CreateBox title="Crear producto" onClick={onClick} />
      )}
      {!!activeProduct ? <Product /> : <> </>}
    </>
  );
};
