import { useDispatch, useSelector } from "react-redux";
import { useForm2 } from "../../hooks/useForm2";
import {
  createNewPromo,
  startDeletingPromo,
  startSavePromo,
  startUploadingImg,
} from "../../store/slices/promoSlice/thunks";
import {
  clearMessage,
  setActivePromo,
} from "../../store/slices/promoSlice/promoSlice";
import { useEffect } from "react";
import { FormLayout } from "../layout/FormLayout";
import { FormControl, Grid, MenuItem, Select, Typography } from "@mui/material";
import { ButtonsGrid, UploadButton } from "../components";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

const formValidations = {
  imageUrl1: [
    (value) => value.trim().length > 0,
    "La URL de la imagen es requerida",
  ],
  imageUrl2: [
    (value) => value.trim().length > 0,
    "La URL de la imagen es requerida",
  ],
  imageUrlG: [
    (value) => value.trim().length > 0,
    "La URL de la imagen es requerida",
  ],
};

export const PromocionesForm = () => {
  const dispatch = useDispatch();
  const { activePromo, isSaving, messageSaved } = useSelector(
    (state) => state.promo
  );
  const {
    id,
    imageUrl1,
    imageUrl2,
    imageUrlG,
    align,
    onInputChange,
    isFormValid,
    setFormState,
  } = useForm2(activePromo, formValidations);
  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;
    dispatch(startUploadingImg(target.files[0], 1));
  };
  const onFileInputChange2 = ({ target }) => {
    if (target.files === 0) return;
    dispatch(startUploadingImg(target.files[0], 2));
  };
  const onFileInputChange3 = ({ target }) => {
    if (target.files === 0) return;
    dispatch(startUploadingImg(target.files[0], 3));
  };
  const onCreatePromo = () => {
    dispatch(createNewPromo());
  };
  const onDelete = () => {
    Swal.fire({
      title: "Seguro que quieres borrar esta promocion!",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "SI",
      denyButtonText: `NO`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startDeletingPromo());
      } else if (result.isDenied) {
        return;
      }
    });
  };
  useEffect(() => {
    dispatch(
      setActivePromo({
        id,
        imageUrl1,
        imageUrl2,
        imageUrlG,
        align,
      })
    );
  }, [dispatch, imageUrl1, imageUrl2, imageUrlG, align]);

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire("Promocion actualizada/creada", messageSaved, "success");
    }
    dispatch(clearMessage());
  }, [messageSaved]);

  const onSavePromo = () => {
    dispatch(startSavePromo());
  };

  return (
    <FormLayout title="Agrega una promocion">
      <Grid container alignItems="center">
        <FormControl>
          <Select
            value={align}
            onChange={onInputChange} // Asegúrate de que el nombre del campo coincida con el estado en useForm2
            name="align" // Nombre del campo
          >
            <MenuItem value={1}>Alineación 1</MenuItem>
            <MenuItem value={2}>Alineación 2</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid container alignItems="center">
        <Typography variant="h6">Imagen mediana 1</Typography>
        <UploadButton
          onFileInputChange={onFileInputChange}
          isSaving={isSaving}
        />
      </Grid>
      <Grid container alignItems="center">
        <Typography variant="h6">Imagen mediana 2</Typography>
        <UploadButton
          onFileInputChange={onFileInputChange2}
          isSaving={isSaving}
        />
      </Grid>
      <Grid container alignItems="center">
        <Typography variant="h6">Imagen grande</Typography>
        <UploadButton
          onFileInputChange={onFileInputChange3}
          isSaving={isSaving}
        />
      </Grid>
      <ButtonsGrid
        onSaveProduct={onSavePromo}
        onCreateProduct={onCreatePromo}
        onDelete={onDelete}
        isSaving={isSaving}
        isFormValid={isFormValid}
      />
    </FormLayout>
  );
};
