import { Paper } from "@mui/material";

export const Category = ({ category }) => {
  return (
    <Paper elevation={3} sx={{ padding: 2, mt: 2 }}>
      <pre>{JSON.stringify(category, null, 2)}</pre>
    </Paper>
  );
};
