import { Container, CssBaseline } from "@mui/material";
import Header from "./components/Header";

import InventoryDetails from "./components/inventory/InventoryDetails";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Orders from "./components/orders/Orders";
import Fin from "./components/fin/Fin";

const App = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Header />
      <Container
        sx={{
          paddingBottom: "1rem",
        }}
      >
        <Routes>
          <Route path="/" element={<InventoryDetails />}></Route>
          <Route path="/orders" element={<Orders />}></Route>
          <Route path="/fin" element={<Fin />}></Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
