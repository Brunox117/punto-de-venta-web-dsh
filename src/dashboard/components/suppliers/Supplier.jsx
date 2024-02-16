import {
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";

export const Supplier = ({ supplier}) => {
  // Función para abrir el enlace en una nueva ventana
  const openLinkInNewTab = (url) => {
    const fullUrl = url.startsWith('http://') || url.startsWith('https://') ? url : 'https://' + url;
    window.open(fullUrl, "_blank");
  };

  return (
          <Card
            justifycontent="center"
            className={`supplier-card `}
            sx={{
              borderRadius: "8px",
              boxShadow: "none",
              width: "100%",
              mt: 2,
              mb: 2,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  borderRadius: "8px",
                  height: 500,
                  width: 450,
                  objectFit: "cover",
                  alignItems: "center", // Centra la imagen verticalmente
                  justifyContent: "center", // Centra la imagen horizontalmente
                }}
                image={supplier.imageUrl}
                title={supplier.name}
              />
            </div>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Button
                variant="outlined"
                color="success"
                onClick={() => openLinkInNewTab(supplier.siteLink)}
                sx={{ borderRadius: 20, width: "40%" }}
              >
                VISITANOS
              </Button>
            </CardContent>
          </Card>
  );
};
