import { useFavoritesStore } from "../../features/favorites";
import { FavoriteCard } from "../../features/favorites/ui";

export default function FavoritesPage() {
  const favorites = useFavoritesStore((state) => state.favorites);

  return (
    <>
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[calc(100dvh-var(--header-height)-var(--footer-height))]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              즐겨찾기가 없습니다
            </h2>
            <p className="text-gray-600">
              홈에서 장소를 검색하여 즐겨찾기에 추가해보세요.
            </p>
          </div>
        </div>
      ) : (
        <div className="py-4">
          <h1 className="text-2xl font-bold text-gray-900">즐겨찾기</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {favorites.map((favorite) => (
              <FavoriteCard key={favorite.id} favorite={favorite} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
