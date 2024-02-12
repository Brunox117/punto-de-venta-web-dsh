import React from "react";
import { FormLayout } from "../../layout/FormLayout";
import { Button, Grid, Typography } from "@mui/material";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { createNewProduct } from "../../../store/slices/productSlice/thunks";

export const CreateProductBox = () => {
  const dispatch = useDispatch();
  const onCreateProduct = () => {
    dispatch(createNewProduct());
  };
  return (
    <FormLayout title="">
      <Grid container justifyContent="center">
        <Button onClick={onCreateProduct} color="secondary" sx={{ padding: 2 }}>
          <AddCircleOutlineOutlined sx={{ fontSize: 30, mr: 1 }} />
          <Typography variant="h6">CREAR PRODUCTO</Typography>
        </Button>
      </Grid>
    </FormLayout>
  );
};
