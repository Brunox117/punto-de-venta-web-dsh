import { useDispatch, useSelector } from "react-redux";
import { CategoriasForm } from "../forms/CategoriasForm";
import { createNewCategory } from "../../store/slices/categorySlice/thunks";
import { CreateBox } from "../components";
import { Category } from "../components/categories/Category";
import { Categories } from "../components/categories/Categories";

export const CategoriasView = () => {
  const { activeCategory } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  

  const onClick = () => {
    dispatch(createNewCategory());
  };
  return (
    <>
      {!!activeCategory ? (
        <>
          <CategoriasForm />
          <Category category={activeCategory} />
        </>
      ) : (
        <CreateBox title="Crear categoría" onClick={onClick} />
      )}
      <Categories />
    </>
  );
};
