import { Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setActiveBranch } from "../../../store/slices/branchSlice/branchSlice";
import { startDeletingBranchById } from "../../../store/slices/branchSlice/thunks";
import { Branch } from "./Branch";
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
          <Branch branch={branch} onEdit={onEdit} onDelete={onDelete}/>
        </div>
      ))}
    </>
  );
};
