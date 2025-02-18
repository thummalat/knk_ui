import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

import { Link } from "react-router-dom";

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
            }}
          >
            KAANUKA
          </Typography>

          <Button
            component={Link}
            to="/"
            sx={{
              color: "#E8B923",
              borderRadius: 0,
            }}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/orders"
            sx={{
              color: "#E8B923",
              borderRadius: 0,
            }}
          >
            orders
          </Button>
          {/* <Button
            component={Link}
            to="/fin"
            sx={{
              color: "#E8B923",
              borderRadius: 0,
            }}
          >
            Financials
          </Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
