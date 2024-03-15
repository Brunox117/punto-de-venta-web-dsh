import { useDispatch, useSelector } from "react-redux";
import { Product } from "../components/products/Product";
import { ProductsForm } from "../forms/ProductsForm";
import { CreateBox, Title } from "../components/";
import { createNewProduct } from "../../store/slices/productSlice";
import { Products } from "../components/products/Products";
import { Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { SearchbarWithFilter } from "../components/products";
import { DiscountTitleForm } from "../forms";
import { createNewTitle } from "../../store/slices/discountsTitleSlice/thunks";

export const ProductosView = () => {
  const { activeProduct, products: productsFromFirebase } = useSelector(
    (state) => state.product
  );
  const { activeTitle } = useSelector((state) => state.discountTitle);
  const [searchProduct, setSearchProduct] = useState([]);
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    setSearchProduct(productsFromFirebase);
  }, [productsFromFirebase]);
  const onClick = () => {
    dispatch(createNewProduct());
  };
  const onClickTitle = () => {
    dispatch(createNewTitle());
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
      {!!activeTitle ? (
        <>
          <DiscountTitleForm />
          <Title title={activeTitle.title} subtitle={activeTitle.subtitle} />
        </>
      ) : (
        <CreateBox title="Crear título de descuento" onClick={onClickTitle} />
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
