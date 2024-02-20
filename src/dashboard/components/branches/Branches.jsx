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
    dispatch(startDeletingBranchById(branch));
  };
  return (
    <>
      <Grid
        container
        justifyContent="center"
        sx={{
          padding: {
            xs: 0, // Para tamaños de pantalla extra pequeños
            sm: 2, // Para tamaños de pantalla pequeños
            md: 12, // Para tamaños de pantalla medianos
            lg: 4, // Para tamaños de pantalla grandes
            xl: 5, // Para tamaños de pantalla extra grandes
          },
          ml: {
            xs: 12, // Margen izquierdo para tamaños de pantalla extra pequeños
            sm: 3, // Margen izquierdo para tamaños de pantalla pequeños
            md: 4, // Margen izquierdo para tamaños de pantalla medianos
            lg: 5, // Margen izquierdo para tamaños de pantalla grandes
            xl: 4, // Margen izquierdo para tamaños de pantalla extra grandes
          },
        }}
      >
        {branches.map((branch) => (
          <div key={branch.id}>
            <Branch branch={branch} onEdit={onEdit} onDelete={onDelete} />
          </div>
        ))}
      </Grid>
    </>
  );
};
