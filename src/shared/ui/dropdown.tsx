import { useEffect, useRef } from "react";
import clsx from "clsx";
import type { ReactNode } from "react";

export interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  maxHeight?: string;
  align?: "left" | "right" | "center";
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export default function Dropdown({
  isOpen,
  onClose,
  children,
  className,
  maxHeight = "max-h-60",
  align = "left",
  triggerRef,
}: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        triggerRef?.current &&
        !triggerRef.current.contains(target)
      ) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  const alignClasses = {
    left: "left-0",
    right: "right-0",
    center: "left-1/2 -translate-x-1/2",
  };

  return (
    <div
      ref={dropdownRef}
      className={clsx(
        "absolute mt-1 w-full",
        "bg-white border border-gray-200 rounded-xl shadow-lg",
        "overflow-hidden",
        alignClasses[align],
        className
      )}
      style={{ zIndex: 35 }}
    >
      <div className={clsx("overflow-y-auto overscroll-contain", maxHeight)}>
        {children}
      </div>
    </div>
  );
}
