import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid2";
import axios from "axios";
import { useEffect, useState } from "react";

interface IAddOrderDetails {
  open: boolean;
  closeCallBack: () => void;
}

interface IProduct {
  _id: string;
  title: string;
  price_USA: string;
  weight: number;
  sku: string;
}

export default function AddOrderDetails({
  open,
  closeCallBack,
}: IAddOrderDetails) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("https://knk-two.vercel.app/api/getproducts").then(({ data }) => {
      setProducts(data);
    });
  }, []);
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
            <Grid size={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Product</InputLabel>
                <Select fullWidth label="Product">
                  {products.map((product: IProduct) => (
                    <MenuItem value={product.sku} key={product.sku}>
                      {product.title}
                    </MenuItem>
                  ))}
                  <MenuItem value={"sample"}>sample</MenuItem>
                </Select>
              </FormControl>
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
