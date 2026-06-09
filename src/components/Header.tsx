import { AppBar, Box, Stack, Toolbar, Typography } from "@mui/material";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        elevation={0}
        position="static"
        sx={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #d7e8ec",
          boxShadow: "none",
          color: "#094252",
          width: "100%",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            minHeight: { xs: 60, sm: 82 },
            paddingInline: { xs: 1.25, sm: 4 },
          }}
        >
          <Stack direction="row" alignItems="center" sx={{ gap: { xs: 1, sm: 1.5 } }}>
            <Box
              sx={{
                alignItems: "center",
                backgroundColor: "#094252",
                borderRadius: 0,
                color: "white",
                display: "flex",
                height: { xs: 38, sm: 46 },
                justifyContent: "center",
                width: { xs: 38, sm: 46 },
              }}
            >
              <SavingsOutlinedIcon fontSize="small" />
            </Box>
            <Box>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  color: "#094252",
                  fontSize: { xs: "1rem", sm: "1.25rem" },
                  fontWeight: 900,
                  lineHeight: 1.05,
                }}
              >
                FIN
              </Typography>
              <Typography
                sx={{
                  color: "#5a7177",
                  fontSize: { xs: "0.74rem", sm: "0.85rem" },
                  fontWeight: 600,
                  marginTop: { xs: 0.2, sm: 0.4 },
                }}
              >
                Personal finance overview
              </Typography>
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
