import { AppBar, Box, CssBaseline, Toolbar } from "@mui/material";
import { Button, Container, Typography } from "@mui/material";
import Header from "./components/Header";
import Herosection from "./components/Herosection";
import Discountsection from "./components/Discountsections";
import Newarrivalsection from "./components/Newarrivalsection";
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
