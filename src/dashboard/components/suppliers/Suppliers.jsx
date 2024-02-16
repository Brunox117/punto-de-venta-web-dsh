import { Button, Grid } from "@mui/material";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { setActiveSupplier } from "../../../store/slices/supplierSlice/supplierSlice";
import { startDeletingSupplierById } from "../../../store/slices/supplierSlice/thunks";
import { Supplier } from "./Supplier";
import Slider from "react-slick";
export const Suppliers = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    swipe: true,
  };
  const dispatch = useDispatch();
  const { suppliers } = useSelector((state) => state.supplier);
  const onEdit = (supplier) => {
    dispatch(setActiveSupplier(supplier));
  };
  const onDelete = (supplier) => {
    dispatch(startDeletingSupplierById(supplier))
  }
  return (
    <>
    <Slider {...settings}>
    {suppliers.map((supplier) => (
      <Grid key={supplier.id} container justifyContent='center' spacing={2}>
      <Grid item >
        <Supplier supplier={supplier} />
      </Grid>
      <Grid item>
        <Button onClick={() => onEdit(supplier)}>Editar</Button>
        <Button onClick={() => onDelete(supplier)}>Borrar</Button>
      </Grid>
    </Grid>
    
      ))}
      </Slider>
    </>
    );
  };
  
  
      