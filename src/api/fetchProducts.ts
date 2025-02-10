import axios from "axios";

export const fetchProducts = async () => {
  const { data: productsData } = await axios.get(
    "https://knk-two.vercel.app/api/getproducts"
  );
  return productsData.map((p: any) => ({ ...p, id: p._id }));
};
