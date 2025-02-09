import { Box, Button } from "@mui/material";

const Herosection = () => {
  return (
    <Box
      sx={{
        fontSize: "2.2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        backgroundColor: "#e8b92414",
        // borderBottom: "1px solid #e8b924",
      }}
    >
      This is Hero Section
      <Button sx={{ marginTop: "1rem" }} variant="outlined">
        View all Items
      </Button>
    </Box>
  );
};

export default Herosection;
