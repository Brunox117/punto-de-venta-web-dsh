import { Box, Button, Grid } from "@mui/material";

export const Promo = ({ promo, onEdit, onDelete }) => {
  const { imageUrl1, imageUrl2, imageUrlG, align } = promo;
  return (
    <>
      {align === 1 ? (
        <Box p={2}>
          <Grid container spacing={2}>
            {/* Fila 1 */}
            <Grid item xs={6}>
              <img
                src={imageUrl1}
                alt="Imagen 1"
                style={{
                  width: "100%",
                  height: "290px",
                  objectFit: "fill",
                  borderRadius: "10px",
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <img
                src={imageUrl2}
                alt="Imagen 2"
                style={{
                  width: "100%",
                  height: "290px",
                  objectFit: "fill",
                  borderRadius: "10px",
                }}
              />
            </Grid>

            {/* Fila 2 */}
            <Grid item xs={12}>
              <img
                src={imageUrlG}
                alt="Imagen 3"
                style={{
                  width: "100%",
                  height: "320px",
                  objectFit: "fill",
                  borderRadius: "10px",
                }}
              />
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box p={2}>
          <Grid container spacing={2}>
            {/* Fila 2 */}
            <Grid item xs={12}>
              <img
                src={imageUrlG}
                alt="Imagen 3"
                style={{
                  width: "100%",
                  height: "320px",
                  objectFit: "fill",
                  borderRadius: "10px",
                }}
              />
            </Grid>
            {/* Fila 1 */}
            <Grid item xs={6}>
              <img
                src={imageUrl1}
                alt="Imagen 1"
                style={{
                  width: "100%",
                  height: "290px",
                  objectFit: "fill",
                  borderRadius: "10px",
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <img
                src={imageUrl2}
                alt="Imagen 2"
                style={{
                  width: "100%",
                  height: "290px",
                  objectFit: "fill",
                  borderRadius: "10px",
                }}
              />
            </Grid>
          </Grid>
        </Box>
      )}
      {onEdit && onDelete ? (
        <Grid container justifyContent="space-between" sx={{ padding: 2 }}>
          <Button
            variant="contained"
            style={{
              borderRadius: 20,
              backgroundColor: "#f77e0a",
              color: "#fff",
              marginTop: 10,
            }}
            onClick={() => onEdit(promo)}
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
            onClick={() => onDelete(promo)}
          >
            Borrar
          </Button>
        </Grid>
      ) : null}
    </>
  );
};
