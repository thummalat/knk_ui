import { CssBaseline } from "@mui/material";
import Header from "./components/Header";

import InventoryDetails from "./components/inventory/InventoryDetails";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Orders from "./components/orders/Orders";

const App = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Header />
      <Routes>
        <Route path="/" element={<InventoryDetails />}></Route>
        <Route path="/orders" element={<Orders />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
