import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Paper,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useFetchBestSellers } from "../../hooks/useFetchBestSellers";

const BestSellers = () => {
  const { data, isLoading } = useFetchBestSellers();

  return (
    <Paper elevation={2} sx={{ marginTop: "2rem", background: "white" }}>
      <Box sx={{ backgroundColor: "#e8b924ad", paddingBlock: "0.1rem" }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "700",
            marginBlock: "1rem",
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          Best Sellers
        </Typography>
      </Box>

      <Grid
        container
        spacing={2}
        sx={{ backgroundColor: "#f0d07226" }}
        padding={"1rem"}
      >
        {data?.slice(0, 3).map((d: any) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ alignItems: "center" }}>
            <Card variant="outlined">
              <CardContent sx={{ color: "#094252" }}>
                <Typography gutterBottom sx={{ fontSize: 14 }}>
                  SKU: {d.sku}
                </Typography>
                <Typography
                  sx={{ fontSize: "1.2rem", fontWeight: 500 }}
                  component="div"
                >
                  {d.title}
                </Typography>
                <Typography sx={{ mb: 1.5 }}>
                  Total sold: #{d.totalQuantitiesSold}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};
export default BestSellers;
