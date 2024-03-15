import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { useForm2 } from "../../hooks/useForm2";
import { useDispatch, useSelector } from "react-redux";
import {
  startDeletingTitle,
  startSaveTitle,
} from "../../store/slices/discountsTitleSlice/thunks";
import { useEffect } from "react";
import { setActiveTitle } from "../../store/slices/discountsTitleSlice/discountsTitleSlice";
import { FormLayout } from "../layout/FormLayout";
import { Button, Grid, TextField } from "@mui/material";
import { DeleteOutline, SaveOutlined } from "@mui/icons-material";

const formValidations = {};

export const DiscountTitleForm = () => {
  const dispatch = useDispatch();
  const { activeTitle, isSaving, messageSaved } = useSelector(
    (state) => state.discountTitle
  );
  const { id, title, subtitle, isFormValid, onInputChange, setFormState } =
    useForm2(activeTitle, formValidations);
  const onDelete = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Estás a punto de borrar el título de descuento",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, borrar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startDeletingTitle());
      }
    });
  };
  useEffect(() => {
    dispatch(setActiveTitle({ id, title, subtitle }));
  }, [id, title, subtitle, dispatch]);
  const onSaveTitle = () => {
    dispatch(startSaveTitle());
  };
  return (
    <FormLayout title="Agrega un título para los descuentos">
      <Grid container>
        <TextField
          type="text"
          variant="outlined"
          placeholder="Ingrese el motivo del descuento"
          label="Arriba naranja"
          sx={{ border: "none", mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}
        />
        <TextField
          type="text"
          variant="outlined"
          placeholder="Ingrese el motivo del descuento"
          label="Abajo verde"
          sx={{ border: "none", mb: 1 }}
          name="subtitle"
          value={subtitle}
          onChange={onInputChange}
        />
        <Grid
          container
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button
            onClick={onSaveTitle}
            disabled={isSaving || !isFormValid}
            color="secondary"
            sx={{ padding: 2 }}
          >
            <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
            Guardar
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
      </Grid>
    </FormLayout>
  );
};
