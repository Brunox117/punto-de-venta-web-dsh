import { Paper } from "@mui/material";
import { useSelector } from "react-redux";

export const Product = () => {
  const { activeProduct } = useSelector((state) => state.product);
  return (
    <Paper elevation={3} sx={{ padding: 2, mt: 2 }}>
      <pre>{JSON.stringify(activeProduct, null, 2)}</pre>
    </Paper>
  );
};
