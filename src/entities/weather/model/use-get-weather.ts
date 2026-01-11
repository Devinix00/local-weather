import { useQuery } from "@tanstack/react-query";
import getWeather from "../api/get-weather";
import type { Location } from "../../location/types";

export const weatherQueryKeys = {
  byLocation: (location: Location) => [
    "weather",
    `${location.latitude},${location.longitude}`,
  ],
} as const;

export default function useGetWeather(location: Location | null) {
  return useQuery({
    queryKey: weatherQueryKeys.byLocation(
      location ?? { latitude: 0, longitude: 0 }
    ),
    queryFn: () => getWeather(location!),
    enabled: !!location,
  });
}

