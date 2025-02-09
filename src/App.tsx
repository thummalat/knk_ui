import { CssBaseline } from "@mui/material";
import Header from "./components/Header";
import Orders from "./components/Orders";

const App = () => {
  return (
    <>
      <CssBaseline />
      <Header />
      <Orders />
      {/* <Herosection />
      <Discountsection />
      <Newarrivalsection /> */}
    </>
  );
};

export default App;
