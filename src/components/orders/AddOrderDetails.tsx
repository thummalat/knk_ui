import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid2";

interface IAddOrderDetails {
  open: boolean;
  closeCallBack: () => void;
}

export default function AddOrderDetails({
  open,
  closeCallBack,
}: IAddOrderDetails) {
  const handleClose = () => {
    closeCallBack();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Order Details</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter new order details
          <Grid container spacing={2} sx={{ paddingTop: "1rem" }}>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Customer Name"
                name="cusotmerName"
              ></TextField>
            </Grid>
            <Grid size={6}>
              <TextField
                fullWidth
                type="number"
                label="# Sold"
                name="quantitiesSold"
              ></TextField>
            </Grid>
            <Grid size={6}>
              <TextField
                fullWidth
                type="number"
                label="Sold Price"
                name="soldPrice"
              ></TextField>
            </Grid>
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button type="submit" variant="contained">
          Save
        </Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
