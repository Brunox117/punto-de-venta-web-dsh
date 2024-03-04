import React, { useEffect, useState } from "react";
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
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import {
  setActiveProduct,
  createNewProduct,
  startDeletingProduct,
  startSaveProduct,
  startUploadingImg,
  clearMessage,
} from "../../store/slices/productSlice";
import { ButtonsGrid, UploadButton } from "../components";

// const productCategories = [
//   "Bebidas",
//   "Farmacia",
//   "Mascotas",
// ];

const formValidations = {
  name: [(value) => value.trim().length > 0, "El nombre es requerido"],
  price: [
    (value) => !isNaN(value) && parseFloat(value) >= 0,
    "El precio debe ser un número positivo",
  ],
  imageUrl: [
    (value) => value.trim().length > 0,
    "La URL de la imagen es requerida",
  ],
  categories: [
    (value) => value.length > 0,
    "Debes seleccionar al menos una categoría",
  ],
};

export const ProductsForm = () => {
  const dispatch = useDispatch();
  const productCategories = []
  //SE OBTIENE LA INFORMACION QUE SE NECESITA DEL STORE
  const { activeProduct, isSaving, messageSaved } = useSelector(
    (state) => state.product
  );
  const { categories } = useSelector(
    (state) => state.category
  );
  categories.forEach(category => {
    productCategories.push(category.name)
  });
  // HOOK USEFORM MANEJA EL FORMULARIO
  const {
    name,
    price,
    imageUrl,
    id,
    categories: formCategories,
    onInputChange,
    setFormState,
    isFormValid,
  } = useForm(activeProduct, formValidations);
  //MANEJAR LA SELECCION DE CATEGORIAS
  const [selectedCategories, setSelectedCategories] = useState(
    formCategories || []
  );
  const handleChange = (event) => {
    setSelectedCategories(event.target.value);
  };
  //USE EFFECT ACTUALIZA EN TIEMPO REAL EL FORMULARIO
  useEffect(() => {
    dispatch(
      setActiveProduct({
        name,
        price,
        imageUrl,
        categories: selectedCategories,
        id,
      })
    );
  }, [dispatch, name, price, imageUrl, selectedCategories]);
  //SE USA PARA OBTENER LA IMG Y SUBIRLA A A LA DB
  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;
    // console.log("subiendo: ", target.files);
    dispatch(startUploadingImg(target.files[0]));
  };
  //CONFIRMACION DE GUARDAR
  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire("Producto actualizado/creado", messageSaved, "success");
    }
    dispatch(clearMessage());
  }, [messageSaved]);
  //CRUD DEL PRODUCT
  const onSaveProduct = () => {
    dispatch(startSaveProduct());
  };
  const onCreateProduct = () => {
    dispatch(createNewProduct());
    setFormState(activeProduct);
    setSelectedCategories([]);
  };
  const onDelete = () => {
    Swal.fire({
      title: "Seguro que quieres borrar el producto!",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "SI",
      denyButtonText: `NO`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startDeletingProduct());
      } else if (result.isDenied) {
        return;
      }
    });
  };

  return (
    <FormLayout title="Crea un producto">
      <Grid container>
        <TextField
          type="text"
          variant="outlined"
          placeholder="Ingrese un nombre"
          label="Nombre"
          sx={{ border: "none", mb: 1 }}
          name="name"
          value={name}
          onChange={onInputChange}
        />
        <TextField
          id="outlined-number"
          label="Precio"
          type="number"
          sx={{ border: "none", mb: 1, marginRight: 1 }}
          InputLabelProps={{
            shrink: true,
          }}
          name="price"
          value={price}
          onChange={onInputChange}
        />
        <UploadButton
          onFileInputChange={onFileInputChange}
          isSaving={isSaving}
        />
        <FormControl fullWidth sx={{ mt: 1 }}>
          <InputLabel id="categories-label">Categorías</InputLabel>
          <Select
            labelId="categories-label"
            id="categories-select"
            multiple
            value={selectedCategories}
            onChange={handleChange}
            renderValue={(selected) => selected.join(", ")}
          >
            {productCategories.map((category) => (
              <MenuItem key={category} value={category}>
                <Checkbox checked={selectedCategories.indexOf(category) > -1} />
                <ListItemText primary={category} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <ButtonsGrid
          onSaveProduct={onSaveProduct}
          onCreateProduct={onCreateProduct}
          onDelete={onDelete}
          isSaving={isSaving}
          isFormValid={isFormValid}
        />
      </Grid>
    </FormLayout>
  );
};
