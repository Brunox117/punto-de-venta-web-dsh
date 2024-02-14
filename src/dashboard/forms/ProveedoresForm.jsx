import React, { useEffect } from "react";
import {
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { FormLayout } from "../layout/FormLayout";
import {
  AddCircleOutlineOutlined,
  DeleteOutline,
  SaveOutlined,
  UploadOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useForm2 } from "../../hooks/useForm2";
import { clearMessage, setActiveSupplier } from "../../store/slices/supplierSlice/supplierSlice";
import {
  createNewSupplier,
  startDeletingSupplier,
  startSaveSupplier,
  startUploadingImg,
} from "../../store/slices/supplierSlice/thunks";
import { ButtonsGrid, UploadButton } from "../components";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

const formValidations = {
  name: [(value) => value.trim().length > 0, "El campo es requerido"],
  siteLink: [(value) => value.trim().length > 0, "El campo es requerido"],
  imageUrl: [
    (value) => value.trim().length > 0,
    "La URL de la imagen es requerida",
  ],
};

export const ProveedoresForm = () => {
  const dispatch = useDispatch();
  const { activeSupplier, isSaving, messageSaved } = useSelector((state) => state.supplier);

  // Utilizar el hook useForm para manejar el estado del formulario
  const {
    id,
    name,
    imageUrl,
    siteLink,
    isFormValid,
    onInputChange,
    setFormState, // Agregar setFormState para actualizar el estado del formulario
  } = useForm2(activeSupplier, formValidations);


  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;
    console.log("subiendo: ", target.files[0]);
    dispatch(startUploadingImg(target.files[0]));
  };

  const onCreateSupplier = () => {
    dispatch(createNewSupplier());
    setFormState(activeSupplier);
  };

  const onDelete = () => {
    Swal.fire({
      title: "Seguro que quieres borrar este proveedor!",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "SI",
      denyButtonText: `NO`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startDeletingSupplier());
      } else if (result.isDenied) {
        return;
      }
    });
  };
  useEffect(() => {
    dispatch(
      setActiveSupplier({
        id,
        name,
        imageUrl,
        siteLink,
      })
    );
  }, [dispatch, name, imageUrl, siteLink]);

  const onSaveSupplier = () => {
    dispatch(startSaveSupplier());
  };
  //CONFIRMACION DE GUARDAR
  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire("Proveedor actualizado/creado", messageSaved, "success");
    }
    dispatch(clearMessage());
  }, [messageSaved]);
  return (
    <FormLayout title="Agrega el nombre de un Proveedor">
      <Grid container>
        <TextField
          type="text"
          variant="outlined"
          placeholder="Ingrese un nombre del proveedor"
          label="Nombre"
          sx={{ border: "none", mb: 1 }}
          name="name"
          value={name}
          onChange={onInputChange}
        />
        <TextField
          label="Link del Sitio Web del Proveedor"
          type="text"
          sx={{ border: "none", mb: 1, marginRight: 1 }}
          name="siteLink"
          value={siteLink}
          onChange={onInputChange}
        />
        <UploadButton
          onFileInputChange={onFileInputChange}
          isSaving={isSaving}
        />
        <ButtonsGrid
          onSaveProduct={onSaveSupplier}
          onCreateProduct={onCreateSupplier}
          onDelete={onDelete}
          isSaving={isSaving}
          isFormValid={isFormValid}
        />
      </Grid>
    </FormLayout>
  );
};