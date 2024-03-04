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
import { clearMessage, setActivePost } from "../../store/slices/postSlice/postSlice";
import {
  createNewPost,
  startDeletingPost,
  startSavePost,
  startUploadingImg,
} from "../../store/slices/postSlice/thunks";
import { ButtonsGrid, UploadButton } from "../components";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

const formValidations = {
  title: [(value) => value.trim().length > 0, "El campo es requerido"],
  description: [(value) => value.trim().length > 0, "El campo es requerido"],
  content: [(value) => value.trim().length > 0, "El campo es requerido"],
  autor: [(value) => value.trim().length > 0, "El campo es requerido"],
  imageUrl: [
    (value) => value.trim().length > 0,
    "La URL de la imagen es requerida",
  ],
};



export const AbarroTipsForm = () => {
  const dispatch = useDispatch();
  const { activePost, isSaving, messageSaved } = useSelector((state) => state.post);

  // Utilizar el hook useForm para manejar el estado del formulario
  const {
    id,
    title,
    imageUrl,
    description,
    content,
    date,
    autor,
    isFormValid,
    onInputChange,
    setFormState, // Agregar setFormState para actualizar el estado del formulario
  } = useForm2(activePost, formValidations);


  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;
    // console.log("subiendo: ", target.files[0]);
    dispatch(startUploadingImg(target.files[0]));
  };

  const onCreatePost = () => {
    dispatch(createNewPost());
    setFormState(activePost);
  };

  const onDelete = () => {
    Swal.fire({
      title: "Seguro que quieres borrar este post!",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "SI",
      denyButtonText: `NO`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startDeletingPost());
      } else if (result.isDenied) {
        return;
      }
    });
  };
  useEffect(() => {
    dispatch(
      setActivePost({
        id,
        title,
        date,
        imageUrl,
        description,
        content,
        autor,
      })
    );
  }, [dispatch, title, imageUrl, description, content, autor, date]);

  const onSavePost = () => {
    dispatch(startSavePost());
  };
  //CONFIRMACION DE GUARDAR
  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire("Post actualizado/creado", messageSaved, "success");
    }
    dispatch(clearMessage());
  }, [messageSaved]);
  return (
    <FormLayout title="Agrega un titulo para el post">
      <Grid container>
        <TextField
          type="text"
          variant="outlined"
          placeholder="Ingrese un titulo para el post"
          label="Titulo"
          sx={{ border: "none", mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}
        />
        <TextField
          type="text"
          variant="outlined"
          placeholder="Ingrese una descripcion para la imagen"
          label="Descripción"
          sx={{ border: "none", mb: 1 }}
          name="description"
          value={description}
          onChange={onInputChange}
        />
        <TextField
          type="text"
          variant="outlined"
          placeholder="Ingrese el autor de la publicación"
          label="Autor"
          sx={{ border: "none", mb: 1 }}
          name="autor"
          value={autor}
          onChange={onInputChange}
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="Contenido del post"
          sx={{ border: "none", mb: 1 }}
          minRows={6}
          name="content"
          value={content}
          onChange={onInputChange}
        />
        <UploadButton
          onFileInputChange={onFileInputChange}
          isSaving={isSaving}
        />
        <ButtonsGrid
          onSaveProduct={onSavePost}
          onCreateProduct={onCreatePost}
          onDelete={onDelete}
          isSaving={isSaving}
          isFormValid={isFormValid}
        />
      </Grid>
    </FormLayout>
  );
};