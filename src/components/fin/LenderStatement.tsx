import {
  Box,
  Button,
  Card,
  CardContent,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import { Link as RouterLink, useParams } from "react-router-dom";

import Borrowbox from "./borrow/Borrowbox";
import finData from "./data/fin_data";
import Findetails from "./Findetails";
import {
  calculatePersonFinData,
  dateTime,
  formatCurrency,
  formatDate,
  lenderSlug,
} from "./utils";

const LenderStatement = () => {
  const { lenderId } = useParams();
  const matchedEntry = Object.entries(finData).find(([key, person]) =>
    [key, person.name].some((value) => lenderSlug(value) === lenderId),
  );

  if (!matchedEntry) {
    return (
      <Paper
        elevation={0}
        sx={{
          backgroundColor: "#f3f8fa",
          minHeight: "calc(100vh - 60px)",
          padding: { xs: 1.5, sm: 3 },
        }}
      >
        <Card sx={{ borderRadius: 0, boxShadow: "none" }}>
          <CardContent>
            <Typography sx={{ color: "#094252", fontWeight: 900 }} variant="h5">
              Statement not found
            </Typography>
            <Typography color="text.secondary" sx={{ marginTop: 1 }}>
              The requested lending statement link does not match an active
              record.
            </Typography>
            <Button
              component={RouterLink}
              startIcon={<ArrowBackOutlinedIcon />}
              sx={{ borderRadius: 0, fontWeight: 800, marginTop: 2 }}
              to="/fin"
              variant="contained"
            >
              Back to Finance
            </Button>
          </CardContent>
        </Card>
      </Paper>
    );
  }

  const personData = calculatePersonFinData(matchedEntry[1]);
  const interestPayments = personData.paymentInfo
    .filter((payment) => payment.paymentType?.toLowerCase() === "interest")
    .sort((a, b) => dateTime(b.dateOfPayment) - dateTime(a.dateOfPayment));
  const latestPayment = interestPayments[0];

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: "#f3f8fa",
        borderTop: 0,
        minHeight: "calc(100vh - 60px)",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#243b53",
          color: "white",
          padding: { xs: 1.5, sm: 3 },
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
          sx={{ gap: { xs: 1, sm: 2 } }}
        >
          <Box>
            <Typography
              sx={{
                color: "rgba(255, 255, 255, 0.76)",
                fontSize: { xs: "0.75rem", sm: "0.86rem" },
                fontWeight: 800,
                textTransform: "uppercase",
              }}
            >
              Loan Statement
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "1.35rem", sm: "1.8rem" },
                fontWeight: 900,
                lineHeight: 1.1,
                marginTop: 0.4,
              }}
              variant="h4"
            >
              {personData.name}
            </Typography>
            <Typography
              sx={{
                color: "rgba(255, 255, 255, 0.78)",
                fontSize: { xs: "0.82rem", sm: "0.95rem" },
                marginTop: { xs: 0.35, sm: 0.65 },
              }}
            >
              Current lending details and recorded interest payments
            </Typography>
          </Box>
          <Button
            component={RouterLink}
            startIcon={<ArrowBackOutlinedIcon />}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.12)",
              borderColor: "rgba(255, 255, 255, 0.35)",
              borderRadius: 0,
              color: "white",
              fontWeight: 800,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.18)",
                borderColor: "rgba(255, 255, 255, 0.5)",
              },
            }}
            to="/fin"
            variant="outlined"
          >
            Back
          </Button>
        </Stack>
      </Box>

      <Box sx={{ padding: { xs: 1, sm: 2 } }}>
        <Grid container spacing={{ xs: 1, sm: 2 }}>
          {[
            {
              icon: <AccountBalanceWalletOutlinedIcon fontSize="small" />,
              label: "Amount Owed",
              value: formatCurrency(personData.principal),
            },
            {
              icon: <PaymentsOutlinedIcon fontSize="small" />,
              label: "Interest Paid",
              value: formatCurrency(personData.totalInterestedPaid),
            },
            {
              icon: <ReceiptLongOutlinedIcon fontSize="small" />,
              label: "Latest Payment",
              value: latestPayment
                ? `${formatCurrency(latestPayment.amountPaid)} on ${formatDate(
                    latestPayment.dateOfPayment,
                  )}`
                : "No payments recorded",
            },
          ].map((item) => (
            <Grid size={{ xs: 12, md: 4 }} key={item.label}>
              <Box
                sx={{
                  backgroundColor: "#ffffff",
                  boxShadow: "0 6px 18px rgba(9, 66, 82, 0.05)",
                  height: "100%",
                  padding: { xs: 1.25, sm: 1.75 },
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  sx={{ color: "#185c37", gap: 0.75, marginBottom: 0.75 }}
                >
                  {item.icon}
                  <Typography
                    sx={{
                      color: "#5a7177",
                      fontSize: "0.72rem",
                      fontWeight: 800,
                      textTransform: "uppercase",
                    }}
                  >
                    {item.label}
                  </Typography>
                </Stack>
                <Typography sx={{ color: "#094252", fontWeight: 900 }}>
                  {item.value}
                </Typography>
              </Box>
            </Grid>
          ))}

          <Grid size={12}>
            <Card
              elevation={0}
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: 0,
                boxShadow: "0 6px 18px rgba(9, 66, 82, 0.05)",
              }}
            >
              <CardContent sx={{ padding: { xs: 1.25, sm: 2 } }}>
                <Stack direction="row" alignItems="center" sx={{ gap: 1 }}>
                  <PersonOutlineOutlinedIcon sx={{ color: "#185c37" }} />
                  <Box>
                    <Typography sx={{ color: "#094252", fontWeight: 900 }}>
                      Interest Summary
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      Interest paid, earned, and remaining
                    </Typography>
                  </Box>
                </Stack>
                <Box sx={{ marginTop: 1.5 }}>
                  <Findetails
                    defaultShow
                    paid={personData.totalInterestedPaid}
                    payments={personData.paymentInfo}
                    total={personData.totalInterestedEarned}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={12}>
            <Card
              elevation={0}
              sx={{
                backgroundColor: "#ffffff",
                border: "1px solid #d9e8de",
                borderLeft: "6px solid #185c37",
                borderRadius: 0,
                boxShadow: "0 14px 34px rgba(9, 66, 82, 0.12)",
                overflow: "hidden",
              }}
            >
              <CardContent sx={{ padding: 0 }}>
                <Box
                  sx={{
                    backgroundColor: "#eef7f1",
                    borderBottom: "1px solid #d9e8de",
                    color: "#094252",
                    padding: { xs: 1.25, sm: 2 },
                  }}
                >
                  <Typography
                    sx={{
                      color: "#185c37",
                      fontSize: { xs: "0.95rem", sm: "1.08rem" },
                      fontWeight: 900,
                      textTransform: "uppercase",
                    }}
                  >
                    Active Loan Details
                  </Typography>
                  <Typography
                    sx={{
                      color: "#5a7177",
                      fontSize: { xs: "0.78rem", sm: "0.9rem" },
                      marginTop: 0.3,
                    }}
                  >
                    {personData.interestInfo.length} loan
                    {personData.interestInfo.length === 1 ? "" : "s"} tracked
                  </Typography>
                </Box>
                <Box sx={{ backgroundColor: "#f8fbfc", padding: { xs: 1, sm: 2 } }}>
                  <Grid container spacing={{ xs: 1, sm: 1.5 }}>
                    {personData.interestInfo.map((info, index) => (
                      <Borrowbox
                        info={info}
                        key={`${personData.name}-${index}`}
                      />
                    ))}
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default LenderStatement;
