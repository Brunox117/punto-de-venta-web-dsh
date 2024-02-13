import React, { useEffect, useRef, useState } from "react";
import {
  Button,
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
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { setActiveProduct } from "../../store/slices/productSlice/productSlice";
import {
  createNewProduct,
  startDeletingProduct,
  startSaveProduct,
  startUploadingImg,
} from "../../store/slices/productSlice/thunks";

const productCategories = [
  "farmacia",
  "mascotas",
  "innovaciones",
  "cremeria",
  "maxima",
  "abarrotes",
  "bebidas",
  "hogar",
];

// Definir las validaciones
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
  const { activeProduct, isSaving, messageSaved } = useSelector(
    (state) => state.product
  );
  const fileInputRef = useRef();

  // Utilizar el hook useForm para manejar el estado del formulario
  const {
    name,
    price,
    imageUrl,
    id,
    categories: formCategories,
    onInputChange,
    setFormState, // Agregar setFormState para actualizar el estado del formulario
    isFormValid, // Agregar isFormValid para determinar si el formulario es válido
  } = useForm(activeProduct, formValidations); // Pasa formValidations aquí

  const [selectedCategories, setSelectedCategories] = useState(
    formCategories || []
  );

  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;
    console.log("subiendo: ", target.files);
    dispatch(startUploadingImg(target.files[0]));
  };

  const onCreateProduct = () => {
    dispatch(createNewProduct());
    setFormState(activeProduct);
    setSelectedCategories([]);
  };

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

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire("Producto actualizado/creado", messageSaved, "success");
    }
  }, [messageSaved]);

  const onSaveProduct = () => {
    dispatch(startSaveProduct());
  };

  const handleChange = (event) => {
    setSelectedCategories(event.target.value);
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
        <Grid item>
          <input
            type="file"
            multiple
            onChange={onFileInputChange}
            ref={fileInputRef}
            style={{
              display: "none",
            }}
          />
          <Button
            disabled={isSaving}
            color="primary"
            sx={{ fontSize: 20, mr: 1 }}
            onClick={() => fileInputRef.current.click()}
          >
            <UploadOutlined sx={{ fontSize: 30, mr: 1 }} />
            Subir imagen
          </Button>
        </Grid>
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
        <Grid
          container
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button
            onClick={onSaveProduct}
            disabled={isSaving || !isFormValid} // Deshabilita el botón si el formulario no es válido
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
          disabled={isSaving} color="error" sx={{ padding: 2 }}>
            <DeleteOutline sx={{ fontSize: 30, mr: 1 }} />
            Borrar
          </Button>
        </Grid>
      </Grid>
    </FormLayout>
  );
};
