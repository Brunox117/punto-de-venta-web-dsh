import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Grid,
} from "@mui/material";

export const Product = ({ product }) => {
  const { id, name, price, imageUrl, categories } = product;

  return (
<Grid container justifyContent="center" alignItems="center">
  <Card sx={{ borderRadius: '4px 4px 4px 4px', boxShadow: 4, width: 225, marginTop: 2 }}>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CardMedia
        sx={{ borderRadius: '10px 10px 10px 10px',marginTop: 2, height: 180, width: 180 }}
        image={imageUrl}
        title={name}
      />
    </div>
    <CardContent sx={{ textAlign: 'left' }}>
      <Typography gutterBottom variant="h5" component="div">
        {name}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Precio: ${price}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Categorias:
      </Typography>
      {categories.map((category, index) => (
        <Chip
          key={index}
          label={category}
          variant="outlined"
          style={{ backgroundColor: 'rgba(247, 126, 10, 0.15)', color: '#000', marginTop: 10 }}
          sx={{ marginRight: 1, marginBottom: 1 }}
        />
      ))}
    </CardContent>
  </Card>
</Grid>





  );
};
