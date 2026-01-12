import { useIsFetching } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";

export default function RootLoading() {
  const isFetching = useIsFetching();

  if (!isFetching) return null;

  return (
    <div
      className="fixed inset-0 z-(--z-root-loading) flex items-center justify-center bg-black/50 backdrop-blur-sm"
      aria-label="로딩 중"
      role="status"
    >
      <div className="flex flex-col items-center gap-4">
        <ClipLoader color="#3b82f6" size={50} />
      </div>
    </div>
  );
}
