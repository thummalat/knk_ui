import { Button, Container, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useFetchProducts } from "../../hooks/useFetchProducts";
import { useEffect, useState } from "react";
import ViewDetailsDialog, {
  IViewDetailsMetaData,
} from "../common/ViewDetailsDialog";
import BestSellers from "./BestSellers";

const InventoryDetails = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [openViewDetails, setOpenViewDetails] = useState(false);
  const [selectedRowData, setSelectedRowData] =
    useState<IViewDetailsMetaData | null>(null);
  const { isLoading, data: productsData } = useFetchProducts();
  // Function to determine if the screen is large
  const checkScreenSize = () => {
    const width = window.innerWidth;
    setIsLargeScreen(width >= 960);
  };
  const handleViewDetailsClick = (params: any) => {
    const { id, _id, ...metaData } = params.row;
    setSelectedRowData({
      title: metaData.title,
      metaData,
    });
    setOpenViewDetails(true);
  };
  // Update screen size on window resize
  useEffect(() => {
    checkScreenSize(); // Check initial screen size
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

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
    {
      field: "actions",
      headerName: "Actions",
      ...(isLargeScreen
        ? { flex: 1 } // Use flex for large screens
        : { width: 150 }), // Use fixed width for other screens
      renderCell: (params: any) => (
        <Button
          onClick={() => {
            handleViewDetailsClick(params);
          }}
        >
          View Details
        </Button>
      ),
    },
  ];

  return (
    <Container
      sx={{
        paddingBottom: "1rem",
      }}
    >
      <Paper elevation={3} sx={{ marginTop: "1rem", background: "white" }}>
        <Grid
          container
          spacing={0}
          sx={{
            alignItems: "center",
            padding: "1rem",
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
      <BestSellers />
      <ViewDetailsDialog
        data={selectedRowData}
        open={openViewDetails}
        closeCallBack={() => setOpenViewDetails(false)}
      />
    </Container>
  );
};

export default InventoryDetails;
