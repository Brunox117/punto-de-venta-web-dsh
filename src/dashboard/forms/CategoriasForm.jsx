import { Grid, TextField } from "@mui/material";
import { FormLayout } from "../layout/FormLayout";
import { ButtonsGrid, UploadButton } from "../components";
import { formatString } from "../../helpers";
import { useDispatch, useSelector } from "react-redux";
import { useForm2 } from "../../hooks/useForm2";
import {
  createNewCategory,
  startDeletingCategory,
  startSaveCategory,
  startUploadingImg,
} from "../../store/slices/categorySlice/thunks";
import { useEffect } from "react";
import {
  setActivecategory,
  updateFormatedName,
} from "../../store/slices/categorySlice/categorySlice";
import { clearMessage } from "../../store/slices/branchSlice/branchSlice";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
const formValidations = {
  name: [(value) => value.trim().length > 0, "El campo es requerido"],
  imageUrl: [
    (value) => value.trim().length > 0,
    "La URL de la imagen es requerida",
  ],
};

export const CategoriasForm = () => {
  const dispatch = useDispatch();
  const { activeCategory, isSaving, messageSaved } = useSelector(
    (state) => state.category
  );
  const {
    id,
    name,
    imageUrl,
    formatedName,
    onInputChange,
    isFormValid,
    setFormState,
  } = useForm2(activeCategory, formValidations);

  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;
    dispatch(startUploadingImg(target.files[0]));
  };

  const onCreateCategory = () => {
    dispatch(createNewCategory());
    setFormState(activeCategory);
  };

  const onDelete = () => {
    Swal.fire({
      title: "Seguro que quieres borrar la categoría!",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "SI",
      denyButtonText: `NO`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startDeletingCategory());
      } else if (result.isDenied) {
        return;
      }
    });
  };

  useEffect(() => {
    dispatch(
      setActivecategory({
        id,
        name,
        imageUrl,
        formatedName,
      })
    );
  }, [dispatch, name, imageUrl]);

  const onSaveCategory = () => {
    const formatedName = formatString(name);
    dispatch(updateFormatedName(formatedName));
    dispatch(startSaveCategory());
  };

  //CONFIRMACION DE GUARDAR
  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire("Categoría actualizada/creada", messageSaved, "success");
    }
    dispatch(clearMessage());
  }, [messageSaved]);

  return (
    <FormLayout title="Agrega una categoría">
      <Grid container>
        <TextField
          label="Nombre"
          type="text"
          sx={{ border: "none", mb: 1, marginRight: 1 }}
          name="name"
          value={name}
          onChange={onInputChange}
        />
        <UploadButton
          onFileInputChange={onFileInputChange}
          isSaving={isSaving}
        />
        <ButtonsGrid
          onSaveProduct={onSaveCategory}
          onCreateProduct={onCreateCategory}
          onDelete={onDelete}
          isSaving={isSaving}
          isFormValid={isFormValid}
        />
      </Grid>
    </FormLayout>
  );
};
