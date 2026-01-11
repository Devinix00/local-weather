import clsx from "clsx";
import { HiBookmark } from "react-icons/hi";
import type { FavoriteLocation } from "../model";
import { useFavoritesStore } from "../model";

interface FavoriteCardProps {
  favorite: FavoriteLocation;
  className?: string;
}

export default function FavoriteCard({
  favorite,
  className,
}: FavoriteCardProps) {
  const { toggleFavorite } = useFavoritesStore();
  const { weather, forecast, name } = favorite;
  const { main, weather: weatherInfo } = weather;

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite({
      name,
      weather,
      forecast,
    });
  };

  return (
    <div
      className={clsx(
        "bg-white rounded-2xl p-6 shadow-lg border border-gray-100",
        "hover:shadow-xl transition-shadow duration-200 cursor-pointer",
        "relative group",
        className
      )}
    >
      <button
        onClick={handleRemove}
        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full bg-gray-100 hover:bg-gray-200"
        aria-label="즐겨찾기에서 제거"
      >
        <HiBookmark className="w-6 h-6 text-blue-500" />
      </button>

      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
        <p className="text-sm text-gray-500 capitalize">
          {weatherInfo[0].description}
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">온도</span>
          <span className="text-2xl font-bold text-gray-900">
            {Math.round(main.temp)}°C
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">최고/최저</span>
          <span className="text-gray-900 font-medium">
            {Math.round(main.temp_max)}°C / {Math.round(main.temp_min)}°C
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">습도</span>
          <span className="text-gray-900 font-medium">{main.humidity}%</span>
        </div>
      </div>
    </div>
  );
}
