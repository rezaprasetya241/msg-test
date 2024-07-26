import { Period } from "@/lib/types/booking/booking";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const apiBooking = process.env.REACT_APP_KONSUMSI_API;

export const useBookings = () => {
  return useQuery<Period[], Error>({
    queryKey: ["bookings"],
    queryFn: () =>
      axios.get(`${apiBooking}/summaryBookings`).then((res) => {
        return res.data;
      }),

    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
