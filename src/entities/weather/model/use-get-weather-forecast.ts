import { useQuery } from "@tanstack/react-query";
import getWeatherForecast from "../api/get-weather-forecast";
import type { Location } from "../../location/types";

export const weatherForecastQueryKeys = {
  byLocation: (location: Location) => [
    "weatherForecast",
    `${location.latitude},${location.longitude}`,
  ],
} as const;

export default function useGetWeatherForecast(location: Location | null) {
  return useQuery({
    queryKey: weatherForecastQueryKeys.byLocation(
      location ?? { latitude: 0, longitude: 0 }
    ),
    queryFn: () => getWeatherForecast(location!),
    enabled: !!location,
  });
}

