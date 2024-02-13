import { Button, Grid } from "@mui/material";
import {
  SaveOutlined,
  AddCircleOutlineOutlined,
  DeleteOutline,
} from "@mui/icons-material";

export const ButtonsGrid = ({ onSaveProduct, onCreateProduct, onDelete, isSaving, isFormValid }) => {
  return (
    <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
      <Button
        onClick={onSaveProduct}
        disabled={isSaving || !isFormValid}
        color="secondary"
        sx={{ padding: 2 }}
      >
        <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
        Guardar
      </Button>
      <Button
        disabled={isSaving}
        onClick={onCreateProduct}
        color="secondary"
        sx={{ padding: 2 }}
      >
        <AddCircleOutlineOutlined sx={{ fontSize: 30, mr: 1 }} />
        Nuevo
      </Button>
      <Button
        onClick={onDelete}
        disabled={isSaving}
        color="error"
        sx={{ padding: 2 }}
      >
        <DeleteOutline sx={{ fontSize: 30, mr: 1 }} />
        Borrar
      </Button>
    </Grid>
  );
};
