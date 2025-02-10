import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "../api/fetchOrders";

export const useFetchOrders = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: () => fetchOrders(),
  });
  return { data, isLoading, isError };
};
