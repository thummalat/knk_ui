import { AppBar, Box, Stack, Toolbar, Typography } from "@mui/material";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        elevation={0}
        position="static"
        sx={{
          background:
            "linear-gradient(135deg, #ffffff 0%, #f3f8fa 52%, #e8f6f4 100%)",
          boxShadow: "0 8px 28px rgba(9, 66, 82, 0.08)",
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
                background:
                  "linear-gradient(135deg, #094252 0%, #176d74 58%, #2ec4b6 100%)",
                borderRadius: 2,
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
                KAANUKA
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
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              backgroundColor: "#edf8f5",
              borderRadius: 999,
              color: "#176d74",
              display: { xs: "none", sm: "flex" },
              gap: 0.8,
              padding: "0.55rem 0.9rem",
            }}
          >
            <AccountBalanceWalletOutlinedIcon fontSize="small" />
            <Typography sx={{ fontSize: "0.85rem", fontWeight: 800 }}>
              Finance Dashboard
            </Typography>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
