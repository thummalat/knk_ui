import { useQuery } from "@tanstack/react-query";
import { fetchBestSellers } from "../api/fetchBestSellers";

export const useFetchBestSellers = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["bestSellers"],
    queryFn: () => fetchBestSellers(),
  });
  return { data, isLoading, isError };
};
