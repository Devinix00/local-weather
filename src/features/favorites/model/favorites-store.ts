import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { WeatherData } from "../../../entities/weather/api/get-weather";
import type { WeatherForecast } from "../../../entities/weather/api/get-weather-forecast";
import toast from "react-hot-toast";
import { FAVORITES_STORAGE_KEY, MAX_FAVORITES } from "../config/constants";

export interface FavoriteLocation {
  id: string;
  name: string;
  weather: WeatherData;
  forecast: WeatherForecast;
}

interface ToggleFavoritePayload {
  name: string;
  weather: WeatherData;
  forecast: WeatherForecast;
}

interface FavoritesState {
  favorites: FavoriteLocation[];
  toggleFavorite: (payload: ToggleFavoritePayload) => void;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: ({ name, weather, forecast }: ToggleFavoritePayload) => {
        const { favorites } = get();
        const id = `${weather.coord.lat}-${weather.coord.lon}`;
        const exists = favorites.some((fav) => fav.id === id);

        if (exists) {
          set({
            favorites: favorites.filter((fav) => fav.id !== id),
          });
          toast.success("즐겨찾기에서 삭제되었습니다.");
        } else {
          if (favorites.length >= MAX_FAVORITES) {
            toast.error("즐겨찾기는 최대 6개까지 추가할 수 있습니다.");
            return;
          }

          set({
            favorites: [{ id, name, weather, forecast }, ...favorites],
          });
          toast.success("즐겨찾기에 추가되었습니다.");
        }
      },
      clearFavorites: () => {
        set({ favorites: [] });
        toast.success("모든 즐겨찾기가 삭제되었습니다.");
      },
    }),
    {
      name: FAVORITES_STORAGE_KEY,
    }
  )
);
