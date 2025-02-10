import axios from "axios";

export const fetchOrders = async () => {
  const { data: ordersData } = await axios.get(
    "https://knk-two.vercel.app/api/getallorders"
  );
  const { soldProductDetails, totalSoldCost } = ordersData;
  return {
    totalSoldCost,
    soldProductDetails: soldProductDetails.map((p: any) => ({
      ...p,
      id: p._id,
    })),
  };
};
