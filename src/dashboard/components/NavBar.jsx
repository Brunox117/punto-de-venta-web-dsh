import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startLogout } from "../../store/slices/authSlice/thunks";

const routes = [
  "productos",
  "sucursales",
  "abarrotips",
  "proveedores",
  "categorías",
  "banners",
  "promociones",
];

export const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const dispatch = useDispatch();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleLogout = () => {
    dispatch(startLogout());
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {routes.map((route) => (
                <Link
                  key={route}
                  to={`/${route}`}
                  style={{ textDecoration: "none" }}
                >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography
                      sx={{
                        mr: 2,
                        display: { xs: "flex", md: "none" },
                        flexGrow: 1,
                        fontFamily: "monospace",
                        fontWeight: 700,
                        color: "black",
                        textDecoration: "none",
                        textTransform: "uppercase",
                      }}
                      textAlign="center"
                    >
                      {route}
                    </Typography>
                  </MenuItem>
                </Link>
              ))}
              <Button
               onClick={handleLogout}
                sx={{
                  my: 2,
                  color: "red",
                  display: "block",
                  fontWeight: "bold",
                }}
              >
                Salir
              </Button>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            DASHBOARD
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {routes.map((route) => (
              <Link
                key={route}
                to={`/${route}`}
                style={{ textDecoration: "none" }}
              >
                <Button
                  sx={{
                    my: 2,
                    color: "black",
                    display: "block",
                    fontWeight: "bold",
                  }}
                >
                  {route}
                </Button>
              </Link>
            ))}
            <Button
              onClick={handleLogout}
              sx={{
                my: 2,
                color: "red",
                display: "block",
                fontWeight: "bold",
              }}
            >
              Salir
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
