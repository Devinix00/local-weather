import apiInstance from "../../../shared/api/instance";
import type { Location } from "../../location/types";

export interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  rain?: {
    "3h": number;
  };
  snow?: {
    "3h": number;
  };
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export interface City {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface WeatherForecast {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: City;
}

interface ForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: Array<{
    dt: number;
    main: ForecastItem["main"];
    weather: ForecastItem["weather"];
    clouds: ForecastItem["clouds"];
    wind: ForecastItem["wind"];
    visibility: number;
    pop: number;
    rain?: ForecastItem["rain"];
    snow?: ForecastItem["snow"];
    sys: ForecastItem["sys"];
    dt_txt: string;
  }>;
  city: City;
}

export default async function getWeatherForecast(
  location: Location
): Promise<WeatherForecast | null> {
  const { data } = await apiInstance.get<ForecastResponse>(
    "/data/2.5/forecast",
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
    cod: data.cod,
    message: data.message,
    cnt: data.cnt,
    list: data.list.map((item) => ({
      dt: item.dt,
      main: item.main,
      weather: item.weather,
      clouds: item.clouds,
      wind: item.wind,
      visibility: item.visibility,
      pop: item.pop,
      rain: item.rain,
      snow: item.snow,
      sys: item.sys,
      dt_txt: item.dt_txt,
    })),
    city: data.city,
  };
}
