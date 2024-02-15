import { useDispatch, useSelector } from "react-redux";
import { ProveedoresForm } from "../forms/ProveedoresForm";
import { createNewSupplier } from "../../store/slices/supplierSlice/thunks";
import { CreateBox } from "../components";
import { Supplier, Suppliers } from "../components/suppliers";

export const ProveedoresView = () => {
  const { activeSupplier } = useSelector((state) => state.supplier);
  const dispatch = useDispatch();



  const onClick = () => {
    dispatch(createNewSupplier());
  };
  return (
    <>
      {!!activeSupplier ? (
        <>
          <ProveedoresForm />
          <Supplier supplier={activeSupplier} />
        </>
      ) : (
        <CreateBox title="Crear proveedor" onClick={onClick} />
      )}
      <Suppliers />
    </>
  );
};
