import { useDispatch, useSelector } from "react-redux";
import { CategoriasForm } from "../forms/CategoriasForm";
import { createNewCategory } from "../../store/slices/categorySlice/thunks";
import { CreateBox } from "../components";

export const CategoriasView = () => {
  const { activeCategory } = useSelector((state => state.category));
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(createNewCategory());
  };
  return (
    <>
    {!!activeCategory ? (
      <CategoriasForm />
    ) : (
      <CreateBox title="Crear categoría" onClick={onClick} />
    )}
    {/* {!!activeBranch ? <Product /> : <> </>} */}
  </>
  );
};
