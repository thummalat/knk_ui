import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { InterestInfo, PersonData } from "../data/fin_data";
dayjs.extend(utc);

const DAYS_IN_YEAR = 365;

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

export const lenderSlug = (name: string): string =>
  name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const calculateInterestEarned = (info: InterestInfo): number =>
  Math.floor(
    (info.amountOwed * info.interest * daysFromToday(info.dateBorrowed)) /
      (100 * DAYS_IN_YEAR),
  );

export const calculatePersonFinData = (person: PersonData) => {
  const interestInfo = person.interestInfo.map((info) => ({
    ...info,
    interestEarned: calculateInterestEarned(info),
  }));

  const principal = interestInfo.reduce(
    (total, { amountOwed }) => total + amountOwed,
    0,
  );
  const totalInterestedEarned = interestInfo.reduce(
    (total, { interestEarned }) => total + (interestEarned || 0),
    0,
  );
  const totalInterestedPaid = person.paymentInfo
    .filter((payment) => payment.paymentType?.toLowerCase() === "interest")
    .reduce((total, { amountPaid }) => total + amountPaid, 0);

  return {
    ...person,
    interestInfo,
    principal,
    totalInterestedEarned,
    totalInterestedPaid,
  };
};
