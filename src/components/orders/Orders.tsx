import React, { useEffect, useState } from "react";
import { Button, Container, Paper, Skeleton, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid2";
import { useFetchOrders } from "../../hooks/useFetchOrders";
import { useFetchProducts } from "../../hooks/useFetchProducts";
import AddOrderDetails from "./AddOrderDetails";
import ViewDetailsDialog, {
  IViewDetailsMetaData,
} from "../common/ViewDetailsDialog";

// Define types for better type safety
interface Product {
  sku: string;
  title: string;
}

interface Order {
  id: string;
  _id: string;
  customer_name: string;
  sold_price: number | string;
  quantities_sold: number | string;
  sku: string;
}

const Orders: React.FC = () => {
  // State management
  const [openAddOrderDialog, setOpenAddOrderDialog] = useState(false);
  const [openViewDetails, setOpenViewDetails] = useState(false);
  const [selectedRowData, setSelectedRowData] =
    useState<IViewDetailsMetaData | null>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [productMap, setProductMap] = useState<Record<string, string> | null>(
    null
  );

  // Fetch data
  const { data: ordersData, isLoading: isOrdersLoading } = useFetchOrders();
  const { data: productsData, isLoading: isProductsLoading } =
    useFetchProducts();

  // Process productsData to create a SKU-to-title map
  useEffect(() => {
    if (productsData && productsData.length > 0) {
      const map = productsData.reduce(
        (acc: Record<string, string>, product: Product) => {
          acc[product.sku] = product.title;
          return acc;
        },
        {}
      );
      setProductMap(map);
    }
  }, [productsData]);

  // Handle view details button click
  const handleViewDetailsClick = (params: { row: Order }) => {
    if (!productMap) {
      console.error("Product data is not yet available.");
      return;
    }

    const { id, _id, ...metaData } = params.row;
    const { sold_price = 0, quantities_sold = 0, sku = "" } = metaData;

    const _metaData = {
      ...metaData,
      "Product Name": productMap[sku] || "Unknown Product",
      "Total amount":
        parseFloat(sold_price as string) *
        parseFloat(quantities_sold as string),
    };

    setSelectedRowData({
      title: `${metaData.customer_name} Order`,
      metaData: _metaData,
    });
    setOpenViewDetails(true);
  };

  // Handle screen size changes
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 960); // 960px is the breakpoint for "lg"
    };

    checkScreenSize(); // Initial check
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Define columns for the DataGrid
  const columns: GridColDef[] = [
    {
      field: "customer_name",
      headerName: "Customer Name",
      ...(isLargeScreen ? { flex: 1 } : { width: 200 }),
    },
    {
      field: "quantities_sold",
      headerName: "# Sold",
      ...(isLargeScreen ? { flex: 1 } : { width: 120 }),
    },
    {
      field: "sold_price",
      headerName: "Price",
      ...(isLargeScreen ? { flex: 1 } : { width: 120 }),
      valueFormatter: (value) => `$${value}`,
    },
    {
      field: "actions",
      headerName: "Actions",
      ...(isLargeScreen ? { flex: 1 } : { width: 150 }),
      renderCell: (params) => (
        <Button
          onClick={() => handleViewDetailsClick(params)}
          disabled={!productMap}
        >
          View Details
        </Button>
      ),
    },
  ];

  // Render loading skeleton if data is being fetched
  if (isOrdersLoading || isProductsLoading) {
    return <Skeleton variant="rectangular" height={400} />;
  }

  return (
    <Container sx={{ paddingBottom: "1rem" }}>
      <Paper elevation={3} sx={{ marginTop: "1rem", background: "white" }}>
        <Grid
          container
          spacing={0}
          sx={{ alignItems: "center", padding: "1rem", paddingTop: 0 }}
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
              sx={{ fontWeight: "400", marginBlock: "1rem" }}
            >
              Total Sold: {`$${ordersData?.totalSoldCost}`}
            </Typography>
          </Grid>
          <Grid size={6} display="flex" justifyContent="flex-end">
            <Button
              variant="outlined"
              onClick={() => setOpenAddOrderDialog(true)}
            >
              Add
            </Button>
          </Grid>
          <Grid size={12}>
            <DataGrid
              sx={{ background: "white" }}
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
              }}
              pageSizeOptions={[10]}
              rows={ordersData?.soldProductDetails || []}
              columns={columns}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Dialogs */}
      <AddOrderDetails
        open={openAddOrderDialog}
        closeCallBack={() => setOpenAddOrderDialog(false)}
      />
      <ViewDetailsDialog
        data={selectedRowData}
        open={openViewDetails}
        closeCallBack={() => setOpenViewDetails(false)}
      />
    </Container>
  );
};

export default Orders;
