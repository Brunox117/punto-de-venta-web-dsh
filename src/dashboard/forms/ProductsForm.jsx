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
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { setActiveProduct } from "../../store/slices/productSlice/productSlice";
import { createNewProduct } from "../../store/slices/productSlice/thunks";

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

export const ProductsForm = () => {
  const dispatch = useDispatch();
  const { activeProduct } = useSelector((state) => state.product);
  const fileInputRef = useRef();

  // Utilizar el hook useForm para manejar el estado del formulario
  const {
    name,
    price,
    imageUrl,
    categories: formCategories,
    onInputChange,
    setFormState, // Agregar setFormState para actualizar el estado del formulario
  } = useForm(activeProduct);

  const [selectedCategories, setSelectedCategories] = useState(
    formCategories || []
  );

  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;
    console.log("subiendo: ", target.files);
    // dispatch(startUploadingFiles(target.files));
  };

  const onCreateProduct = () => {
    dispatch(createNewProduct());
    setSelectedCategories([]);
    setFormState(activeProduct);
  };

  useEffect(() => {
    dispatch(
      setActiveProduct({
        name,
        price,
        imageUrl,
        categories: selectedCategories,
      })
    );
  }, [dispatch, name, price, imageUrl, selectedCategories]);

  const handleChange = (event) => {
    setSelectedCategories(event.target.value);
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
          <Button color="secondary" sx={{ padding: 2 }}>
            <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
            Guardar
          </Button>
          <Button
            onClick={onCreateProduct}
            color="secondary"
            sx={{ padding: 2 }}
          >
            <AddCircleOutlineOutlined sx={{ fontSize: 30, mr: 1 }} />
            Nuevo
          </Button>
          <Button color="error" sx={{ padding: 2 }}>
            <DeleteOutline sx={{ fontSize: 30, mr: 1 }} />
            Borrar
          </Button>
        </Grid>
      </Grid>
    </FormLayout>
  );
};
