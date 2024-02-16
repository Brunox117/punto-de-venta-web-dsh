import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import "./Supplier.css"; // Importa los estilos CSS
import { useDispatch, useSelector } from "react-redux";
import { setActiveSupplier } from "../../../store/slices/supplierSlice/supplierSlice";
import { startDeletingSupplierById } from "../../../store/slices/supplierSlice/thunks";

export const Suppliers = () => {
  const sliderRef = useRef(null); // Referencia al Slider
  const [selectedSupplierIndex, setSelectedSupplierIndex] = useState(-1);

  const dispatch = useDispatch();
  const { suppliers } = useSelector((state) => state.supplier);

  const onEdit = (supplier) => {
    dispatch(setActiveSupplier(supplier));
  };

  const onDelete = (supplier) => {
    dispatch(startDeletingSupplierById(supplier));
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

  const openLinkInNewTab = (url) => {
    const fullUrl =
      url.startsWith("http://") || url.startsWith("https://")
        ? url
        : "https://" + url;
    window.open(fullUrl, "_blank");
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: calculateSlidesToShow(), // Llama a una función para calcular el número de slides a mostrar
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 4000,
    cssEase: "linear",
    swipeToSlide: true,
  };

  return (
    <Slider {...settings} ref={sliderRef}>
      {suppliers.map((supplier, index) => (
        <div key={index}>
          <Card
            justifycontent="center"
            key={index}
            className={`supplier-card ${
              index === sliderRef.current?.slickCurrentSlide ||
              index === selectedSupplierIndex
                ? "supplier-centered"
                : ""
            }`}
            sx={{
              borderRadius: "8px",
              boxShadow: "none",
              width: "100%",
              mt: 2,
              mb: 2,
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div
              style={{
                display: "flex",
                justifycontent: "center",
                alignItems: "center",
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  borderRadius: "8px",
                  height: 500,
                  width: 450,
                  objectFit: "cover",
                  alignItems: "center", // Centra la imagen verticalmente
                  justifycontent: "center", // Centra la imagen horizontalmente
                }}
                image={supplier.imageUrl}
                title={supplier.name}
              />
            </div>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Button
                variant="outlined"
                color="success"
                onClick={() => openLinkInNewTab(supplier.siteLink)}
                sx={{ borderRadius: 20, width: "40%" }}
              >
                VISITANOS
              </Button>
            <Grid container justifyContent="space-between" sx={{ padding: 2 }}>
              <Button variant="contained" onClick={() => onEdit(supplier)}>
                Editar
              </Button>
              <Button variant="contained" onClick={() => onDelete(supplier)}>
                Borrar
              </Button>
            </Grid>
            </CardContent>
          </Card>
        </div>
      ))}
    </Slider>
  );
};