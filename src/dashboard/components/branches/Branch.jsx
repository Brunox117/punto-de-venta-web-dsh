import { Paper } from "@mui/material";

export const Branch = ({ branch }) => {
  return (
    <Paper elevation={3} sx={{ padding: 2, mt: 2 }}>
      <pre>{JSON.stringify(branch, null, 2)}</pre>
    </Paper>
  );
};
