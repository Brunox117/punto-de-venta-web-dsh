import React from "react";
import { FormLayout } from "../layout/FormLayout";
import { Button, Grid, Typography } from "@mui/material";
import { AddCircleOutlineOutlined } from "@mui/icons-material";

export const CreateBox = ({title = '', onClick}) => {
  
  return (
    <FormLayout title="">
      <Grid container justifyContent="center">
        <Button onClick={onClick} color="secondary" sx={{ padding: 2 }}>
          <AddCircleOutlineOutlined sx={{ fontSize: 30, mr: 1 }} />
          <Typography variant="h6">{title}</Typography>
        </Button>
      </Grid>
    </FormLayout>
  );
};
