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
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import NotesOutlinedIcon from "@mui/icons-material/NotesOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import { useState, useMemo } from "react";

import finData, { otherFinData, TFinData } from "./data/fin_data";
import { daysFromToday, formatCurrency, formatDate } from "./utils";
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
  const [isInvestmentAllocationCollapsed, setIsInvestmentAllocationCollapsed] =
    useState(false);
  const [isLendingSectionCollapsed, setIsLendingSectionCollapsed] =
    useState(false);
  const [isOtherInvestmentsCollapsed, setIsOtherInvestmentsCollapsed] =
    useState(false);
  const [collapsedLendingTiles, setCollapsedLendingTiles] = useState<
    Record<string, boolean>
  >({});
  const [hoveredInvestmentKey, setHoveredInvestmentKey] = useState<
    string | null
  >(null);

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
  const investmentChartData = [
    ...data.map((item) => ({
      amount: item.principal,
      color: "#2ec4b6",
      name: item.name,
      type: "Lending",
    })),
    ...otherFinData.map((item, index) => {
      const colors = ["#7c3aed", "#f59e0b", "#0ea5e9"];

      return {
        amount: item.amountInvested,
        color: colors[index % colors.length],
        name: item.name,
        type: "Long-hold",
      };
    }),
  ].sort((a, b) => b.amount - a.amount);
  let investmentChartOffset = 0;
  const investmentChartSegments = investmentChartData.map((item) => {
    const percentage =
      portfolioTotal > 0 ? (item.amount / portfolioTotal) * 100 : 0;
    const segment = {
      ...item,
      key: `${item.type}-${item.name}`,
      offset: investmentChartOffset,
      percentage,
    };

    investmentChartOffset += percentage;
    return segment;
  });
  const hoveredInvestment = investmentChartSegments.find(
    (item) => item.key === hoveredInvestmentKey,
  );

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

  const handleSelectInvestment = (key: string) => {
    setHoveredInvestmentKey((current) => (current === key ? null : key));
  };

  return (
    <Paper
      elevation={0}
      sx={{
        background: "#f3f8fa",
        border: "1px solid #d7e8ec",
        borderRadius: 3,
        boxShadow: "0 18px 50px rgba(9, 66, 82, 0.09)",
        marginTop: "1rem",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          background:
            "linear-gradient(135deg, #094252 0%, #176d74 52%, #2ec4b6 100%)",
          color: "white",
          padding: { xs: 2.5, sm: 3 },
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
          sx={{ gap: 2 }}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: 800, letterSpacing: 0, lineHeight: 1.15 }}
            >
              Financial Details
            </Typography>
            <Typography
              sx={{
                color: "rgba(255, 255, 255, 0.78)",
                fontSize: "0.95rem",
                marginTop: 0.75,
              }}
            >
              Lending, and long-hold assets
            </Typography>
          </Box>
          <Box
            sx={{
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.14)",
              border: "1px solid rgba(255, 255, 255, 0.24)",
              borderRadius: 2,
              display: "flex",
              gap: 1,
              padding: "0.75rem 1rem",
            }}
          >
            <SavingsOutlinedIcon fontSize="small" />
            <Typography sx={{ fontWeight: 700 }}>
              {showFinDetails
                ? formatCurrency(portfolioTotal)
                : "Private overview"}
            </Typography>
          </Box>
        </Stack>
      </Box>
      <Grid
        container
        spacing={3}
        sx={{ padding: { xs: "1rem", sm: "1.25rem" }, justifyContent: "center" }}
      >
        <Grid size={12}>
          <Box
            sx={{
              backgroundColor: "white",
              border: "1px solid #dce9ec",
              borderRadius: 2,
              boxShadow: "0 8px 24px rgba(9, 66, 82, 0.05)",
              padding: 2,
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "stretch", sm: "center" }}
              justifyContent="space-between"
              sx={{ gap: 2 }}
            >
              <Stack direction="row" alignItems="center" sx={{ gap: 1.25 }}>
                <Box
                  sx={{
                    alignItems: "center",
                    backgroundColor: "#eaf7f5",
                    borderRadius: 2,
                    color: "#094252",
                    display: "flex",
                    height: 40,
                    justifyContent: "center",
                    width: 40,
                  }}
                >
                  <LockOutlinedIcon fontSize="small" />
                </Box>
                <Box>
                  <Typography sx={{ color: "#094252", fontWeight: 800 }}>
                    Secure Finance View
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    {showFinDetails ? "Unlocked" : "Enter passcode to unlock"}
                  </Typography>
                </Box>
              </Stack>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                alignItems={{ xs: "stretch", sm: "center" }}
                sx={{ gap: 1 }}
              >
                <TextField
                  type="password"
                  id="passcode"
                  value={passcode}
                  label="Passcode"
                  onChange={handlePasscodeChange}
                  name="passcode"
                  size="small"
                  sx={{
                    minWidth: { xs: "100%", sm: 220 },
                    "& .MuiOutlinedInput-root": { borderRadius: 2 },
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  startIcon={<LockOutlinedIcon />}
                  sx={{
                    borderRadius: 2,
                    boxShadow: "none",
                    fontWeight: 700,
                    minHeight: 40,
                    paddingInline: 2,
                  }}
                >
                  Unlock
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Grid>

        {showFinDetails && data.length > 0 && (
          <>
            <Grid size={12}>
              <Box
                sx={{
                  backgroundColor: "white",
                  border: "1px solid #dce9ec",
                  borderRadius: 2,
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
                      borderRadius: 2,
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
                            borderRadius: 2,
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
            <Grid size={12}>
              <Card
                elevation={0}
                sx={{
                  backgroundColor: "#f8fbfc",
                  borderRadius: 2,
                  boxShadow: "0 10px 28px rgba(9, 66, 82, 0.06)",
                  overflow: "hidden",
                }}
              >
                <CardContent sx={{ padding: 0 }}>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    justifyContent="space-between"
                    sx={{
                      background:
                        "linear-gradient(135deg, #12355b 0%, #2d5f80 52%, #6aa6b8 100%)",
                      color: "white",
                      gap: 2,
                      padding: 2.5,
                    }}
                  >
                    <Stack direction="row" alignItems="center" sx={{ gap: 1.5 }}>
                      <Box
                        sx={{
                          alignItems: "center",
                          backgroundColor: "rgba(255, 255, 255, 0.16)",
                          borderRadius: 2,
                          display: "flex",
                          height: 44,
                          justifyContent: "center",
                          width: 44,
                        }}
                      >
                        <BarChartOutlinedIcon />
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            fontSize: "1.35rem",
                            fontWeight: 700,
                            lineHeight: 1.15,
                          }}
                        >
                          Investment Allocation
                        </Typography>
                        <Typography
                          sx={{
                            color: "rgba(255, 255, 255, 0.78)",
                            fontSize: "0.9rem",
                            marginTop: 0.35,
                          }}
                        >
                          Lending and long-hold assets by amount
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
                          borderRadius: 2,
                          flex: { xs: 1, sm: "0 0 auto" },
                          minWidth: { xs: 0, sm: 220 },
                          padding: "0.9rem 1rem",
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
                          Total Shown
                        </Typography>
                        <Typography sx={{ fontSize: "1.25rem", fontWeight: 800 }}>
                          {formatCurrency(portfolioTotal)}
                        </Typography>
                      </Box>
                      <IconButton
                        onClick={() =>
                          setIsInvestmentAllocationCollapsed(
                            !isInvestmentAllocationCollapsed,
                          )
                        }
                        aria-label={
                          isInvestmentAllocationCollapsed
                            ? "Expand Investment Allocation section"
                            : "Collapse Investment Allocation section"
                        }
                        sx={{
                          backgroundColor: "rgba(255, 255, 255, 0.14)",
                          borderRadius: 2,
                          color: "white",
                          flex: "0 0 auto",
                          height: 44,
                          width: 44,
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.22)",
                          },
                        }}
                      >
                        {isInvestmentAllocationCollapsed ? (
                          <KeyboardArrowDownOutlinedIcon />
                        ) : (
                          <KeyboardArrowUpOutlinedIcon />
                        )}
                      </IconButton>
                    </Stack>
                  </Stack>
                  <Collapse
                    in={!isInvestmentAllocationCollapsed}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Grid
                      container
                      spacing={2}
                      sx={{
                        alignItems: "center",
                        backgroundColor: "#f7f9fb",
                        padding: 2,
                      }}
                    >
                      <Grid size={{ xs: 12, md: 5 }}>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                          justifyContent: "center",
                          minHeight: 260,
                        }}
                      >
                        <Box
                          sx={{
                            height: { xs: 240, sm: 290 },
                            position: "relative",
                            width: { xs: 240, sm: 290 },
                          }}
                        >
                          <Box
                            component="svg"
                            viewBox="0 0 240 240"
                            sx={{
                              display: "block",
                              height: "100%",
                              overflow: "visible",
                              width: "100%",
                            }}
                          >
                            <Box
                              component="circle"
                              cx="120"
                              cy="120"
                              r="86"
                              fill="none"
                              stroke="#e8f1f3"
                              strokeWidth="48"
                            />
                            {investmentChartSegments.map((segment) => {
                              const isActive =
                                hoveredInvestmentKey === segment.key;
                              const isDimmed =
                                hoveredInvestmentKey !== null && !isActive;

                              return (
                                <Box
                                  component="circle"
                                  key={segment.key}
                                  cx="120"
                                  cy="120"
                                  r="86"
                                  fill="none"
                                  pathLength="100"
                                  stroke={segment.color}
                                  strokeDasharray={`${segment.percentage} ${
                                    100 - segment.percentage
                                  }`}
                                  strokeDashoffset={-segment.offset}
                                  strokeLinecap="butt"
                                  strokeWidth={isActive ? 54 : 48}
                                  transform="rotate(-90 120 120)"
	                                  onMouseEnter={() =>
	                                    setHoveredInvestmentKey(segment.key)
	                                  }
	                                  onMouseLeave={() => setHoveredInvestmentKey(null)}
                                      onClick={() =>
                                        handleSelectInvestment(segment.key)
                                      }
                                      onFocus={() =>
                                        setHoveredInvestmentKey(segment.key)
                                      }
                                      onBlur={() => setHoveredInvestmentKey(null)}
                                      onKeyDown={(event) => {
                                        if (
                                          event.key === "Enter" ||
                                          event.key === " "
                                        ) {
                                          event.preventDefault();
                                          handleSelectInvestment(segment.key);
                                        }
                                      }}
                                      role="button"
                                      tabIndex={0}
	                                  sx={{
	                                    cursor: "pointer",
                                    opacity: isDimmed ? 0.42 : 1,
                                    transition:
                                      "opacity 160ms ease, stroke-width 160ms ease",
                                  }}
                                />
                              );
                            })}
                          </Box>
                          <Box
                            sx={{
                              alignItems: "center",
                              backgroundColor: "#f7f9fb",
                              borderRadius: "50%",
                              boxShadow: "inset 0 0 0 1px rgba(9, 66, 82, 0.04)",
                              display: "flex",
                              flexDirection: "column",
                              height: "48%",
                              justifyContent: "center",
                              left: "26%",
                              padding: 2,
                              position: "absolute",
                              textAlign: "center",
                              top: "26%",
                              width: "48%",
                            }}
                          >
                            <Typography
                              variant="caption"
                              sx={{
                                color: "#176d74",
                                fontWeight: 800,
                                textTransform: "uppercase",
                              }}
                            >
                              {hoveredInvestment ? hoveredInvestment.type : "Total"}
                            </Typography>
                            <Typography
                              sx={{
                                color: "#094252",
                                fontSize: "1rem",
                                fontWeight: 900,
                              }}
                            >
                              {formatCurrency(
                                hoveredInvestment?.amount || portfolioTotal,
                              )}
                            </Typography>
                            <Typography
                              color="text.secondary"
                              sx={{
                                fontSize: "0.76rem",
                                fontWeight: 700,
                                marginTop: 0.35,
                                maxWidth: 130,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {hoveredInvestment
                                ? `${hoveredInvestment.name} (${hoveredInvestment.percentage.toFixed(
                                    1,
                                  )}%)`
                                : "Portfolio"}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      </Grid>
                      <Grid size={{ xs: 12, md: 7 }}>
                      <Stack sx={{ gap: 1 }}>
                        {investmentChartSegments.map((item) => {
                          const portfolioShare =
                            portfolioTotal > 0
                              ? (item.amount / portfolioTotal) * 100
                              : 0;
                          const isActive = hoveredInvestmentKey === item.key;

                          return (
                            <Stack
                              key={item.key}
                              direction="row"
                              alignItems="center"
	                              justifyContent="space-between"
	                              onMouseEnter={() => setHoveredInvestmentKey(item.key)}
	                              onMouseLeave={() => setHoveredInvestmentKey(null)}
                                  onClick={() => handleSelectInvestment(item.key)}
                                  onFocus={() => setHoveredInvestmentKey(item.key)}
                                  onBlur={() => setHoveredInvestmentKey(null)}
                                  onKeyDown={(event) => {
                                    if (
                                      event.key === "Enter" ||
                                      event.key === " "
                                    ) {
                                      event.preventDefault();
                                      handleSelectInvestment(item.key);
                                    }
                                  }}
                                  role="button"
                                  tabIndex={0}
	                              sx={{
                                backgroundColor: isActive ? "#edf8f5" : "white",
                                borderRadius: 2,
                                boxShadow: isActive
                                  ? "0 10px 24px rgba(9, 66, 82, 0.1)"
                                  : "0 6px 18px rgba(9, 66, 82, 0.04)",
                                cursor: "pointer",
                                gap: 1.5,
                                padding: 1.25,
                                transition:
                                  "background-color 160ms ease, box-shadow 160ms ease",
                              }}
                            >
                              <Stack
                                direction="row"
                                alignItems="center"
                                sx={{ gap: 1.25, minWidth: 0 }}
                              >
                                <Box
                                  sx={{
                                    backgroundColor: item.color,
                                    borderRadius: "50%",
                                    flex: "0 0 auto",
                                    height: 12,
                                    width: 12,
                                  }}
                                />
                                <Box sx={{ minWidth: 0 }}>
                                  <Typography
                                    sx={{
                                      color: "#094252",
                                      fontWeight: 800,
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    {item.name}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      color: item.color,
                                      fontSize: "0.74rem",
                                      fontWeight: 800,
                                      textTransform: "uppercase",
                                    }}
                                  >
                                    {item.type}
                                  </Typography>
                                </Box>
                              </Stack>
                              <Box
                                sx={{
                                  flex: "0 0 auto",
                                  textAlign: "right",
                                }}
                              >
                                <Typography
                                  sx={{ color: "#094252", fontWeight: 900 }}
                                >
                                  {formatCurrency(item.amount)}
                                </Typography>
                                <Typography color="text.secondary" variant="body2">
                                  {portfolioShare.toFixed(1)}%
                                </Typography>
                              </Box>
                            </Stack>
                          );
                        })}
                      </Stack>
                      </Grid>
                    </Grid>
                  </Collapse>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={12}>
              <Card
                variant="outlined"
                sx={{
                  backgroundColor: "#f8fbfc",
                  borderRadius: 2,
                  boxShadow: "0 10px 28px rgba(9, 66, 82, 0.08)",
                  overflow: "hidden",
                }}
              >
                <CardContent sx={{ padding: 0 }}>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    justifyContent="space-between"
                    sx={{
                      background:
                        "linear-gradient(135deg, #094252 0%, #176d74 54%, #2ec4b6 100%)",
                      color: "white",
                      gap: 2,
                      padding: 2.5,
                    }}
                  >
                    <Stack direction="row" alignItems="center" sx={{ gap: 1.5 }}>
                      <Box
                        sx={{
                          alignItems: "center",
                          backgroundColor: "rgba(255, 255, 255, 0.16)",
                          borderRadius: 2,
                          display: "flex",
                          height: 44,
                          justifyContent: "center",
                          width: 44,
                        }}
                      >
                        <PaymentsOutlinedIcon />
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            fontSize: "1.35rem",
                            fontWeight: 700,
                            lineHeight: 1.15,
                          }}
                        >
                          Lending
                        </Typography>
                        <Typography
                          sx={{
                            color: "rgba(255, 255, 255, 0.78)",
                            fontSize: "0.9rem",
                            marginTop: 0.35,
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
                          borderRadius: 2,
                          flex: { xs: 1, sm: "0 0 auto" },
                          minWidth: { xs: 0, sm: 220 },
                          padding: "0.9rem 1rem",
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
                        <Typography sx={{ fontSize: "1.25rem", fontWeight: 800 }}>
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
                          borderRadius: 2,
                          color: "white",
                          flex: "0 0 auto",
                          height: 44,
                          width: 44,
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
                    <Box sx={{ backgroundColor: "#eef6f7", padding: 2 }}>
                      <Grid container spacing={1.5}>
                        {data.map((d) => {
                          const isCollapsed =
                            collapsedLendingTiles[d.name] || false;

                          return (
                            <Grid size={12} key={d.name}>
                <Card
	                  elevation={0}
	                  sx={{
		                    backgroundColor: "#fbfefe",
	                    borderRadius: 2,
	                    boxShadow: "0 8px 22px rgba(9, 66, 82, 0.05)",
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
                        gap: 2,
                        padding: 2,
                      }}
                    >
                      <Stack direction="row" alignItems="center" sx={{ gap: 1.25 }}>
                        <Box
                          sx={{
                            alignItems: "center",
	                            backgroundColor: "#f8fbfc",
                            borderRadius: 2,
                            color: "#094252",
                            display: "flex",
                            height: 42,
                            justifyContent: "center",
                            width: 42,
                          }}
                        >
                          <PersonOutlineOutlinedIcon />
                        </Box>
                        <Box>
                          <Typography
                            sx={{
                              color: "#094252",
                              fontSize: "1.25rem",
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
                        sx={{ gap: 1 }}
                      >
                        <Box
                          sx={{
	                            backgroundColor: "#f4fbf8",
                            borderRadius: 2,
                            padding: "0.75rem 1rem",
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
                            borderRadius: 2,
                            color: "#094252",
                            height: 40,
                            width: 40,
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
	                        sx={{ backgroundColor: "#f8fbfc", padding: 2 }}
	                        spacing={2}
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
                  backgroundColor: "#f8fbfc",
                  borderRadius: 2,
                  boxShadow: "0 10px 28px rgba(9, 66, 82, 0.08)",
                  overflow: "hidden",
                }}
              >
                <CardContent sx={{ padding: 0 }}>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    justifyContent="space-between"
                    sx={{
                      background:
                        "linear-gradient(135deg, #094252 0%, #176d74 54%, #2ec4b6 100%)",
                      color: "white",
                      gap: 2,
                      padding: 2.5,
                    }}
                  >
                    <Stack direction="row" alignItems="center" sx={{ gap: 1.5 }}>
                      <Box
                        sx={{
                          alignItems: "center",
                          backgroundColor: "rgba(255, 255, 255, 0.16)",
                          borderRadius: 2,
                          display: "flex",
                          height: 44,
                          justifyContent: "center",
                          width: 44,
                        }}
                      >
                        <TrendingUpOutlinedIcon />
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            fontSize: "1.35rem",
                            fontWeight: 700,
                            lineHeight: 1.15,
                          }}
                        >
                          Other Investments
                        </Typography>
                        <Typography
                          sx={{
                            color: "rgba(255, 255, 255, 0.78)",
                            fontSize: "0.9rem",
                            marginTop: 0.35,
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
                          borderRadius: 2,
                          flex: { xs: 1, sm: "0 0 auto" },
                          minWidth: { xs: 0, sm: 220 },
                          padding: "0.9rem 1rem",
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
                        <Typography sx={{ fontSize: "1.25rem", fontWeight: 800 }}>
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
                          borderRadius: 2,
                          color: "white",
                          flex: "0 0 auto",
                          height: 44,
                          width: 44,
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
                    <Box sx={{ backgroundColor: "#f7f9fb", padding: 2 }}>
                      <Grid container spacing={2}>
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
                                borderRadius: 2,
                                boxShadow:
                                  "0 8px 22px rgba(9, 66, 82, 0.06)",
                                height: "100%",
                                overflow: "hidden",
                                padding: 2,
                              }}
                            >
                              <Stack
                                direction="row"
                                alignItems="flex-start"
                                justifyContent="space-between"
                                sx={{ gap: 1.5 }}
                              >
                                <Box>
                                  <Typography
                                    sx={{
                                      color: "#094252",
                                      fontSize: "1.05rem",
                                      fontWeight: 800,
                                    }}
                                  >
                                    {investment.name}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      color: "#566b70",
                                      fontSize: "0.85rem",
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
                                    borderRadius: 2,
                                    color: accentColor,
                                    display: "flex",
                                    height: 38,
                                    justifyContent: "center",
                                    width: 38,
                                  }}
                                >
                                  <AccountBalanceWalletOutlinedIcon fontSize="small" />
                                </Box>
                              </Stack>
                              <Typography
                                sx={{
                                  color: "#03894b",
                                  fontSize: "1.35rem",
                                  fontWeight: 800,
                                  marginTop: 2,
                                }}
                              >
                                {formatCurrency(investment.amountInvested)}
                              </Typography>
                              <Box
                                sx={{
                                  backgroundColor: "#e8f1f3",
                                  borderRadius: 999,
                                  height: 8,
                                  marginTop: 1.5,
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
                                  marginTop: 1.5,
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
                                    borderRadius: 2,
                                    color: "#7a3f00",
                                    gap: 1,
                                    marginTop: 1.5,
                                    padding: 1.25,
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
