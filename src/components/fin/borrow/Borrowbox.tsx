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
        borderRadius: 2,
        boxShadow: "0 8px 22px rgba(9, 66, 82, 0.05)",
        fontWeight: 500,
        padding: "1rem",
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
            variant="caption"
            sx={{ color: "#176d74", fontWeight: 800, textTransform: "uppercase" }}
          >
            Amount Owed
          </Typography>
          <Typography
            sx={{
              color: "#094252",
              fontSize: "1.35rem",
              fontWeight: 900,
              marginTop: 0.25,
            }}
          >
            {formatCurrency(info.amountOwed)}
          </Typography>
        </Box>
        <Box
          sx={{
            alignItems: "center",
            backgroundColor: "#eaf7f5",
            borderRadius: 2,
            color: "#176d74",
            display: "flex",
            height: 40,
            justifyContent: "center",
            width: 40,
          }}
        >
          <PaymentsOutlinedIcon fontSize="small" />
        </Box>
      </Stack>
      <Grid container spacing={1.25} sx={{ marginTop: 2 }}>
        {[
          {
            icon: <PercentOutlinedIcon fontSize="small" />,
            label: "Interest",
            value: `${info.interest}%`,
          },
          {
            icon: <CalendarMonthOutlinedIcon fontSize="small" />,
            label: "Borrowed",
            value: info.dateBorrowed ? formatDate(info.dateBorrowed) : "N/A",
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
                borderRadius: 2,
                color: "#4b646a",
                gap: 1,
                padding: 1,
              }}
            >
              <Box sx={{ color: "#176d74", display: "flex" }}>{item.icon}</Box>
              <Box>
                <Typography
                  sx={{
                    color: "#6b7d82",
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                  }}
                >
                  {item.label}
                </Typography>
                <Typography sx={{ color: "#094252", fontSize: "0.88rem", fontWeight: 700 }}>
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
          borderRadius: 2,
          marginTop: "1rem",
          padding: "1rem",
        }}
      >
        <Typography
          variant="caption"
          sx={{ color: "#0f6b4a", fontWeight: 800, textTransform: "uppercase" }}
        >
          Interest Performance
        </Typography>
        <Grid container spacing={1.25} sx={{ marginTop: 0.75 }}>
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
            borderRadius: 2,
            color: "#7a3f00",
            gap: 1,
            marginTop: "1rem",
            padding: 1.25,
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
