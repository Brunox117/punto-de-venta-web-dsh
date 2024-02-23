// SearchbarWithFilter.jsx
import React, { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import SearchBar from "material-ui-search-bar";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  searchInput: {
    maxWidth: 320,
    marginRight: theme.spacing(2),
  },
}));

export const SearchbarWithFilter = ({ searchProducts, categories }) => {
  const classes = useStyles();
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

  return (
    <div className={classes.root}>
      <div className={classes.searchInput}>
        <SearchBar
          onCancelSearch={() => handleSearchChange("")}
          placeholder="Buscar por nombre"
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>
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
