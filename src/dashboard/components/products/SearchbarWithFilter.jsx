import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Clear } from "@mui/icons-material";

export const SearchbarWithFilter = ({ searchProducts, categories }) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearchChange = (newValue) => {
    setSearchValue(newValue);
    searchProducts(newValue, selectedCategory);
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    searchProducts(searchValue, category);
  };

  const handleClearSearch = () => {
    setSearchValue("");
    searchProducts("", selectedCategory);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <TextField
        variant="outlined"
        placeholder="Buscar por nombre"
        value={searchValue}
        onChange={(e) => handleSearchChange(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {searchValue && (
                <IconButton onClick={handleClearSearch}>
                  <Clear />
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
      />
      <FormControl variant="outlined">
        <InputLabel id="category-label">Filtrar por categoría</InputLabel>
        <Select
          sx={{ minWidth: 200 }}
          labelId="category-label"
          value={selectedCategory}
          onChange={handleCategoryChange}
          label="Categoría"
        >
          <MenuItem value="">TODAS</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
