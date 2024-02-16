import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@mui/material";

export const Supplier = ({ supplier }) => {
  // Función para abrir el enlace en una nueva ventana
  const openLinkInNewTab = (url) => {
    window.open(url, "_blank");
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Card style={{ border: "none", boxShadow: "none" }}>
        <div style={{ cursor: "pointer" }} onClick={() => openLinkInNewTab(supplier.siteLink)}>
          <CardMedia 
            sx={{ height: 150, width: 300}} 
            image={supplier.imageUrl} 
            title={supplier.name} 
            component="img"
            onDragStart={(e) => e.stopPropagation()}
          />
        </div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align="center">
            {supplier.name}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

