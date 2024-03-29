import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Grid,
  Button,
} from "@mui/material";

export const Product = ({ product, onEdit, onDelete }) => {
  const { name, price, imageUrl, categories, discount } = product;

  return (
    <Grid item xs={11} sm={11} md={11} lg={11}>
      <Card sx={{ borderRadius: "8px", boxShadow: 4, mt: 2 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardMedia
            sx={{ borderRadius: "8px", height: 180, width: 180, marginTop: 4 }}
            image={imageUrl}
            title={name}
          />
        </div>
        <CardContent sx={{ textAlign: "center" }}>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Precio: ${price}
          </Typography>
          {discount > 0 && discount !== "" ? (
            <Typography variant="body1" color="textSecondary">
              Descuento: {discount}%
            </Typography>
          ) : null}
          <Typography variant="body2" color="textSecondary">
            Categorías:
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              marginTop: 1,
            }}
          >
            {categories.map((category, index) => (
              <Chip
                key={index}
                label={category}
                variant="outlined"
                style={{
                  backgroundColor: "rgba(247, 126, 10, 0.15)",
                  color: "#000",
                  margin: 2,
                }}
              />
            ))}
          </div>
        </CardContent>
        <Grid container justifyContent="space-between" sx={{ padding: 2 }}>
          <Button
            variant="contained"
            style={{
              borderRadius: 20,
              backgroundColor: "#f77e0a",
              color: "#fff",
              marginTop: 10,
            }}
            onClick={() => onEdit(product)}
          >
            Editar
          </Button>
          <Button
            variant="contained"
            style={{
              borderRadius: 20,
              backgroundColor: "#f77e0a",
              color: "#fff",
              marginTop: 10,
            }}
            onClick={() => onDelete(product)}
          >
            Borrar
          </Button>
        </Grid>
      </Card>
    </Grid>
  );
};
