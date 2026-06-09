import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export const formatCurrency = (input: number) => {
  const value = Number.isFinite(input) ? input : 0;

  return ` ₹${new Intl.NumberFormat("en-IN").format(value)}`;
};

export const isValidDate = (date: Date): boolean => {
  return date instanceof Date && !Number.isNaN(date.getTime());
};

export const dateTime = (date: Date): number => {
  return isValidDate(date) ? date.getTime() : 0;
};

export const formatDate = (date: Date): string => {
  if (!isValidDate(date)) return "N/A";

  return dayjs(date).utc().format("MMM-DD-YYYY").toUpperCase();
};

export const daysFromToday = (date: Date): number => {
  if (!isValidDate(date)) return 0;

  return Math.abs(
    dayjs(date).utc().diff(dayjs().utc(), "day")
  );
};

export const monthsAndDaysFromToday = (date: Date): string => {
  if (!isValidDate(date)) return "N/A";

  const today = dayjs().utc();
  const targetDate = dayjs(date).utc();

  const months = Math.abs(today.diff(targetDate, "month"));
  const days = Math.abs(today.diff(targetDate.add(months, "month"), "day"));

  return `${months} Month(s) and  ${days} Day(s)`;
};
