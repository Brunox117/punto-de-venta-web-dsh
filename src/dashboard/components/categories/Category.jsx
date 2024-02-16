import { Card, CardContent, CardMedia, Typography, Grid, Button } from "@mui/material";

export const Category = ({ onEdit, onDelete }) => {
  const { name, imageUrl } = category;

  return (
    <Grid item xs={6} sm={6} md={6} lg={10} sx={{mt: 4}}>
    <Card sx={{ borderRadius: '8px', boxShadow: 4 }}>
       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CardMedia
              sx={{ borderRadius: '8px', height: 180, width: 180, marginTop: 4 }}
              image={imageUrl}
              title={name}
              />
          </div>
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
      </CardContent>
      <Grid container justifyContent="space-between" sx={{ padding: 2 }}>
        <Button variant="contained" style={{ borderRadius: 20, backgroundColor: '#f77e0a', color: '#fff', marginTop: 10 }} onClick={() => onEdit(category)}>Editar</Button>
        <Button variant="contained" style={{ borderRadius: 20, backgroundColor: '#f77e0a', color: '#fff', marginTop: 10 }} onClick={() => onDelete(category)}>Borrar</Button>
      </Grid>
    </Card>
            </Grid>
  );
};
