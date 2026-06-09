import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import { PaymentInfo } from "./data/fin_data";
import { dateTime, formatCurrency, formatDate } from "./utils";
import { useState } from "react";

const Findetails = ({
  total,
  paid,
  payments,
}: {
  total: number;
  paid: number;
  payments: PaymentInfo[];
}) => {
  const [show, setShow] = useState(false);
  const [showPayments, setShowPayments] = useState(false);
  const interestPayments = payments
    .filter((payment) => payment.paymentType?.toLowerCase() === "interest")
    .sort((a, b) => dateTime(b.dateOfPayment) - dateTime(a.dateOfPayment));

  return (
    <>
      <FormControl component="fieldset" variant="standard" sx={{ width: "100%" }}>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={show}
                onChange={() => setShow(!show)}
                name="gilad"
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "#176d74",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "#2ec4b6",
                  },
                }}
              />
            }
            label={
              <Typography sx={{ color: "#094252", fontWeight: 800 }}>
                Show Interest Info
              </Typography>
            }
          />
        </FormGroup>
      </FormControl>
      {show && (
        <Box
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: 2,
            boxShadow: "0 8px 22px rgba(9, 66, 82, 0.05)",
            padding: 1.5,
          }}
        >
          <Grid container spacing={1.5}>
            {[
              {
                icon: <TrendingUpOutlinedIcon fontSize="small" />,
                label: "Earned",
                value: formatCurrency(total),
              },
              {
                icon: <PaymentsOutlinedIcon fontSize="small" />,
                label: "Paid",
                value: formatCurrency(paid),
                isClickable: interestPayments.length > 0,
              },
              {
                icon: <AccountBalanceWalletOutlinedIcon fontSize="small" />,
                label: "Remaining",
                value: formatCurrency(total - paid),
              },
            ].map((item) => (
              <Grid size={{ xs: 12, sm: 4 }} key={item.label}>
                <Box
                  onClick={() => {
                    if (item.isClickable) {
                      setShowPayments(true);
                    }
                  }}
                  sx={{
                    backgroundColor: item.isClickable ? "#edf8f5" : "#f3f8fa",
                    borderRadius: 2,
                    cursor: item.isClickable ? "pointer" : "default",
                    height: "100%",
                    padding: 1.25,
                    transition: "transform 160ms ease, box-shadow 160ms ease",
                    "&:hover": item.isClickable
                      ? {
                          boxShadow: "0 8px 18px rgba(9, 66, 82, 0.1)",
                          transform: "translateY(-1px)",
                        }
                      : {},
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    sx={{ color: "#176d74", gap: 0.75, marginBottom: 0.75 }}
                  >
                    {item.icon}
                    <Typography
                      variant="caption"
                      sx={{ fontWeight: 800, textTransform: "uppercase" }}
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
          </Grid>
        </Box>
      )}
      <Dialog
        open={showPayments}
        onClose={() => setShowPayments(false)}
        maxWidth="sm"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: 3,
            overflow: "hidden",
          },
        }}
      >
        <DialogTitle
          sx={{
            background:
              "linear-gradient(135deg, #094252 0%, #176d74 58%, #2ec4b6 100%)",
            color: "white",
            fontWeight: 800,
          }}
        >
          <Stack direction="row" alignItems="center" sx={{ gap: 1 }}>
            <ReceiptLongOutlinedIcon />
            Interest Payments
          </Stack>
        </DialogTitle>
        <DialogContent dividers sx={{ backgroundColor: "#f8fbfc", padding: 2 }}>
          {interestPayments.length > 0 ? (
            <>
              <Box
                sx={{
                  backgroundColor: "white",
                  borderRadius: 2,
                  boxShadow: "0 8px 22px rgba(9, 66, 82, 0.05)",
                  marginBottom: 2,
                  padding: 2,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: "#0f6b4a",
                    display: "block",
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  Total interest paid
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: "#164236", fontWeight: 700, marginTop: 0.5 }}
                >
                  {formatCurrency(paid)}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {interestPayments.length} payment
                  {interestPayments.length === 1 ? "" : "s"} recorded
                </Typography>
              </Box>
              <TableContainer
                sx={{
                  backgroundColor: "white",
                  border: "1px solid #d9e8eb",
                  borderRadius: 2,
                  boxShadow: "0 8px 22px rgba(9, 66, 82, 0.05)",
                  overflow: "hidden",
                }}
              >
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#dfeaed" }}>
                      <TableCell sx={{ color: "#094252", fontWeight: 800 }}>
                        Payment date
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700 }}>
                        Amount
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {interestPayments.map((payment, index) => (
                      <TableRow
                        hover
                        key={`${dateTime(payment.dateOfPayment)}-${index}`}
                      >
                        <TableCell>
                          <Box
                            sx={{
                              alignItems: "center",
                              display: "flex",
                              gap: 1,
                            }}
                          >
                            <Typography sx={{ fontWeight: 600 }}>
                              {formatDate(payment.dateOfPayment)}
                            </Typography>
                            {index === 0 && (
                              <Chip
                                color="success"
                                label="Latest"
                                size="small"
                                variant="outlined"
                                sx={{ fontWeight: 700 }}
                              />
                            )}
                          </Box>
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ color: "#0b7a43", fontWeight: 700 }}
                        >
                          {formatCurrency(payment.amountPaid)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : (
            <Typography color="text.secondary">
              No interest payments have been recorded.
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "#f8fbfc", padding: 2 }}>
          <Button
            onClick={() => setShowPayments(false)}
            variant="contained"
            sx={{ borderRadius: 2, boxShadow: "none", fontWeight: 800 }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Findetails;
