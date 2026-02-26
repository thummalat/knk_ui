import {
  Box,
  Button,
  Card,
  CardContent,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState, useMemo } from "react";

import finData, { TFinData } from "./data/fin_data";
import { daysFromToday, formatCurrency } from "./utils";
import Borrowbox from "./borrow/Borrowbox";
import Findetails from "./Findetails";

const calculateFinData = (finDetails: TFinData | null) => {
  if (!finDetails) return { data: [], sumAmount: 0 };

  const DAYS_IN_YEAR = 365;

  const data = Object.keys(finDetails).map((key) => {
    const { interestInfo, paymentInfo, ...otherDetails } = finDetails[key];

    const updatedInterestInfo = interestInfo.map((info) => ({
      ...info,
      interestEarned: Math.floor(
        (info.amountOwed * info.interest * daysFromToday(info.dateBorrowed)) /
          (100 * DAYS_IN_YEAR),
      ),
    }));

    const principal = updatedInterestInfo.reduce(
      (total, { amountOwed }) => total + amountOwed,
      0,
    );
    const totalInterestedEarned = updatedInterestInfo.reduce(
      (total, { interestEarned }) => total + interestEarned,
      0,
    );
    const totalInterestedPaid = paymentInfo
      .filter((p) => p.paymentType === "interest")
      .reduce((total, { amountPaid }) => total + amountPaid, 0);

    return {
      paymentInfo,
      interestInfo: updatedInterestInfo,
      ...otherDetails,
      principal,
      totalInterestedEarned,
      totalInterestedPaid,
    };
  });

  const sumAmount = data.reduce((total, { principal }) => total + principal, 0);

  return { data, sumAmount };
};

const Fin = () => {
  const [showFinDetails, setShowFinDetails] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [finDetails] = useState<TFinData | null>(finData);
  const [showHeaderAmountDetails, setShowHeaderAmountDetails] = useState(false);

  const { data, sumAmount } = useMemo(
    () => calculateFinData(finDetails),
    [finDetails],
  );

  const totalInterestEarnedOverall = data.reduce((sum, item) => {
    return sum + (item.totalInterestedEarned || 0);
  }, 0);

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
      <Grid
        container
        spacing={3}
        sx={{ padding: "1rem", justifyContent: "center" }}
      >
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
        <Grid size={2} sx={{ alignContent: "center", justifyItems: "center" }}>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>

        {showFinDetails && data.length > 0 && (
          <>
            <Grid sx={{ backgroundColor: "#dfeaed" }} size={12}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                sx={{ gap: 2, p: 2 }}
              >
                <Typography variant="h6" style={{ color: "purple" }}>
                  {" "}
                  Total AmountOverall (Principle+Interest):{" "}
                  {formatCurrency(sumAmount + totalInterestEarnedOverall)}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => setShowHeaderAmountDetails(!showHeaderAmountDetails)}
                >
                  {showHeaderAmountDetails?"Hide Details" :"Show details"}
                </Button>
              </Stack>
              {showHeaderAmountDetails && (
                <Stack sx={{p:2, gap:3, borderTop:"1px solid gray"}} direction={"row"}>
                  <Typography style={{ color: "blue", fontWeight:500 }}>
                    {" "}
                    Total Principal Amount: {formatCurrency(sumAmount)}
                  </Typography>
                  <Typography  style={{ color: "green", fontWeight:500 }}>
                    {" "}
                    Total Interest Earned:{" "}
                    {formatCurrency(totalInterestEarnedOverall)}
                  </Typography>
                </Stack>
              )}
            </Grid>
            {data.map((d, index) => (
              <Grid size={12} key={index}>
                <Card variant="outlined" sx={{ backgroundColor: "#85b7c614" }}>
                  <CardContent>
                    <Typography
                      sx={{
                        fontSize: "1.4rem",
                        fontWeight: 600,
                        color: "#094252",
                      }}
                    >
                      {d.name}
                    </Typography>

                    <Grid container sx={{ marginTop: "1rem" }} spacing={2}>
                      <Grid size={12}>
                        <Box
                          sx={{
                            color: "#03894b",
                            fontWeight: 500,
                            fontSize: "1.2rem",
                          }}
                        >
                          Principal: {formatCurrency(d.principal)}
                        </Box>
                      </Grid>
                      <Grid size={12}>
                        <Findetails
                          total={d.totalInterestedEarned}
                          paid={d.totalInterestedPaid}
                        />
                      </Grid>
                      {d.interestInfo.map((info, i) => (
                        <Borrowbox info={info} />
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
