export interface InterestInfo {
  amountOwed: number;
  interest: number;
  dateBorrowed: Date;
  remarks: string;
  interestEarned?: number;
  interestEarnedPerDay?: number;
  payments?: PaymentInfo[];
}

export interface PaymentInfo {
  dateOfPayment: Date;
  amountPaid: number;
  paymentType?: string;
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
        paymentType: "interest",
      },
      {
        dateOfPayment: new Date("2025-03-04T00:00:00.000Z"),
        amountPaid: 62000,
        paymentType: "interest",
      },
      {
        dateOfPayment: new Date("2025-03-02T00:00:00.000Z"),
        amountPaid: 20000,
        paymentType: "interest",
      },
      {
        dateOfPayment: new Date("2025-03-16T00:00:00.000Z"),
        amountPaid: 3200,
        paymentType: "interest",
      },
      {
        dateOfPayment: new Date("2026-02-24T00:00:00.000Z"),
        amountPaid: 100000,
        paymentType: "interest",
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
    ],
    paymentInfo: [
      {
        dateOfPayment: new Date("2025-06-10T00:00:00.000Z"),
        amountPaid: 50000,
        paymentType: "interest",
      },
      {
        dateOfPayment: new Date("2025-07-01T00:00:00.000Z"),
        amountPaid: 40000,
        paymentType: "interest",
      },
      {
        dateOfPayment: new Date("2025-06-11T00:00:00.000Z"),
        amountPaid: 70000,
        paymentType: "Principal",
      },
      {
        dateOfPayment: new Date("2025-06-12T00:00:00.000Z"),
        amountPaid: 28000,
        paymentType: "Principal",
      },
    ],
  },
  Rajesh: {
    name: "Rajesh Challagolla",
    interestInfo: [
      {
        amountOwed: 1000000,
        interest: 12,
        dateBorrowed: new Date("2024-08-26T00:00:00.000Z"),
        remarks: "Interest will be paid every month to Dad",
      },
    ],
    paymentInfo: [
      {
        dateOfPayment: new Date("2024-09-27T00:00:00.000Z"),
        amountPaid: 10000,
        paymentType: "interest",
      },
      {
        dateOfPayment: new Date("2024-10-29T00:00:00.000Z"),
        amountPaid: 10000,
        paymentType: "interest",
      },
      {
        dateOfPayment: new Date("2024-11-27T00:00:00.000Z"),
        amountPaid: 10000,
        paymentType: "interest",
      },

      {
        dateOfPayment: new Date("2024-12-30T00:00:00.000Z"),
        amountPaid: 10000,
        paymentType: "interest",
      },
      {
        dateOfPayment: new Date("2025-01-30T00:00:00.000Z"),
        amountPaid: 10000,
        paymentType: "interest",
      },
      {
        dateOfPayment: new Date("2025-02-30T00:00:00.000Z"),
        amountPaid: 10000,
        paymentType: "interest",
      },
    ],
  }
};

export default finData;
