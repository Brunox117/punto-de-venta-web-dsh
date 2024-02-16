import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
} from "@mui/material";

export const Supplier = ({ supplier }) => {
  // Función para abrir el enlace en una nueva ventana
  const openLinkInNewTab = (url) => {
    const fullUrl = url.startsWith('http://') || url.startsWith('https://') ? url : 'https://' + url;
    window.open(fullUrl, "_blank");
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Card style={{ border: "none", boxShadow: "none" }}>
        <CardMedia 
          sx={{ height: 150, width: 300}} 
          image={supplier.imageUrl} 
          title={supplier.name} 
          component="img"
        />
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography gutterBottom variant="h5" component="div" align="center">
            {supplier.name}
          </Typography>
          <Button
            variant="outlined"
            color="success"
            onClick={() => openLinkInNewTab(supplier.siteLink)}
            sx={{ borderRadius: 20, width: '40%' }}
          >
            VISITANOS
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};
