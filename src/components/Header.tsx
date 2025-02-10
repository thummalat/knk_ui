import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

const Header = () => {
  const navItems = ["Brass Items", "Fancy Items", "Gifting"];
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{
              color: "#E8B923",
              flexGrow: 1,
              textAlign: "center",
            }}
          >
            KAANUKA
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
