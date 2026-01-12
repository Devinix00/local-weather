import { HiCloud, HiHome } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import PATH from "../../app/router/path";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100dvh-var(--header-height)-var(--footer-height))]">
      <div className="text-center">
        <div className="flex justify-center">
          <HiCloud className="w-32 h-32 text-gray-300 animate-pulse" />
        </div>

        <h1 className="text-4xl font-bold text-gray-900">404</h1>
        <h2 className="text-xl font-semibold text-gray-700 mt-2">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="text-gray-500 text-sm mt-3">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다. URL을
          확인하시거나 홈으로 돌아가주세요.
        </p>

        <div className="flex flex-row gap-4 justify-center items-center mt-3">
          <button
            onClick={() => navigate(PATH.HOME)}
            className="flex items-center text-sm gap-2 bg-linear-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-xl font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <HiHome className="w-4 h-4" />
            홈으로 돌아가기
          </button>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-sm gap-2 bg-white border-2 border-gray-200 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
          >
            이전 페이지
          </button>
        </div>
      </div>
    </div>
  );
}
