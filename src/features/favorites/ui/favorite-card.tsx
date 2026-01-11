import clsx from "clsx";
import { useState } from "react";
import { HiPencil, HiTrash } from "react-icons/hi";
import { IconButton, Input } from "../../../shared/ui";
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
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const updateFavoriteName = useFavoritesStore(
    (state) => state.updateFavoriteName
  );
  const { weather, forecast, name, id } = favorite;
  const { main, weather: weatherInfo } = weather;

  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(name);

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite({
      name,
      weather,
      forecast,
    });
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleSave = () => {
    updateFavoriteName({ id, name: editValue.trim() });
    setIsEditing(false);
    if (!editValue.trim()) setEditValue(name);
  };

  const handleCancel = () => {
    setEditValue(name);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <div
      className={clsx(
        "bg-white rounded-2xl p-4 shadow-lg border border-gray-100",
        "hover:shadow-xl transition-shadow duration-200 cursor-pointer",
        "relative",
        className
      )}
    >
      {!isEditing && (
        <div className="absolute top-4 right-4 flex gap-2 transition-opacity">
          <IconButton
            icon={HiPencil}
            size="sm"
            rounded="full"
            variant="dark"
            onClick={handleEdit}
            aria-label="이름 수정"
          />
          <IconButton
            icon={HiTrash}
            size="sm"
            rounded="full"
            variant="dark"
            onClick={handleRemove}
            aria-label="즐겨찾기에서 제거"
          />
        </div>
      )}

      <div className="mb-1">
        {isEditing ? (
          <Input
            autoFocus
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleCancel}
            onKeyDown={handleKeyDown}
            onClick={(e) => e.stopPropagation()}
            size="md"
            className="mb-3"
          />
        ) : (
          <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
        )}
        <p className="text-sm text-gray-500 capitalize">
          {weatherInfo[0].description}
        </p>
      </div>

      <div className="space-y-1">
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
