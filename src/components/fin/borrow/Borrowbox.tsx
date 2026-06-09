import { Box, Stack, Typography } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import NotesOutlinedIcon from "@mui/icons-material/NotesOutlined";
import PercentOutlinedIcon from "@mui/icons-material/PercentOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import TimelapseOutlinedIcon from "@mui/icons-material/TimelapseOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import {
  daysFromToday,
  formatCurrency,
  formatDate,
  monthsAndDaysFromToday,
} from "../utils";
import { InterestInfo } from "../data/fin_data";
import Grid from "@mui/material/Grid2";

const Borrowbox = ({ info }: { info: InterestInfo }) => {
  const interestPerDay = parseFloat(
    (
      parseFloat(
        ((info.amountOwed * info.interest * 365) / (100 * 365)).toFixed(2)
      ) / 365
    ).toFixed(3)
  );
  const interestPerMonth =
    parseFloat(
      ((info.amountOwed * info.interest * 365) / (100 * 365)).toFixed(2)
    ) / 12;

  return (
    <Grid
      size={{ xs: 12, sm: 6 }}
      sx={{
        backgroundColor: "#ffffff",
        borderRadius: 0,
        boxShadow: {
          xs: "0 4px 12px rgba(9, 66, 82, 0.04)",
          sm: "0 8px 22px rgba(9, 66, 82, 0.05)",
        },
        fontWeight: 500,
        padding: { xs: "0.9rem", sm: "1rem" },
      }}
    >
      <Stack
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
        sx={{ gap: { xs: 1, sm: 1.5 } }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="caption"
            sx={{ color: "#176d74", fontWeight: 800, textTransform: "uppercase" }}
          >
            Amount Owed
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "flex-start", sm: "center" }}
            sx={{ gap: { xs: 0.5, sm: 1.5 }, marginTop: { xs: 0.15, sm: 0.25 } }}
          >
            <Typography
              sx={{
                color: "#094252",
                fontSize: { xs: "1.1rem", sm: "1.35rem" },
                fontWeight: 900,
              }}
            >
              {formatCurrency(info.amountOwed)}
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                backgroundColor: "#f3f8fa",
                borderRadius: 0,
                color: "#4b646a",
                gap: 0.6,
                padding: { xs: "0.35rem 0.55rem", sm: "0.4rem 0.65rem" },
              }}
            >
              <CalendarMonthOutlinedIcon sx={{ color: "#176d74", fontSize: 18 }} />
              <Box>
                <Typography
                  sx={{
                    color: "#6b7d82",
                    fontSize: { xs: "0.58rem", sm: "0.62rem" },
                    fontWeight: 800,
                    lineHeight: 1,
                    textTransform: "uppercase",
                  }}
                >
                  Borrowed Date
                </Typography>
                <Typography
                  sx={{
                    color: "#094252",
                    fontSize: { xs: "0.78rem", sm: "0.84rem" },
                    fontWeight: 800,
                    lineHeight: 1.25,
                    marginTop: 0.25,
                  }}
                >
                  {info.dateBorrowed ? formatDate(info.dateBorrowed) : "N/A"}
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Box>
        <Box
          sx={{
            alignItems: "center",
            backgroundColor: "#eaf7f5",
            borderRadius: 0,
            color: "#176d74",
            display: "flex",
            height: { xs: 34, sm: 40 },
            justifyContent: "center",
            width: { xs: 34, sm: 40 },
          }}
        >
          <PaymentsOutlinedIcon fontSize="small" />
        </Box>
      </Stack>
      <Grid container spacing={{ xs: 0.75, sm: 1.25 }} sx={{ marginTop: { xs: 1, sm: 2 } }}>
        {[
          {
            icon: <PercentOutlinedIcon fontSize="small" />,
            label: "Interest",
            value: `${info.interest}%`,
          },
          {
            icon: <TimelapseOutlinedIcon fontSize="small" />,
            label: "Duration",
            value: monthsAndDaysFromToday(info.dateBorrowed),
          },
          {
            icon: <TrendingUpOutlinedIcon fontSize="small" />,
            label: "Days",
            value: daysFromToday(info.dateBorrowed),
          },
        ].map((item) => (
          <Grid size={{ xs: 12, sm: 6 }} key={item.label}>
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                backgroundColor: "#f3f8fa",
                borderRadius: 0,
                color: "#4b646a",
                gap: 0.75,
                padding: { xs: 0.75, sm: 1 },
              }}
            >
              <Box sx={{ color: "#176d74", display: "flex" }}>{item.icon}</Box>
              <Box>
                <Typography
                  sx={{
                    color: "#6b7d82",
                    fontSize: { xs: "0.66rem", sm: "0.72rem" },
                    fontWeight: 800,
                    textTransform: "uppercase",
                  }}
                >
                  {item.label}
                </Typography>
                <Typography
                  sx={{
                    color: "#094252",
                    fontSize: { xs: "0.8rem", sm: "0.88rem" },
                    fontWeight: 700,
                  }}
                >
                  {item.value}
                </Typography>
              </Box>
            </Stack>
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          background: "#edf8f5",
          borderRadius: 0,
          marginTop: { xs: "0.75rem", sm: "1rem" },
          padding: { xs: "0.8rem", sm: "1rem" },
        }}
      >
        <Typography
          variant="caption"
          sx={{ color: "#0f6b4a", fontWeight: 800, textTransform: "uppercase" }}
        >
          Interest Performance
        </Typography>
        <Grid container spacing={{ xs: 0.75, sm: 1.25 }} sx={{ marginTop: 0.75 }}>
          <Grid size={12}>
            <Typography sx={{ color: "#094252", fontWeight: 900 }}>
              Total Earned: {formatCurrency(info.interestEarned || 0)}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography color="text.secondary" variant="body2">
              Per day: {formatCurrency(interestPerDay)}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography color="text.secondary" variant="body2">
              Per month: {formatCurrency(interestPerMonth)}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      {info.remarks && (
        <Stack
          direction="row"
          alignItems="flex-start"
          sx={{
            backgroundColor: "#fff7e8",
            borderRadius: 0,
            color: "#7a3f00",
            gap: 0.75,
            marginTop: { xs: "0.75rem", sm: "1rem" },
            padding: { xs: 1, sm: 1.25 },
          }}
        >
          <NotesOutlinedIcon fontSize="small" />
          <Typography sx={{ fontSize: "0.9rem", fontWeight: 600 }}>
            {info.remarks}
          </Typography>
        </Stack>
      )}
    </Grid>
  );
};

export default Borrowbox;
