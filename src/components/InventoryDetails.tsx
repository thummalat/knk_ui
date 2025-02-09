import { Button, Container, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", flex: 1 },
  { field: "weight", headerName: "Weight", flex: 1 },
  {
    field: "quantity",
    headerName: "Quantity",
    flex: 1,
  },
];

const InventoryDetails = () => {
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
              rows={[]}
              columns={columns}
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default InventoryDetails;
