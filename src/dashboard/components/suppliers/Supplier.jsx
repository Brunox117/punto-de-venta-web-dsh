import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@mui/material";

export const Supplier = ({ supplier }) => {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Card style={{ border: "none", boxShadow: "none" }}>
        <a href={supplier.siteLink} target="_blank">
          <CardMedia sx={{ height: 150, width: 300}} image={supplier.imageUrl} title={supplier.name} />
        </a>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align="center">
            {supplier.name}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
