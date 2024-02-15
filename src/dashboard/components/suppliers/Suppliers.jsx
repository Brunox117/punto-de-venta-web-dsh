import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setActiveSupplier } from "../../../store/slices/supplierSlice/supplierSlice";
import { startDeletingSupplierById } from "../../../store/slices/supplierSlice/thunks";
export const Suppliers = () => {
  const dispatch = useDispatch();
  const { suppliers } = useSelector((state) => state.supplier);
  const onEdit = (supplier) => {
    dispatch(setActiveSupplier(supplier));
  };
  const onDelete = (supplier) => {
    dispatch(startDeletingSupplierById(supplier))
  }
  return (
    <>
      {suppliers.map((supplier) => (
        <div key={supplier.id}>
          {supplier.name}
          <Button onClick={() => onEdit(supplier)}>Editar</Button>
          <Button onClick={() => onDelete(supplier)}>Borrar</Button>
        </div>
      ))}
    </>
  );
};
