import { CssBaseline } from "@mui/material";
import Header from "./components/Header";
import Orders from "./components/Orders";
import InventoryDetails from "./components/InventoryDetails";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
