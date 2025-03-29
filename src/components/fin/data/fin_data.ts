export interface InterestInfo {
  amountOwed: number;
  interest: number;
  dateBorrowed: Date;
  remarks: string;
  interestEarned?: number;
  interestEarnedPerDay?: number;
}

export interface PaymentInfo {
  dateOfPayment: Date;
  amountPaid: number;
}

export interface PersonData {
  name: string;
  interestInfo: InterestInfo[];
  paymentInfo: PaymentInfo[];
}

export type TFinData = {
  [key: string]: PersonData;
};

export type TOtherInvestments = {
  name: string;
  dateInvested: Date;
  amountInvested: number;
  remarks: string;
};

export const otherFinData = [
  {
    name: "Gold investment",
    dateInvested: new Date("2024-09-01T00:00:00.000Z"),
    amountInvested: 2960000,
    remarks: "400 grams, ₹7400 per gram",
  },
  {
    name: "Shadnagar Land",
    dateInvested: new Date("2024-06-24T00:00:00.000Z"),
    amountInvested: 4000000,
    remarks: "266.6 sq yards, 15000 per sq yard, Plot #175",
  },
  {
    name: "Machilipatnam Land",
    dateInvested: new Date("2024-09-01T00:00:00.000Z"),
    amountInvested: 700000,
    remarks: "4500 per sq yard",
  },
];

const finData = {
  Praveen: {
    name: "Praveen",
    interestInfo: [
      {
        amountOwed: 1000000,
        interest: 6,
        dateBorrowed: new Date("2024-01-01T00:00:00.000Z"),
        remarks: "",
      },
      {
        amountOwed: 900000,
        interest: 8,
        dateBorrowed: new Date("2024-08-14T00:00:00.000Z"),
        remarks: "",
      },
    ],
    paymentInfo: [
      {
        dateOfPayment: new Date("2025-03-04T00:00:00.000Z"),
        amountPaid: 1400,
      },
      {
        dateOfPayment: new Date("2025-03-04T00:00:00.000Z"),
        amountPaid: 62000,
      },
      {
        dateOfPayment: new Date("2025-03-02T00:00:00.000Z"),
        amountPaid: 20000,
      },
      {
        dateOfPayment: new Date("2025-03-16T00:00:00.000Z"),
        amountPaid: 3200,
      },
    ],
  },
  Dinesh: {
    name: "Dinesh",
    interestInfo: [
      {
        amountOwed: 1000000,
        interest: 6,
        dateBorrowed: new Date("2024-08-15T00:00:00.000Z"),
        remarks: "",
      },
      {
        amountOwed: 500000,
        interest: 8,
        dateBorrowed: new Date("2024-08-15T00:00:00.000Z"),
        remarks: "",
      },
      {
        amountOwed: 98000,
        interest: 0,
        dateBorrowed: new Date("2024-04-14T00:00:00.000Z"),
        remarks: "Sreethan school fee - through PhonePe",
      },
    ],
    paymentInfo: [],
  },
  Rajesh: {
    name: "Rajesh Challagolla",
    interestInfo: [
      {
        amountOwed: 1000000,
        interest: 12,
        dateBorrowed: new Date("2024-08-26T00:00:00.000Z"),
        remarks: "",
      },
    ],
    paymentInfo: [
      {
        dateOfPayment: new Date("2024-09-27T00:00:00.000Z"),
        amountPaid: 10000,
      },
      {
        dateOfPayment: new Date("2024-10-29T00:00:00.000Z"),
        amountPaid: 10000,
      },
      {
        dateOfPayment: new Date("2024-11-27T00:00:00.000Z"),
        amountPaid: 10000,
      },
     
      {
        dateOfPayment: new Date("2024-12-30T00:00:00.000Z"),
        amountPaid: 10000,
      },
      {
        dateOfPayment: new Date("2025-01-30T00:00:00.000Z"),
        amountPaid: 10000,
      },
      {
        dateOfPayment: new Date("2025-02-30T00:00:00.000Z"),
        amountPaid: 10000,
      },
    ],
  },
  "Sreenivasa Rao (Gandhi Nagaram)": {
    name: "Sreenivasa Rao (Gandhi Nagaram)",
    interestInfo: [
      {
        amountOwed: 456608,
        interest: 12,
        dateBorrowed: new Date("2025-02-10T00:00:00.000Z"),
        remarks: "From Prakesh Teksky",
      },
      {
        amountOwed: 100000,
        interest: 12,
        dateBorrowed: new Date("2025-03-02T00:00:00.000Z"),
        remarks: "From Vineela Ponugoti (86.48 exchange rate)",
      },
      {
        amountOwed: 100000,
        interest: 12,
        dateBorrowed: new Date("2025-03-03T00:00:00.000Z"),
        remarks: "From Vineela Ponugoti (86.48 exchange rate)",
      },
      {
        amountOwed: 50000,
        interest: 12,
        dateBorrowed: new Date("2025-03-05T00:00:00.000Z"),
        remarks: "From Vineela Ponugoti (86.48 exchange rate)",
      },
      {
        amountOwed: 250000,
        interest: 12,
        dateBorrowed: new Date("2025-03-07T00:00:00.000Z"),
        remarks: "From Reshma",
      },
      {
        amountOwed: 43400,
        interest: 12,
        dateBorrowed: new Date("2025-03-06T00:00:00.000Z"),
        remarks: "PhonePe from Thanuz",
      },
    ],
    paymentInfo: [],
  },
  Bank: {
    name: "FD",
    interestInfo: [
      {
        amountOwed: 700000,
        interest: 8,
        dateBorrowed: new Date("2024-09-01T00:00:00.000Z"),
        remarks: "This is FD, auto interest deposit in to bank account",
      },
    ],
    paymentInfo: [],
  },
};

export default finData;
