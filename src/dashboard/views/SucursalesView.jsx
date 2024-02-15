import { useDispatch, useSelector } from "react-redux";
import { SucursalesForm } from "../forms/SucursalesForm";
import { createNewBranch } from "../../store/slices/branchSlice/thunks";
import { CreateBox } from "../components";
import { Branches } from "../components/branches/Branches";
import { Branch } from "../components/branches/Branch";

export const SucursalesView = () => {
  const { activeBranch } = useSelector((state) => state.branch);
  const dispatch = useDispatch();



  const onClick = () => {
    dispatch(createNewBranch());
  };
  return (
    <>
      {!!activeBranch ? (
        <>
          <SucursalesForm />
          <Branch branch={activeBranch} />
        </>
      ) : (
        <CreateBox title="Crear sucursal" onClick={onClick} />
      )}
      <Branches />
    </>
  );
};
