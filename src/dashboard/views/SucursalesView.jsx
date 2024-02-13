import { useDispatch, useSelector } from "react-redux";
import { SucursalesForm } from "../forms/SucursalesForm";
import { createNewBranch } from "../../store/slices/branchSlice/thunks";
import { CreateBox } from "../components";

export const SucursalesView = () => {
  const { activeBranch } = useSelector((state) => state.branch);
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(createNewBranch());
  };
  return (
    <>
      {!!activeBranch ? (
        <SucursalesForm />
      ) : (
        <CreateBox title="Crear sucursal" onClick={onClick} />
      )}
      {/* {!!activeBranch ? <Product /> : <> </>} */}
    </>
  );
};