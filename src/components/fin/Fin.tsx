import {
  Box,
  Button,
  Card,
  CardContent,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";

const Fin = () => {
  const [showFinDetails, setShowFinDetails] = useState(false);
  const [passcode, setPasscode] = useState("");
  const passcodeChangeHandler = (e: any) => {
    setPasscode(e.target.value);
  };
  const handleSubmit = () => {
    setShowFinDetails(passcode === "1234");
  };
  return (
    <Paper elevation={2} sx={{ marginTop: "1rem", background: "white" }}>
      <Box sx={{ backgroundColor: "#2ec4b6", paddingBlock: "0.1rem" }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "700",
            marginBlock: "1rem",
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          Financials
        </Typography>
      </Box>
      <Grid
        container
        spacing={2}
        sx={{ padding: "1rem", justifyContent: "center" }}
      >
        <Grid size={3}>
          <TextField
            fullWidth
            type="password"
            id="passcode"
            value={passcode}
            label="Enter Passcode"
            onChange={passcodeChangeHandler}
            name="passcode"
          ></TextField>
        </Grid>
        <Grid size={2} sx={{ alignContent: "center", justifyItems: "center" }}>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
        {showFinDetails && (
          <>
            <Grid size={12}>
              <Card variant="outlined">
                <CardContent>
                  <Typography
                    sx={{ fontSize: "1.2rem", fontWeight: 500 }}
                    component="div"
                  >
                    Praveen
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={12}>
              <Card variant="outlined">
                <CardContent>
                  <Typography
                    sx={{ fontSize: "1.2rem", fontWeight: 500 }}
                    component="div"
                  >
                    Dinesh
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={12}>
              <Card variant="outlined">
                <CardContent>
                  <Typography
                    sx={{ fontSize: "1.2rem", fontWeight: 500 }}
                    component="div"
                  >
                    Rajesh
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </>
        )}
      </Grid>
    </Paper>
  );
};
export default Fin;
