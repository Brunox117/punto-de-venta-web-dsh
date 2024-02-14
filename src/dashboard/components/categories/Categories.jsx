import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setActivecategory } from "../../../store/slices/categorySlice/categorySlice";
import { startDeletingCategoryById } from "../../../store/slices/categorySlice/thunks";
export const Categories = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const onEdit = (category) => {
    dispatch(setActivecategory(category));
  };
  const onDelete = (category) => {
    dispatch(startDeletingCategoryById(category))
  }
  return (
    <>
      {categories.map((category) => (
        <div key={category.id}>
          {category.name}
          <Button onClick={() => onEdit(category)}>Editar</Button>
          <Button onClick={() => onDelete(category)}>Borrar</Button>
        </div>
      ))}
    </>
  );
};
