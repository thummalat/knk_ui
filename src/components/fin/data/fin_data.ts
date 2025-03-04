export interface InterestInfo {
  amountOwed: number;
  interest: number;
  dateBorrowed: Date | null;
  remarks: string;
}

export interface PaymentInfo {
  // Define according to your actual data structure
}

export interface PersonData {
  name: string;
  interestInfo: InterestInfo[];
  paymentInfo: PaymentInfo[];
}

export type TFinData = {
    [key: string]: PersonData;
  };

const finData = {
  "Praveen": {
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
    paymentInfo: [],
  },
  "Dinesh": {
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
    paymentInfo: [],
  },
  "Rajesh": {
    name: "Rajesh Challagolla",
    interestInfo: [
      {
        amountOwed: 1000000,
        interest: 12,
        dateBorrowed: new Date("2024-08-26T00:00:00.000Z"),
        remarks: "",
      },
    ],
    paymentInfo: [],
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
        remarks: "From Vineela Ponugoti",
      },
      {
        amountOwed: 100000,
        interest: 12,
        dateBorrowed: new Date("2025-03-03T00:00:00.000Z"),
        remarks: "From Vineela Ponugoti",
      },
      {
        amountOwed: 250000,
        interest: 12,
        dateBorrowed: new Date("2025-03-07T00:00:00.000Z"),
        remarks: "Reshma transferred",
      },
    ],
    paymentInfo: [],
  },
};

export default finData;
