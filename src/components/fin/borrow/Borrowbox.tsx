import { Box, Divider } from "@mui/material";
import {
  daysFromToday,
  formatCurrency,
  formatDate,
  monthsAndDaysFromToday,
} from "../utils";
import { InterestInfo } from "../data/fin_data";
import Grid from "@mui/material/Grid2";

const Borrowbox = ({ info }: { info: InterestInfo }) => {
  return (
    <Grid
      size={{ xs: 12, sm: 6 }}
      sx={{ backgroundColor: "#c4dfce4a", padding: "1rem", fontWeight: 500 }}
    >
      <Box>Amount Owed To Me: {formatCurrency(info.amountOwed)}</Box>
      <Box>Interest: {info.interest}%</Box>
      <Box>
        Date Borrowed:
        {info.dateBorrowed ? formatDate(info.dateBorrowed) : "N/A"}
      </Box>
      <Box>Duration: {monthsAndDaysFromToday(info.dateBorrowed)}</Box>
      <Box>Number of days: {daysFromToday(info.dateBorrowed)}</Box>
      <Box
        sx={{
          padding: "1rem",
          fontSize: "0.9rem",
          color: "gray",

          background: "white",
          marginTop: "1rem",
        }}
      >
        <Box>
          Total Interest Earned: <strong>{formatCurrency(info.interestEarned || 0)}</strong>
        </Box>
        <Box>
          Interest Earned per day:
          {formatCurrency(parseFloat((
            parseFloat(
              ((info.amountOwed * info.interest * 365) / (100 * 365)).toFixed(2)
            ) / 365
          ).toFixed(3)))}
        </Box>
        <Box>
          Interest Earned per month:
          {formatCurrency(parseFloat(
            ((info.amountOwed * info.interest * 365) / (100 * 365)).toFixed(2)
          ) / 12)}
        </Box>
      </Box>
      {info.remarks && (
        <>
          <Divider sx={{ marginBlock: "1rem" }} />
          <Box
            sx={{
              fontSize: "0.9rem",
              color: "#97040b",
              fontWeight: 500,
              fontStyle: "italic",
            }}
          >
            Remarks: {info.remarks}
          </Box>
        </>
      )}
    </Grid>
  );
};

export default Borrowbox;
