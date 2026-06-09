import {
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import NotesOutlinedIcon from "@mui/icons-material/NotesOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import { useState, useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";

import finData, { otherFinData, TFinData } from "./data/fin_data";
import {
  calculatePersonFinData,
  formatCurrency,
  formatDate,
  lenderSlug,
} from "./utils";
import Borrowbox from "./borrow/Borrowbox";
import Findetails from "./Findetails";

const calculateFinData = (finDetails: TFinData | null) => {
  if (!finDetails) return { data: [], sumAmount: 0 };

  const data = Object.keys(finDetails).map((key) =>
    calculatePersonFinData(finDetails[key]),
  );

  const sumAmount = data.reduce((total, { principal }) => total + principal, 0);

  return { data, sumAmount };
};

const Fin = () => {
  const [showFinDetails, setShowFinDetails] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [finDetails] = useState<TFinData | null>(finData);
  const [showHeaderAmountDetails, setShowHeaderAmountDetails] = useState(false);
  const [isLendingSectionCollapsed, setIsLendingSectionCollapsed] =
    useState(false);
  const [isOtherInvestmentsCollapsed, setIsOtherInvestmentsCollapsed] =
    useState(false);
  const [collapsedLendingTiles, setCollapsedLendingTiles] = useState<
    Record<string, boolean>
  >({});

  const { data, sumAmount } = useMemo(
    () => calculateFinData(finDetails),
    [finDetails],
  );

  const totalInterestEarnedOverall = data.reduce((sum, item) => {
    return sum + (item.totalInterestedEarned || 0);
  }, 0);
  const totalOtherInvestments = otherFinData.reduce(
    (sum, item) => sum + item.amountInvested,
    0,
  );
  const portfolioTotal = sumAmount + totalOtherInvestments;

  const handlePasscodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasscode(e.target.value);
  };

  const handleSubmit = () => {
    setShowFinDetails(passcode === "1234");
  };

  const handleToggleLendingTile = (name: string) => {
    setCollapsedLendingTiles((current) => ({
      ...current,
      [name]: !current[name],
    }));
  };

  return (
    <Paper
      elevation={0}
      sx={{
        background: "#f3f8fa",
        border: "1px solid #d7e8ec",
        borderTop: 0,
        borderRadius: 0,
        boxShadow: "none",
        margin: "1rem",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#094252",
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
              variant="h5"
              sx={{
                fontSize: { xs: "1.3rem", sm: "1.5rem" },
                fontWeight: 800,
                letterSpacing: 0,
                lineHeight: 1.15,
              }}
            >
              Financial Details
            </Typography>
            <Typography
              sx={{
                color: "rgba(255, 255, 255, 0.78)",
                fontSize: { xs: "0.82rem", sm: "0.95rem" },
                marginTop: { xs: 0.35, sm: 0.75 },
              }}
            >
              Lending, and long-hold assets
            </Typography>
          </Box>
          {showFinDetails ? (
            <Box
              sx={{
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.14)",
                border: "1px solid rgba(255, 255, 255, 0.24)",
                borderRadius: 0,
                display: "flex",
                gap: 0.75,
                padding: { xs: "0.55rem 0.7rem", sm: "0.75rem 1rem" },
              }}
            >
              <SavingsOutlinedIcon fontSize="small" />
              <Typography sx={{ fontWeight: 700 }}>
                {formatCurrency(portfolioTotal)}
              </Typography>
            </Box>
          ) : (
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "stretch", sm: "center" }}
              sx={{
                backgroundColor: "white",
                
                border: "1px solid rgba(255, 255, 255, 0.24)",
                borderRadius: 0,
                gap: 1,
                padding: { xs: "0.55rem", sm: "0.65rem" },
                width: { xs: "100%", sm: "auto" },
              }}
            >
              <TextField
                type="password"
                id="passcode"
                value={passcode}
                label="Passcode"
                onChange={handlePasscodeChange}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSubmit();
                  }
                }}
                name="passcode"
                size="small"
                sx={{
                  minWidth: { xs: "100%", sm: 190 },
                  "& .MuiInputLabel-root": {
                    color: "rgba(255, 255, 255, 0.76)",
                  },
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255, 255, 255, 0.96)",
                    borderRadius: 0,
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={handleSubmit}
                startIcon={<LockOutlinedIcon />}
                sx={{
                  backgroundColor: "white",
                  borderRadius: 0,
                  boxShadow: "none",
                  color: "#094252",
                  fontWeight: 800,
                  minHeight: 40,
                  paddingInline: 2,
                  "&:hover": {
                    backgroundColor: "#edf8f5",
                    boxShadow: "none",
                  },
                }}
              >
                Unlock
              </Button>
            </Stack>
          )}
        </Stack>
      </Box>
      <Grid
        container
        spacing={{ xs: 1.25, sm: 3 }}
        sx={{ padding: 0, justifyContent: "center" }}
      >
        {showFinDetails && data.length > 0 && (
          <>
            <Grid size={12}>
              <Box
                sx={{
                  backgroundColor: "white",
                  border: "1px solid #dce9ec",
                  borderRadius: 0,
                  boxShadow: "0 10px 28px rgba(9, 66, 82, 0.06)",
                  overflow: "hidden",
                }}
              >
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  alignItems={{ xs: "flex-start", sm: "center" }}
                  justifyContent="space-between"
                  sx={{
                    backgroundColor: "#dfeaed",
                    gap: 2,
                    padding: 2,
                  }}
                >
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#176d74",
                        fontWeight: 800,
                        textTransform: "uppercase",
                      }}
                    >
                      Portfolio total
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{ color: "#094252", fontWeight: 900, marginTop: 0.4 }}
                    >
                      {formatCurrency(portfolioTotal)}
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      setShowHeaderAmountDetails(!showHeaderAmountDetails)
                    }
                    endIcon={
                      showHeaderAmountDetails ? (
                        <KeyboardArrowUpOutlinedIcon />
                      ) : (
                        <KeyboardArrowDownOutlinedIcon />
                      )
                    }
                    sx={{
                      backgroundColor: "white",
                      borderColor: "#b8d8df",
                      borderRadius: 0,
                      color: "#094252",
                      fontWeight: 800,
                    }}
                  >
                    {showHeaderAmountDetails ? "Hide Details" : "Show Details"}
                  </Button>
                </Stack>
                {showHeaderAmountDetails && (
                  <Grid container spacing={1.5} sx={{ padding: 2 }}>
                    {[
                      {
                        icon: <PaymentsOutlinedIcon fontSize="small" />,
                        label: "Principal",
                        value: formatCurrency(sumAmount),
                      },
                      {
                        icon: <TrendingUpOutlinedIcon fontSize="small" />,
                        label: "Interest Earned",
                        value: formatCurrency(totalInterestEarnedOverall),
                      },
                      {
                        icon: <SavingsOutlinedIcon fontSize="small" />,
                        label: "Other Investments",
                        value: formatCurrency(totalOtherInvestments),
                      },
                    ].map((metric) => (
                      <Grid size={{ xs: 12, sm: 4 }} key={metric.label}>
                        <Box
                          sx={{
                            backgroundColor: "#f8fbfc",
                            borderRadius: 0,
                            padding: 1.5,
                          }}
                        >
                          <Stack
                            direction="row"
                            alignItems="center"
                            sx={{ color: "#176d74", gap: 1, marginBottom: 1 }}
                          >
                            {metric.icon}
                            <Typography
                              variant="caption"
                              sx={{ fontWeight: 800, textTransform: "uppercase" }}
                            >
                              {metric.label}
                            </Typography>
                          </Stack>
                          <Typography sx={{ color: "#094252", fontWeight: 800 }}>
                            {metric.value}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Box>
            </Grid>
            <Grid size={12} sx={{ marginTop: { xs: 1.25, sm: 2 } }}>
              <Card
                variant="outlined"
                sx={{
                  backgroundColor: "#eef7f1",
                  borderRadius: 0,
                  boxShadow: {
                    xs: "0 6px 18px rgba(9, 66, 82, 0.06)",
                    sm: "0 10px 28px rgba(9, 66, 82, 0.08)",
                  },
                  overflow: "hidden",
                }}
              >
                <CardContent sx={{ padding: 0 }}>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    justifyContent="space-between"
                    sx={{
                      backgroundColor: "#185c37",
                      color: "white",
                      gap: { xs: 1.25, sm: 2 },
                      padding: { xs: 1.25, sm: 2.5 },
                    }}
                  >
                    <Stack direction="row" alignItems="center" sx={{ gap: { xs: 1, sm: 1.5 } }}>
                      <Box
                        sx={{
                          alignItems: "center",
                          backgroundColor: "rgba(255, 255, 255, 0.16)",
                          borderRadius: 0,
                          display: "flex",
                          height: { xs: 36, sm: 44 },
                          justifyContent: "center",
                          width: { xs: 36, sm: 44 },
                        }}
                      >
                        <PaymentsOutlinedIcon />
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            fontSize: { xs: "1.05rem", sm: "1.35rem" },
                            fontWeight: 700,
                            lineHeight: 1.15,
                          }}
                        >
                          Lending
                        </Typography>
                        <Typography
                          sx={{
                            color: "rgba(255, 255, 255, 0.78)",
                            fontSize: { xs: "0.76rem", sm: "0.9rem" },
                            marginTop: { xs: 0.2, sm: 0.35 },
                          }}
                        >
                          Borrowers and active loan details
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack
                      direction="row"
                      alignItems="center"
                      sx={{ gap: 1, width: { xs: "100%", sm: "auto" } }}
                    >
                      <Box
                        sx={{
                          backgroundColor: "rgba(255, 255, 255, 0.14)",
                          borderRadius: 0,
                          flex: { xs: 1, sm: "0 0 auto" },
                          minWidth: { xs: 0, sm: 220 },
                          padding: { xs: "0.55rem 0.7rem", sm: "0.9rem 1rem" },
                        }}
                      >
                        <Typography
                          sx={{
                            color: "rgba(255, 255, 255, 0.72)",
                            fontSize: "0.72rem",
                            fontWeight: 700,
                            textTransform: "uppercase",
                          }}
                        >
                          Total Principal
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: { xs: "0.95rem", sm: "1.25rem" },
                            fontWeight: 800,
                          }}
                        >
                          {formatCurrency(sumAmount)}
                        </Typography>
                      </Box>
                      <IconButton
                        onClick={() =>
                          setIsLendingSectionCollapsed(
                            !isLendingSectionCollapsed,
                          )
                        }
                        aria-label={
                          isLendingSectionCollapsed
                            ? "Expand Lending section"
                            : "Collapse Lending section"
                        }
                        sx={{
                          backgroundColor: "rgba(255, 255, 255, 0.14)",
                          borderRadius: 0,
                          color: "white",
                          flex: "0 0 auto",
                          height: { xs: 36, sm: 44 },
                          width: { xs: 36, sm: 44 },
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.22)",
                          },
                        }}
                      >
                        {isLendingSectionCollapsed ? (
                          <KeyboardArrowDownOutlinedIcon />
                        ) : (
                          <KeyboardArrowUpOutlinedIcon />
                        )}
                      </IconButton>
                    </Stack>
                  </Stack>
                  <Collapse
                    in={!isLendingSectionCollapsed}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Box sx={{ backgroundColor: "#eef7f1", padding: { xs: 1, sm: 2 } }}>
                      <Grid container spacing={{ xs: 1, sm: 1.5 }}>
                        {data.map((d) => {
                          const isCollapsed =
                            collapsedLendingTiles[d.name] || false;

                          return (
                            <Grid size={12} key={d.name}>
                <Card
	                  elevation={0}
	                  sx={{
		                    backgroundColor: "#fbfefe",
	                    borderRadius: 0,
	                    boxShadow: {
                        xs: "0 4px 12px rgba(9, 66, 82, 0.04)",
                        sm: "0 8px 22px rgba(9, 66, 82, 0.05)",
                      },
	                    overflow: "hidden",
	                  }}
                >
                  <CardContent sx={{ padding: 0 }}>
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      alignItems={{ xs: "flex-start", sm: "center" }}
                      justifyContent="space-between"
                      sx={{
	                        backgroundColor: "#e7f1f3",
                        gap: { xs: 1, sm: 2 },
                        padding: { xs: 1, sm: 2 },
                      }}
                    >
                      <Stack direction="row" alignItems="center" sx={{ gap: { xs: 1, sm: 1.25 } }}>
                        <Box
                          sx={{
                            alignItems: "center",
	                            backgroundColor: "#f8fbfc",
                            borderRadius: 0,
                            color: "#094252",
                            display: "flex",
                            height: { xs: 34, sm: 42 },
                            justifyContent: "center",
                            width: { xs: 34, sm: 42 },
                          }}
                        >
                          <PersonOutlineOutlinedIcon />
                        </Box>
                        <Box>
                          <Typography
                            sx={{
                              color: "#094252",
                              fontSize: { xs: "1rem", sm: "1.25rem" },
                              fontWeight: 800,
                              lineHeight: 1.15,
                            }}
                          >
                            {d.name}
                          </Typography>
                          <Typography color="text.secondary" variant="body2">
                            {d.interestInfo.length} loan
                            {d.interestInfo.length === 1 ? "" : "s"} tracked
                          </Typography>
                        </Box>
                      </Stack>
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        alignItems={{ xs: "stretch", sm: "center" }}
                        sx={{ gap: { xs: 0.75, sm: 1 } }}
                      >
                        <Box
                          sx={{
	                            backgroundColor: "#f4fbf8",
                            borderRadius: 0,
                            padding: { xs: "0.55rem 0.7rem", sm: "0.75rem 1rem" },
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              color: "#176d74",
                              display: "block",
                              fontWeight: 800,
                              textTransform: "uppercase",
                            }}
                          >
                            Principal
                          </Typography>
                          <Typography sx={{ color: "#03894b", fontWeight: 900 }}>
                            {formatCurrency(d.principal)}
                          </Typography>
                        </Box>
                        <Button
                          component={RouterLink}
                          to={`/fin/lenders/${lenderSlug(d.name)}`}
                          variant="outlined"
                          startIcon={<OpenInNewOutlinedIcon />}
                          sx={{
                            backgroundColor: "#f8fbfc",
                            borderColor: "#cfe2d7",
                            borderRadius: 0,
                            color: "#185c37",
                            fontWeight: 800,
                            minHeight: { xs: 34, sm: 40 },
                            paddingInline: { xs: 1, sm: 1.5 },
                            "&:hover": {
                              backgroundColor: "#eef7f1",
                              borderColor: "#a9cbb8",
                            },
                          }}
                        >
                          Statement
                        </Button>
                        <IconButton
                          onClick={() => handleToggleLendingTile(d.name)}
                          aria-label={
                            isCollapsed
                              ? `Expand ${d.name} lending details`
                              : `Collapse ${d.name} lending details`
                          }
                          sx={{
	                            backgroundColor: "#f8fbfc",
                            border: "none",
                            borderRadius: 0,
                            color: "#094252",
                            height: { xs: 34, sm: 40 },
                            width: { xs: 34, sm: 40 },
                            "&:hover": {
	                              backgroundColor: "#edf8f5",
                            },
                          }}
                        >
                          {isCollapsed ? (
                            <KeyboardArrowDownOutlinedIcon />
                          ) : (
                            <KeyboardArrowUpOutlinedIcon />
                          )}
                        </IconButton>
                      </Stack>
                    </Stack>

                    <Collapse in={!isCollapsed} timeout="auto" unmountOnExit>
	                      <Grid
	                        container
	                        sx={{ backgroundColor: "#f8fbfc", padding: { xs: 1, sm: 2 } }}
	                        spacing={{ xs: 1, sm: 2 }}
	                      >
                        <Grid size={12}>
                          <Findetails
                            total={d.totalInterestedEarned}
                            paid={d.totalInterestedPaid}
                            payments={d.paymentInfo}
                          />
                        </Grid>
                        {d.interestInfo.map((info, i) => (
                          <Borrowbox info={info} key={`${d.name}-${i}`} />
                        ))}
                      </Grid>
                    </Collapse>
                  </CardContent>
                </Card>
              </Grid>
                          );
                        })}
                      </Grid>
                    </Box>
                  </Collapse>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={12}>
              <Card
                variant="outlined"
                sx={{
                  backgroundColor: "#f1f4f8",
                  borderRadius: 0,
                  boxShadow: {
                    xs: "0 6px 18px rgba(9, 66, 82, 0.06)",
                    sm: "0 10px 28px rgba(9, 66, 82, 0.08)",
                  },
                  overflow: "hidden",
                }}
              >
                <CardContent sx={{ padding: 0 }}>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    justifyContent="space-between"
                    sx={{
                      backgroundColor: "#243b53",
                      color: "white",
                      gap: { xs: 1.25, sm: 2 },
                      padding: { xs: 1.25, sm: 2.5 },
                    }}
                  >
                    <Stack direction="row" alignItems="center" sx={{ gap: { xs: 1, sm: 1.5 } }}>
                      <Box
                        sx={{
                          alignItems: "center",
                          backgroundColor: "rgba(255, 255, 255, 0.16)",
                          borderRadius: 0,
                          display: "flex",
                          height: { xs: 36, sm: 44 },
                          justifyContent: "center",
                          width: { xs: 36, sm: 44 },
                        }}
                      >
                        <TrendingUpOutlinedIcon />
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            fontSize: { xs: "1.05rem", sm: "1.35rem" },
                            fontWeight: 700,
                            lineHeight: 1.15,
                          }}
                        >
                          Other Investments
                        </Typography>
                        <Typography
                          sx={{
                            color: "rgba(255, 255, 255, 0.78)",
                            fontSize: { xs: "0.76rem", sm: "0.9rem" },
                            marginTop: { xs: 0.2, sm: 0.35 },
                          }}
                        >
                          Gold, land, and long-hold assets
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack
                      direction="row"
                      alignItems="center"
                      sx={{ gap: 1, width: { xs: "100%", sm: "auto" } }}
                    >
                      <Box
                        sx={{
                          backgroundColor: "rgba(255, 255, 255, 0.14)",
                          borderRadius: 0,
                          flex: { xs: 1, sm: "0 0 auto" },
                          minWidth: { xs: 0, sm: 220 },
                          padding: { xs: "0.55rem 0.7rem", sm: "0.9rem 1rem" },
                        }}
                      >
                        <Typography
                          sx={{
                            color: "rgba(255, 255, 255, 0.72)",
                            fontSize: "0.72rem",
                            fontWeight: 700,
                            textTransform: "uppercase",
                          }}
                        >
                          Total Invested
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: { xs: "0.95rem", sm: "1.25rem" },
                            fontWeight: 800,
                          }}
                        >
                          {formatCurrency(totalOtherInvestments)}
                        </Typography>
                      </Box>
                      <IconButton
                        onClick={() =>
                          setIsOtherInvestmentsCollapsed(
                            !isOtherInvestmentsCollapsed,
                          )
                        }
                        aria-label={
                          isOtherInvestmentsCollapsed
                            ? "Expand Other Investments section"
                            : "Collapse Other Investments section"
                        }
                        sx={{
                          backgroundColor: "rgba(255, 255, 255, 0.14)",
                          borderRadius: 0,
                          color: "white",
                          flex: "0 0 auto",
                          height: { xs: 36, sm: 44 },
                          width: { xs: 36, sm: 44 },
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.22)",
                          },
                        }}
                      >
                        {isOtherInvestmentsCollapsed ? (
                          <KeyboardArrowDownOutlinedIcon />
                        ) : (
                          <KeyboardArrowUpOutlinedIcon />
                        )}
                      </IconButton>
                    </Stack>
                  </Stack>
                  <Collapse
                    in={!isOtherInvestmentsCollapsed}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Box sx={{ backgroundColor: "#f1f4f8", padding: { xs: 1, sm: 2 } }}>
                      <Grid container spacing={{ xs: 1, sm: 2 }}>
                      {otherFinData.map((investment, index) => {
                        const allocation =
                          (investment.amountInvested / totalOtherInvestments) *
                          100;
                        const accentColors = ["#2ec4b6", "#7c3aed", "#f59e0b"];
                        const accentColor =
                          accentColors[index % accentColors.length];

                        return (
                          <Grid size={{ xs: 12, md: 4 }} key={investment.name}>
                            <Box
                              sx={{
                                backgroundColor: "#ffffff",
                                borderRadius: 0,
                                boxShadow:
                                  {
                                    xs: "0 4px 12px rgba(9, 66, 82, 0.04)",
                                    sm: "0 8px 22px rgba(9, 66, 82, 0.06)",
                                  },
                                height: "100%",
                                overflow: "hidden",
                                padding: { xs: 1.25, sm: 2 },
                              }}
                            >
                              <Stack
                                direction="row"
                                alignItems="flex-start"
                                justifyContent="space-between"
                                sx={{ gap: { xs: 1, sm: 1.5 } }}
                              >
                                <Box>
                                  <Typography
                                    sx={{
                                      color: "#094252",
                                      fontSize: { xs: "0.95rem", sm: "1.05rem" },
                                      fontWeight: 800,
                                    }}
                                  >
                                    {investment.name}
                                  </Typography>
                                  <Typography
                                    sx={{
                                     color: "#566b70",
                                      fontSize: { xs: "0.76rem", sm: "0.85rem" },
                                      marginTop: 0.35,
                                    }}
                                  >
                                    {allocation.toFixed(1)}% of other assets
                                  </Typography>
                                </Box>
                                <Box
                                  sx={{
                                    alignItems: "center",
                                    backgroundColor: `${accentColor}1f`,
                                    borderRadius: 0,
                                    color: accentColor,
                                    display: "flex",
                                    height: { xs: 32, sm: 38 },
                                    justifyContent: "center",
                                    width: { xs: 32, sm: 38 },
                                  }}
                                >
                                  <AccountBalanceWalletOutlinedIcon fontSize="small" />
                                </Box>
                              </Stack>
                              <Typography
                                sx={{
                                  color: "#03894b",
                                  fontSize: { xs: "1.05rem", sm: "1.35rem" },
                                  fontWeight: 800,
                                  marginTop: { xs: 1, sm: 2 },
                                }}
                              >
                                {formatCurrency(investment.amountInvested)}
                              </Typography>
                              <Box
                                sx={{
                                  backgroundColor: "#e8f1f3",
                                  borderRadius: 0,
                                  height: 8,
                                  marginTop: { xs: 1, sm: 1.5 },
                                  overflow: "hidden",
                                }}
                              >
                                <Box
                                  sx={{
                                    backgroundColor: accentColor,
                                    height: "100%",
                                    width: `${allocation}%`,
                                  }}
                                />
                              </Box>
                              <Stack
                                direction="row"
                                alignItems="center"
                                sx={{
                                  color: "#4b646a",
                                  gap: 0.75,
                                  marginTop: { xs: 1, sm: 1.5 },
                                }}
                              >
                                <CalendarMonthOutlinedIcon fontSize="small" />
                                <Typography variant="body2">
                                  {formatDate(investment.dateInvested)}
                                </Typography>
                              </Stack>
                              {investment.remarks && (
                                <Stack
                                  direction="row"
                                  alignItems="flex-start"
                                  sx={{
                                    backgroundColor: "#fff8eb",
                                    border: "1px solid #f4ddb3",
                                    borderRadius: 0,
                                    color: "#7a3f00",
                                    gap: 0.75,
                                    marginTop: { xs: 1, sm: 1.5 },
                                    padding: { xs: 1, sm: 1.25 },
                                  }}
                                >
                                  <NotesOutlinedIcon fontSize="small" />
                                  <Typography
                                    sx={{ fontSize: "0.86rem", fontWeight: 600 }}
                                  >
                                    {investment.remarks}
                                  </Typography>
                                </Stack>
                              )}
                            </Box>
                          </Grid>
                        );
                      })}
                      </Grid>
                    </Box>
                  </Collapse>
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
