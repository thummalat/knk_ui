import { Button, Container, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useFetchProducts } from "../hooks/useFetchProducts";
import { useEffect, useState } from "react";

const InventoryDetails = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const { isLoading, data: productsData } = useFetchProducts();
  // Function to determine if the screen is large
  const checkScreenSize = () => {
    const width = window.innerWidth;
    setIsLargeScreen(width >= 960); // 960px is the breakpoint for "lg"
  };

  // Update screen size on window resize
  useEffect(() => {
    checkScreenSize(); // Check initial screen size
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Define columns with responsive widths or flex
  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Name",
      ...(isLargeScreen
        ? { flex: 1 } // Use flex for large screens
        : { width: 200 }), // Use fixed width for other screens
    },
    {
      field: "weight",
      headerName: "Weight",
      ...(isLargeScreen
        ? { flex: 1 } // Use flex for large screens
        : { width: 120 }), // Use fixed width for other screens
    },
    {
      field: "price_USA",
      headerName: "Price",
      ...(isLargeScreen
        ? { flex: 1 } // Use flex for large screens
        : { width: 120 }), // Use fixed width for other screens
      valueFormatter: (value) => `$${value}`,
    },
  ];

  return (
    <Container
      sx={{
        maxHeight: "95vh",
        paddingBottom: "1rem",
        overflow: "auto",
      }}
    >
      <Paper elevation={3} sx={{ marginTop: "1rem", background: "#e8b9240f" }}>
        <Grid
          container
          spacing={0}
          sx={{
            alignItems: "center",
            maxHeight: "87vh",
            overflow: "auto",
            padding: "1rem",
            paddingTop: 0,
          }}
        >
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
              Inventory Details
            </Typography>
          </Grid>
          <Grid
            size={12}
            display={"flex"}
            sx={{ marginBottom: "1rem" }}
            justifyContent={"flex-end"}
          >
            <Button variant="outlined" onClick={() => {}}>
              Add Item
            </Button>
          </Grid>
          <Grid size={12}>
            <DataGrid
              sx={{ background: "white" }}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[10]}
              rows={productsData}
              columns={columns}
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default InventoryDetails;
