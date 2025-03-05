import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export const formatCurrency = (input: number) => {
  return new Intl.NumberFormat("en-IN").format(input);
};

export const formatDate = (date: Date): string => {
  return dayjs(date).utc().format("MMM-DD-YYYY").toUpperCase();
};

export const daysFromToday = (date: Date): number => {
  return Math.abs(
    dayjs(date).utc().diff(dayjs().utc(), "day")
  );
};
