import apiInstance from "../../../shared/api/instance";
import type { Location } from "../../location/types";

export interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  name: string;
}

interface WeatherResponse {
  main: WeatherData["main"];
  weather: WeatherData["weather"];
  wind: WeatherData["wind"];
  name: string;
}

export default async function getWeather(
  location: Location
): Promise<WeatherData | null> {
  const { data } = await apiInstance.get<WeatherResponse>(
    "/data/2.5/weather",
    {
      params: {
        lat: location.latitude,
        lon: location.longitude,
        appid: import.meta.env.VITE_WEATHER_MAP_API_KEY,
        units: "metric",
        lang: "kr",
      },
    }
  );

  return {
    main: data.main,
    weather: data.weather,
    wind: data.wind,
    name: data.name,
  };
}

