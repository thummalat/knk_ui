import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
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
          Financial Details
        </Typography>
      </Box>
      <Grid
        container
        spacing={2}
        sx={{ padding: "1rem", justifyContent: "center" }}
      >
        <Grid size={{ xs: 6, sm: 3 }}>
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
              <Card sx={{backgroundColor:"#85b7c614"}}>
                <CardContent>
                  <Typography
                    sx={{
                      fontSize: "1.4rem",
                      fontWeight: 600,
                      color: "#094252",
                    }}
                    component="div"
                  >
                    Praveen
                    <Divider sx={{marginTop:"1rem"}} />
                  </Typography>
                  <Grid container sx={{ marginTop: "1rem" }} spacing={2}>
                    <Grid size={12} sx={{marginBottom:"1rem"}}>
                      <Box sx={{color:"#03894b", fontWeight:500, fontSize:"1.2rem"}}>Principal: &#8377;1900000</Box>
                      
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }} sx={{backgroundColor:"#c4dfce4a", padding:"1rem"}}>
                      
                        <Box>Amount Owed To Me: &#8377;1000000</Box>
                        <Box> Interest: 6%</Box>
                        <Box> Date Borrowed: Jan-01-2024</Box>
                      
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }} sx={{backgroundColor:"#c4dfce4a", padding:"1rem"}}>
                     
                        <Box>Amount Owed To Me: &#8377;900000</Box>
                        <Box> Interest: 8%</Box>
                        <Box> Date Borrowed: Aug-14-2024</Box>
                      
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={12}>
              <Card sx={{backgroundColor:"#85b7c614"}}>
                <CardContent>
                  <Typography
                    sx={{
                      fontSize: "1.4rem",
                      fontWeight: 600,
                      color: "#094252",
                    }}
                    component="div"
                  >
                    Dinesh
                    <Divider sx={{marginTop:"1rem"}} />
                  </Typography>
                  <Grid container sx={{ marginTop: "1rem" }} spacing={2}>
                    <Grid size={12} sx={{marginBottom:"1rem"}}>
                      <Box sx={{color:"#03894b", fontWeight:500, fontSize:"1.2rem"}}>Principal: &#8377;1500000</Box>
                      
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }} sx={{backgroundColor:"#c4dfce4a", padding:"1rem"}}>
                      
                        <Box>Amount Owed To Me: &#8377;1000000</Box>
                        <Box> Interest: 6%</Box>
                        <Box> Date Borrowed: Aug-05-2024</Box>
                      
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }} sx={{backgroundColor:"#c4dfce4a", padding:"1rem"}}>
                     
                        <Box>Amount Owed To Me: &#8377;500000</Box>
                        <Box> Interest: 8%</Box>
                        <Box> Date Borrowed: Aug-05-2024</Box>
                      
                    </Grid>

                    
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={12}>
              <Card sx={{backgroundColor:"#85b7c614"}}>
                <CardContent>
                  <Typography
                    sx={{
                      fontSize: "1.4rem",
                      fontWeight: 600,
                      color: "#094252",
                    }}
                    component="div"
                  >
                    Rajesh
                    <Divider sx={{marginTop:"1rem"}} />
                  </Typography>
                  <Grid container sx={{ marginTop: "1rem" }} spacing={2}>
                    <Grid size={12} sx={{marginBottom:"1rem"}}>
                      <Box sx={{color:"#03894b", fontWeight:500, fontSize:"1.2rem"}}>Principal: &#8377;1000000</Box>
                      
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }} sx={{backgroundColor:"#c4dfce4a", padding:"1rem"}}>
                        <Box>Amount Owed To Me: &#8377;1000000</Box>
                        <Box> Interest: 12%</Box>
                        <Box> Date Borrowed: Aug-26-2024</Box>
                    </Grid>      
                  </Grid>
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
