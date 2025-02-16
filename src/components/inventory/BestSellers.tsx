import {
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
    <Paper elevation={3} sx={{ marginTop: "1rem", background: "white" }}>
      <Grid container spacing={2} padding={"1rem"}>
        <Grid size={12}>
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
        </Grid>

        {data?.slice(0, 3).map((d: any) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ alignItems: "center" }}>
            <Card>
              <CardContent>
                <Typography
                  gutterBottom
                  sx={{ color: "text.secondary", fontSize: 14 }}
                >
                  SKU: {d.sku}
                </Typography>
                <Typography
                  sx={{ fontSize: "1.2rem", fontWeight: 500 }}
                  component="div"
                >
                  {d.title}
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  Total sold: #{d.totalQuantitiesSold}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="outlined">
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};
export default BestSellers;
