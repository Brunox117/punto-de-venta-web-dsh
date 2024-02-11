import { Grid, Typography } from "@mui/material";

export const FormLayout = ({ children, title = "" }) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: "50vh",
        padding: 4,
        maxWidth: "95%", // Ancho máximo para la caja exterior (70% del ancho total)
        maxHeight: "95%", // Altura máxima para la caja exterior (70% del alto de la pantalla)
        margin: "auto", // Centrar la caja exterior en la pantalla
        marginTop: "7vh", // Margen superior del 5% del alto de la pantalla
        borderRadius: 8,
        backgroundColor: 'primary.opacity50', 
      }}
    >
      <Grid
        item
        sx={{
          width: "100%", // La caja interior se ajustará automáticamente al ancho de la caja exterior
          height: "100%", // La caja interior se ajustará automáticamente al alto de la caja exterior
          backgroundColor: "white",
          padding: 3,
          borderRadius: 8,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            mb: 1,
            color: 'black',
          }}
        >
          {title}
        </Typography>

        {children}
      </Grid>
    </Grid>
  );
};
