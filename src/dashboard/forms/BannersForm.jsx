import { useDispatch, useSelector } from "react-redux";
import { useForm2 } from "../../hooks/useForm2";
import { clearMessage, setActiveBanner } from "../../store/slices/bannerSlice/bannerSlice";
import { createNewBanner, startDeletingBanner, startSaveBanner, startUploadingImg } from "../../store/slices/bannerSlice/thunks";
import { ButtonsGrid, UploadButton } from "../components";
import { FormLayout } from "../layout/FormLayout";
import { Grid, TextField } from "@mui/material";
import { useEffect } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

const formValidations = {
  imageUrl: [
    (value) => value.trim().length > 0,
    "La URL de la imagen es requerida",
  ],
};

export const BannersForm = () => {
  const dispatch = useDispatch();
  const { activeBanner, isSaving, messageSaved } = useSelector(state => state.banner);
  const {
    id,
    imageUrl,
    redirectUrl,
    onInputChange,
    isFormValid,
    setFormState,
  } = useForm2(activeBanner, formValidations);
  
  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;
    // console.log("subiendo: ", target.files[0]);
    dispatch(startUploadingImg(target.files[0]));
  };

  const onCreateBanner = () => {
    dispatch(createNewBanner());
  };

  const onDelete = () => {
    Swal.fire({
      title: "Seguro que quieres borrar este banner!",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "SI",
      denyButtonText: `NO`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startDeletingBanner());
      } else if (result.isDenied) {
        return;
      }
    });
  };

  useEffect(() => {
    dispatch(setActiveBanner({
      id,
      imageUrl,
      redirectUrl,
    }))
  }, [dispatch, imageUrl, redirectUrl]);

  const onSaveBanner = () => {
    dispatch(startSaveBanner());
  }

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire("Banner actualizado/creado", messageSaved, "success");
    }
    dispatch(clearMessage());
  }, [messageSaved]);
  
  return (
    <FormLayout title="Agrega un banner">
      <Grid container>
      <TextField
          type="text"
          variant="outlined"
          placeholder="Ingrese un link"
          label="Link"
          sx={{ border: "none", mb: 1 }}
          name="redirectUrl"
          value={redirectUrl}
          onChange={onInputChange}
        />
      <UploadButton
          onFileInputChange={onFileInputChange}
          isSaving={isSaving}
          />
        <ButtonsGrid
          onSaveProduct={onSaveBanner}
          onCreateProduct={onCreateBanner}
          onDelete={onDelete}
          isSaving={isSaving}
          isFormValid={isFormValid}
          />
          </Grid>
    </FormLayout>

  )
}
