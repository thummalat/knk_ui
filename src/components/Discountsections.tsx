import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Orders from "./Orders";
const Discountsection = () => {
  return (
    <Box
      sx={{
        padding: "1rem",
        paddingBottom: "5rem",
        background: "#0942520a",
      }}
    >
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography
            variant="h5"
            component="div"
            sx={{
              textAlign: "center",
              paddingBlock: "2rem",
              color: "#094252",
              fontWeight: 500,
              fontSize: "1.5rem",
              textTransform: "uppercase",
            }}
          >
            Best Sellers
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Discountsection;
