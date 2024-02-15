import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setActiveBranch } from "../../../store/slices/branchSlice/branchSlice";
import { startDeletingBranchById } from "../../../store/slices/branchSlice/thunks";
export const Branches = () => {
  const dispatch = useDispatch();
  const { branches } = useSelector((state) => state.branch);
  const onEdit = (branch) => {
    dispatch(setActiveBranch(branch));
  };
  const onDelete = (branch) => {
    dispatch(startDeletingBranchById(branch))
  }
  return (
    <>
      {branches.map((branch) => (
        <div key={branch.id}>
          {branch.name}
          <Button onClick={() => onEdit(branch)}>Editar</Button>
          <Button onClick={() => onDelete(branch)}>Borrar</Button>
        </div>
      ))}
    </>
  );
};
