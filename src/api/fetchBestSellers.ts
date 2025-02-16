import axios from "axios";

export const fetchBestSellers = async () => {
  const { data: bestSellersData } = await axios.get(
    "https://knk-two.vercel.app/api/bestsellers"
  );
  return bestSellersData.map((p: any) => ({ ...p, id: p._id }));
};
