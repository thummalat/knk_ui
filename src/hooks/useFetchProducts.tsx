import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/fetchProducts";

export const useFetchProducts = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts(),
  });
  return { data, isLoading, isError };
};
