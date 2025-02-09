import { Button, Container, Paper, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid2";
import AddOrderDetails from "./orders/AddOrderDetails";

interface Column {
  id: "customer_name" | "quantities_sold" | "sold_price";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: GridColDef[] = [
  { field: "customer_name", headerName: "Customer Name", flex: 1 },
  { field: "quantities_sold", headerName: "Quantities Sold", flex: 1 },
  {
    field: "sold_price",
    headerName: "Sold Price",
    flex: 1,
    valueFormatter: (value) => `$${value}`,
  },
];
const Orders = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [totalSold, setTotalSold] = useState(0);
  const [openAddOrderDialog, setOpenAddOrderDialog] = useState(false);

  const rows: any = [];
  useEffect(() => {
    axios
      .get("https://knk-two.vercel.app/api/getallorders")
      .then(({ data }) => {
        const { totalSoldCost, soldProductDetails } = data;
        const rows = soldProductDetails.map((product: any) => ({
          id: product._id,
          ...product,
        }));
        setOrdersData(rows);
        setTotalSold(totalSoldCost);
      });
  }, []);

  const closeOrderDetailsDialog = () => {
    setOpenAddOrderDialog(false);
  };

  const addNewOrder = () => {
    setOpenAddOrderDialog(true);
  };
  return (
    <Container
      sx={{
        maxHeight: "80vh",
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
            maxHeight: "70vh",
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
              Total Sold : {`$${totalSold}`}
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
              rows={ordersData}
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
