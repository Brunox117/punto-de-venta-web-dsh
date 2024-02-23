import { useDispatch, useSelector } from "react-redux";
import { Product } from "../components/products/Product";
import { ProductsForm } from "../forms/ProductsForm";
import { CreateBox } from "../components/";
import { createNewProduct } from "../../store/slices/productSlice";
import { Products } from "../components/products/Products";
import { Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { SearchbarWithFilter } from "../components/products";

export const ProductosView = () => {
  const { activeProduct, products: productsFromFirebase } = useSelector(
    (state) => state.product
  );
  const [searchProduct, setSearchProduct] = useState([]);
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    setSearchProduct(productsFromFirebase);
  }, [productsFromFirebase]);
  const onClick = () => {
    dispatch(createNewProduct());
  };
  const filterProducts = (searchTerm, category) => {
    let filteredProducts = productsFromFirebase;

    if (searchTerm) {
      const normalizedSearchTerm = searchTerm
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(normalizedSearchTerm)
      );
    }

    if (category) {
      filteredProducts = filteredProducts.filter((product) =>
        product.categories.includes(category)
      );
    }

    setSearchProduct(filteredProducts);
  };
  return (
    <>
      {categories.length === 0 ? (
        <Alert severity="error">
          Para crear un producto primero debes crear una categoría
        </Alert>
      ) : (
        <></>
      )}
      {!!activeProduct ? (
        <>
          <ProductsForm />
          <Product product={activeProduct} />
        </>
      ) : (
        <CreateBox title="Crear producto" onClick={onClick} />
      )}
      <br />
      <div>
        <SearchbarWithFilter
          searchProducts={filterProducts}
          categories={categories}
        />
        <Products products={searchProduct} />
      </div>
    </>
  );
};
