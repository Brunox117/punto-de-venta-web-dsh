import { Paper } from "@mui/material";

export const Supplier = ({ supplier }) => {
  return (
    <Paper elevation={3} sx={{ padding: 2, mt: 2 }}>
      <pre>{JSON.stringify(supplier, null, 2)}</pre>
    </Paper>
  );
};
