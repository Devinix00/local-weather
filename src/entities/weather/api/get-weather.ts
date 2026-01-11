import apiInstance from "../../../shared/api/instance";
import type { Location } from "../../location/types";

export interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface WeatherResponse {
  coord: WeatherData["coord"];
  weather: WeatherData["weather"];
  base: string;
  main: WeatherData["main"];
  visibility: number;
  wind: WeatherData["wind"];
  clouds: WeatherData["clouds"];
  dt: number;
  sys: WeatherData["sys"];
  timezone: number;
  id: number;
  name: string;
  cod: number;
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
    coord: data.coord,
    weather: data.weather,
    base: data.base,
    main: data.main,
    visibility: data.visibility,
    wind: data.wind,
    clouds: data.clouds,
    dt: data.dt,
    sys: data.sys,
    timezone: data.timezone,
    id: data.id,
    name: data.name,
    cod: data.cod,
  };
}

