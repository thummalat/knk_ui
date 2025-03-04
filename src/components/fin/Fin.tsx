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
import { useState, useMemo } from "react";

import finData, { TFinData } from "./data/fin_data";

const calculateFinData = (finDetails: TFinData | null) => {
  if (!finDetails) return { data: [], sumAmount: 0 };

  const data = Object.keys(finDetails).map((key) => {
    const { interestInfo } = finDetails[key];
    const principal = interestInfo.reduce((acc, curr) => acc + curr.amountOwed, 0);
    return { ...finDetails[key], principal };
  });

  const sumAmount = data.reduce((acc, curr) => acc + curr.principal, 0);

  return { data, sumAmount };
};

const formatCurrency = (input: number) => {
  return new Intl.NumberFormat("en-IN").format(input);
};

const formatDate = (date: Date): string => {
  return date
    .toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric", timeZone: "UTC" })
    .toUpperCase();
};

const Fin = () => {
  const [showFinDetails, setShowFinDetails] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [finDetails] = useState<TFinData | null>(finData);

  const { data, sumAmount } = useMemo(() => calculateFinData(finDetails), [finDetails]);

  const handlePasscodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      <Grid container spacing={3} sx={{ padding: "1rem", justifyContent: "center" }}>
        <Grid size={{ xs: 6, sm: 3 }}>
          <TextField
            fullWidth
            type="password"
            id="passcode"
            value={passcode}
            label="Enter Passcode"
            onChange={handlePasscodeChange}
            name="passcode"
          />
        </Grid>
        <Grid size={2} sx={{ alignContent: "center", justifyItems: "center"  }}>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>

        {showFinDetails && data.length > 0 && (
          <>
            <Grid size={12}>
              <Typography variant="h6" sx={{ color: "#97040b", fontWeight: 700 }}>
                Total Amount: ₹{formatCurrency(sumAmount)}
              </Typography>
            </Grid>
            {data.map((d, index) => (
              <Grid size={12} key={index}>
                <Card variant="outlined" sx={{ backgroundColor: "#85b7c614" }}>
                  <CardContent>
                    <Typography sx={{ fontSize: "1.4rem", fontWeight: 600, color: "#094252" }}>
                      {d.name}
                    </Typography>

                    <Grid container sx={{ marginTop: "1rem" }} spacing={2}>
                      <Grid size={12} sx={{ marginBottom: "1rem" }}>
                        <Box sx={{ color: "#03894b", fontWeight: 500, fontSize: "1.2rem" }}>
                          Principal: ₹{formatCurrency(d.principal)}
                        </Box>
                      </Grid>
                      {d.interestInfo.map((info, i) => (
                        <Grid size={{ xs: 12, sm: 6 }} key={i} sx={{ backgroundColor: "#c4dfce4a", padding: "1rem" }}>
                          <Box>Amount Owed To Me: ₹{formatCurrency(info.amountOwed)}</Box>
                          <Box>Interest: {info.interest}%</Box>
                          <Box>
                            Date Borrowed: {info.dateBorrowed ? formatDate(info.dateBorrowed) : "N/A"}
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </Paper>
  );
};

export default Fin;
