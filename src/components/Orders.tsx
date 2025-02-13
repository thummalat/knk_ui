import { Button, Container, Paper, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import AddOrderDetails from "./orders/AddOrderDetails";
import { useFetchOrders } from "../hooks/useFetchOrders";

const Orders = () => {
  const [openAddOrderDialog, setOpenAddOrderDialog] = useState(false);
  const { data: ordersData, isLoading } = useFetchOrders();
  const [isLargeScreen, setIsLargeScreen] = useState(false);
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

  const columns: GridColDef[] = [
    {
      field: "customer_name",
      headerName: "Customer Name",
      ...(isLargeScreen
        ? { flex: 1 } // Use flex for large screens
        : { width: 200 }), // Use fixed width for other screens
    },
    {
      field: "quantities_sold",
      headerName: "# Sold",
      ...(isLargeScreen
        ? { flex: 1 } // Use flex for large screens
        : { width: 120 }), // Use fixed width for other screens
    },
    {
      field: "sold_price",
      headerName: "Price",
      ...(isLargeScreen
        ? { flex: 1 } // Use flex for large screens
        : { width: 120 }), // Use fixed width for other screens
      valueFormatter: (value) => `$${value}`,
    },
  ];

  const closeOrderDetailsDialog = () => {
    setOpenAddOrderDialog(false);
  };

  const addNewOrder = () => {
    setOpenAddOrderDialog(true);
  };
  return (
    <Container
      sx={{
        paddingBottom: "1rem",
      }}
    >
      <Paper elevation={3} sx={{ marginTop: "1rem", background: "#e8b9240f" }}>
        <Grid
          container
          spacing={0}
          sx={{
            alignItems: "center",
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
              Orders Details
            </Typography>
          </Grid>
          <Grid size={6}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "400",
                marginBlock: "1rem",
              }}
            >
              Total Sold : {`$${ordersData?.totalSoldCost}`}
            </Typography>
          </Grid>
          <Grid size={6} display={"flex"} justifyContent={"flex-end"}>
            <Button variant="outlined" onClick={addNewOrder}>
              Add
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
              rows={ordersData?.soldProductDetails}
              columns={columns}
            />
          </Grid>
        </Grid>
        <AddOrderDetails
          open={openAddOrderDialog}
          closeCallBack={closeOrderDetailsDialog}
        />
      </Paper>
    </Container>
  );
};

export default Orders;
