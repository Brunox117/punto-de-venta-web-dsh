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
    <Grid>
      <Card>
        <CardMedia sx={{ height: 150 }} image={imageUrl} title={name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Precio: ${price}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Categories:
          </Typography>
          {categories.map((category, index) => (
            <Chip
              key={index}
              label={category}
              variant="outlined"
              style={{ margin: "0 4px" }}
            />
          ))}
        </CardContent>
      </Card>
    </Grid>
  );
};
