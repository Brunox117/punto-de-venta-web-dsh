import {
  Button,
  Checkbox,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { FormLayout } from "../layout/FormLayout";
import { useRef, useState } from "react";
import { SaveOutlined, UploadOutlined } from "@mui/icons-material";

const categories = [
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
  const [selectedCategories, setSelectedCategories] = useState([]);
  const fileInputRef = useRef();

  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;
    console.log("subiendo: ", target.files);
    // dispatch(startUploadingFiles(target.files));
  };

  const handleChange = (event) => {
    setSelectedCategories(event.target.value);
  };
  return (
    <FormLayout title="Crea un producto">
      <Grid container>
        <TextField
          type="text"
          variant="outlined"
          // fullWidth
          placeholder="Ingrese un nombre"
          label="Nombre"
          sx={{ border: "none", mb: 1 }}
          // name="title"
          // value={title}
          // onChange={onInputChange}
        />

          <TextField
            id="outlined-number"
            label="Precio"
            type="number"
            sx={{ border: "none", mb: 1, marginRight: 1 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
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
          // disabled={isSaving}
          // onClick={onSaveNote}
          color="secondary"
          sx={{ padding: 2 }}
          // onClick={() => fileInputRef.current.click()}
        >
          <UploadOutlined sx={{ fontSize: 30, mr: 1 }} />
          Subir imagen
        </Button>
        <FormControl fullWidth>
          <InputLabel id="categories-label">Categorías</InputLabel>
          <Select
            labelId="categories-label"
            id="categories-select"
            multiple
            value={selectedCategories}
            onChange={handleChange}
            renderValue={(selected) => selected.join(", ")}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                <Checkbox checked={selectedCategories.indexOf(category) > -1} />
                <ListItemText primary={category} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          // disabled={isSaving}
          // onClick={onSaveNote}
          color="secondary"
          sx={{ padding: 2 }}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>
    </FormLayout>
  );
};
