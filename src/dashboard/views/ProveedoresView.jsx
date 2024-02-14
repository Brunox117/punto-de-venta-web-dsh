import { useDispatch, useSelector } from "react-redux";
import { ProveedoresForm } from "../forms/ProveedoresForm";
import { createNewSupplier } from "../../store/slices/supplierSlice/thunks";
import { CreateBox } from "../components";

export const ProveedoresView = () => {
  const { activeSupplier } = useSelector((state) => state.supplier);
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(createNewSupplier());
  };
  return (
    <>
      {!!activeSupplier ? (
        <ProveedoresForm />
      ) : (
        <CreateBox title="Crear Proveedor" onClick={onClick} />
      )}
      {/* {!!activeSupplier ? <Supplier /> : <> </>} */}
    </>
  );
};