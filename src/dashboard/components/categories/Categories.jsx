import { useDispatch, useSelector } from "react-redux";
import {
  setActiveCategory,
  startDeletingCategoryById,
} from "../../../store/slices/categorySlice";
import { Button, Grid } from "@mui/material";
import { Category } from "./Category";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef, useState } from "react";

export const Categories = () => {
  const sliderRef = useRef(null); // Referencia al Slider
  const [selectedSupplierIndex, setSelectedSupplierIndex] = useState(-1);

  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const onEdit = (category) => {
    dispatch(setActiveCategory(category));
  };
  const onDelete = (category) => {
    dispatch(startDeletingCategoryById(category));
  };
  const handleMouseEnter = (index) => {
    setSelectedSupplierIndex(index);
  };

  const handleMouseLeave = () => {
    setSelectedSupplierIndex(-1);
  };

  const calculateSlidesToShow = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1280) {
      return 4; // Para pantallas grandes, muestra 3 slides
    } else if (screenWidth >= 768) {
      return 2; // Para pantallas medianas, muestra 2 slides
    } else {
      return 1; // Para pantallas pequeñas, muestra 1 slide
    }
  };
  return (
      <Grid container justifyContent="center" sx={{
        padding: {
          xs: 0, // Para tamaños de pantalla extra pequeños
          sm: 2, // Para tamaños de pantalla pequeños
          md: 12, // Para tamaños de pantalla medianos
          lg: 4, // Para tamaños de pantalla grandes
          xl: 5 // Para tamaños de pantalla extra grandes
        },
        ml: {
          xs: 12, // Margen izquierdo para tamaños de pantalla extra pequeños
          sm: 3, // Margen izquierdo para tamaños de pantalla pequeños
          md: 4, // Margen izquierdo para tamaños de pantalla medianos
          lg: 5, // Margen izquierdo para tamaños de pantalla grandes
          xl: 4 // Margen izquierdo para tamaños de pantalla extra grandes
        }
      }}>
        {categories.map((category) => (
          <Grid item key={category.id} xs={12} sm={6} md={4} lg={3} xl={2}>
            <Category category={category} onEdit={onEdit} onDelete={onDelete} />
          </Grid>
        ))}
        
      </Grid>
  );
};
