import { AnimatePresence, motion } from "framer-motion";
import { HiCloud, HiHome, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import PATH from "../../app/router/path";
import { IconButton } from "../../shared/ui";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: HiHome, label: "홈", path: PATH.HOME },
  { icon: HiCloud, label: "즐겨찾기", path: PATH.FAVORITES },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-(--z-overlay)"
            onClick={onClose}
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
            }}
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl flex flex-col z-(--z-sidebar)"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">메뉴</h2>
              <IconButton
                icon={HiX}
                size="md"
                rounded="full"
                variant="dark"
                onClick={onClose}
                aria-label="메뉴 닫기"
              />
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">
              {menuItems.map((item) => {
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-700 hover:bg-linear-to-r hover:from-blue-50 hover:to-cyan-50 hover:text-blue-600 transition-all duration-200 group"
                  >
                    <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-blue-100 transition-colors">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="p-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">Local Weather</p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
