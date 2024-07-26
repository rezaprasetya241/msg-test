import { Konsumsi } from "@/lib/types/konsumsi/konsumsi";
import { Room } from "@/lib/types/rooms/rooms";
import { Unit } from "@/lib/types/units/unit";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const api = process.env.REACT_APP_MASTER_API;
const apiKonsumsi = process.env.REACT_APP_KONSUMSI_API;
export const useUnits = () => {
  return useQuery<Unit[], Error>({
    queryKey: ["units"],
    queryFn: () =>
      axios.get(`${api}/masterOffice`).then((res) => {
        return res.data;
      }),

    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useRooms = () => {
  return useQuery<Room[], Error>({
    queryKey: ["rooms"],
    queryFn: () =>
      axios.get(`${api}/masterMeetingRooms`).then((res) => {
        return res.data;
      }),

    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useKonsumsi = () => {
  return useQuery<Konsumsi[], Error>({
    queryKey: ["konsumsi"],
    queryFn: () =>
      axios.get(`${apiKonsumsi}/masterJenisKonsumsi`).then((res) => {
        return res.data;
      }),

    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
