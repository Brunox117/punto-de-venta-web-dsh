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
import { clearMessage, setActiveBranch } from "../../store/slices/branchSlice/branchSlice";
import {
  createNewBranch,
  startDeletingBranch,
  startSaveBranch,
  startUploadingImg,
} from "../../store/slices/branchSlice/thunks";
import { ButtonsGrid, UploadButton } from "../components";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

const formValidations = {
  name: [(value) => value.trim().length > 0, "El campo es requerido"],
  address: [(value) => value.trim().length > 0, "El campo es requerido"],
  schedule: [(value) => value.trim().length > 0, "El campo es requerido"],
  number: [(value) => value.trim().length > 0, "El campo es requerido"],
  googleMapsLink: [(value) => value.trim().length > 0, "El campo es requerido"],
  imageUrl: [
    (value) => value.trim().length > 0,
    "La URL de la imagen es requerida",
  ],
};

export const SucursalesForm = () => {
  const dispatch = useDispatch();
  const { activeBranch, isSaving, messageSaved } = useSelector((state) => state.branch);

  // Utilizar el hook useForm para manejar el estado del formulario
  const {
    id,
    name,
    address,
    imageUrl,
    schedule,
    number,
    googleMapsLink,
    onInputChange,
    isFormValid,
    setFormState, // Agregar setFormState para actualizar el estado del formulario
  } = useForm2(activeBranch, formValidations);


  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;
    // console.log("subiendo: ", target.files[0]);
    dispatch(startUploadingImg(target.files[0]));
  };

  const onCreateBranch = () => {
    dispatch(createNewBranch());
    setFormState(activeBranch);
  };

  const onDelete = () => {
    Swal.fire({
      title: "Seguro que quieres borrar la sucursal!",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "SI",
      denyButtonText: `NO`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startDeletingBranch());
      } else if (result.isDenied) {
        return;
      }
    });
  };
  useEffect(() => {
    dispatch(
      setActiveBranch({
        id,
        name,
        address,
        imageUrl,
        schedule,
        number,
        googleMapsLink,
      })
    );
  }, [dispatch, name, address, imageUrl, schedule, number, googleMapsLink]);

  const onSaveBranch = () => {
    dispatch(startSaveBranch());
  };
  //CONFIRMACION DE GUARDAR
  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire("Sucursal actualizada/creada", messageSaved, "success");
    }
    dispatch(clearMessage());
  }, [messageSaved]);
  return (
    <FormLayout title="Agrega una Sucursal">
      <Grid container>
        <TextField
          type="text"
          variant="outlined"
          placeholder="Ingrese un nombre de la sucursal"
          label="Nombre"
          sx={{ border: "none", mb: 1 }}
          name="name"
          value={name}
          onChange={onInputChange}
        />
        <TextField
          label="Numero de Telefono de la sucursal"
          type="text"
          sx={{ border: "none", mb: 1, marginRight: 1 }}
          name="number"
          value={number}
          onChange={onInputChange}
        />
        <TextField
          label="Link de Google Maps"
          type="text"
          sx={{ border: "none", mb: 1, marginRight: 1 }}
          name="googleMapsLink"
          value={googleMapsLink}
          onChange={onInputChange}
        />
        <TextField
          label="Dirección"
          rows={3}
          type="text"
          sx={{ border: "none", mb: 1, marginRight: 1 }}
          name="address"
          value={address}
          onChange={onInputChange}
        />
        <TextField
          label="Horario"
          type="text"
          rows={3}
          sx={{ border: "none", mb: 1, marginRight: 1 }}
          name="schedule"
          value={schedule}
          onChange={onInputChange}
        />
        <UploadButton
          onFileInputChange={onFileInputChange}
          isSaving={isSaving}
        />
        <ButtonsGrid
          onSaveProduct={onSaveBranch}
          onCreateProduct={onCreateBranch}
          onDelete={onDelete}
          isSaving={isSaving}
          isFormValid={isFormValid}
        />
      </Grid>
    </FormLayout>
  );
};
