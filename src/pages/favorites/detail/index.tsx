import { useParams, useNavigate } from "react-router-dom";
import { useFavoritesStore } from "../../../features/favorites";
import WeatherCard from "../../../shared/ui/weather-card";
import PATH from "../../../app/router/path";

export default function FavoriteDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const favorites = useFavoritesStore((state) => state.favorites);

  const favorite = favorites.find((fav) => fav.id === id);

  return (
    <>
      {favorite ? (
        <div className="py-4">
          <WeatherCard
            address={favorite.name}
            weather={favorite.weather}
            forecast={favorite.forecast.list}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[calc(100dvh-var(--header-height)-var(--footer-height))]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              즐겨찾기를 찾을 수 없습니다
            </h2>
            <button
              onClick={() => navigate(PATH.FAVORITE.LIST)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              즐겨찾기로 돌아가기
            </button>
          </div>
        </div>
      )}
    </>
  );
}
