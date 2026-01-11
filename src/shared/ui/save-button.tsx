import { HiBookmark } from "react-icons/hi";
import clsx from "clsx";

interface SaveButtonProps {
  isSaved: boolean;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export default function SaveButton({
  isSaved,
  onClick,
  disabled = false,
  className,
}: SaveButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "fixed bottom-4 right-4 z-50",
        "w-14 h-14 rounded-full",
        "flex items-center justify-center",
        "shadow-lg transition-all duration-200",
        "hover:scale-110 active:scale-95",
        isSaved
          ? "bg-blue-500 text-white hover:bg-blue-600"
          : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      aria-label={isSaved ? "즐겨찾기에서 제거" : "즐겨찾기에 추가"}
    >
      <HiBookmark className={clsx("w-6 h-6", isSaved && "fill-current")} />
    </button>
  );
}
