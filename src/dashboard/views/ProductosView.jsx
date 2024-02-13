import { useSelector } from "react-redux";
import { Product } from "../components/products/Product";
import { ProductsForm } from "../forms/ProductsForm";
import { CreateProductBox } from "../components/";

export const ProductosView = () => {
  const { activeProduct } = useSelector((state) => state.product);
  return (
    <>
      {!!activeProduct ? (
        <ProductsForm />
      ) : (
        <CreateProductBox title="Crear producto" />
      )}
      {!!activeProduct ? <Product /> : <> </>}
    </>
  );
};
