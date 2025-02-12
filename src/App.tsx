import { CssBaseline } from "@mui/material";
import Header from "./components/Header";
import Orders from "./components/Orders";
import InventoryDetails from "./components/InventoryDetails";

const App = () => {
  return (
    <>
      <CssBaseline />
      <Header />
      {/* <Orders /> */}
      <InventoryDetails />
    </>
  );
};

export default App;
