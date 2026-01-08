import { HiCloud, HiMenu } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import PATH from "../../app/router/path";
import { IconButton } from "../../shared/ui";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full bg-linear-to-r from-blue-500 via-cyan-500 to-teal-500 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <IconButton
              icon={HiCloud}
              size="md"
              rounded="full"
              onClick={() => navigate(PATH.HOME)}
            />
            <h1 className="text-2xl font-bold text-white drop-shadow-md">
              Local Weather
            </h1>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to={PATH.HOME}
              className="text-white/90 hover:text-white font-medium transition-colors"
            >
              홈
            </Link>
            <Link
              to={""}
              className="text-white/90 hover:text-white font-medium transition-colors"
            >
              즐겨찾기
            </Link>
          </nav>

          <IconButton
            icon={HiMenu}
            size="md"
            rounded="lg"
            className="md:hidden"
            aria-label="메뉴"
          />
        </div>
      </div>
    </header>
  );
}
