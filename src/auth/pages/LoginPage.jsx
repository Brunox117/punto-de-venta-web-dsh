import { useDispatch, useSelector } from "react-redux";
import { useForm2 } from "../../hooks/useForm2";
import { startLogin } from "../../store/slices/authSlice/thunks";
import { Alert, Button, Grid, TextField } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useMemo } from "react";
const formData = {
  email: "",
  password: "",
};

export const LoginPage = () => {
  const { status, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { email, password, onInputChange } = useForm2(formData);
  const isAuthenticating = useMemo(() => status === "checking", [status]);
  const onSubmit = (event) => {
    event.preventDefault();
    // console.log({ email, password });
    dispatch(startLogin({ email, password }));
  };
  return (
    <AuthLayout title="Login">
      <form
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animete__faster"
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              onChange={onInputChange}
              value={email}
            ></TextField>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              onChange={onInputChange}
              value={password}
            ></TextField>
            <Grid
              container
              display={!!errorMessage ? "" : "none"}
              sx={{ mt: 1 }}
            >
              <Grid item>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ mb: 2, mt: 1 }}></Grid>
            <Grid item sx={{ mb: 2 }}>
              <Button
                disabled={isAuthenticating}
                type="submit"
                variant="contained"
                fullWidth
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
