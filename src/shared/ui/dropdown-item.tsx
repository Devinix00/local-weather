import clsx from "clsx";
import type { HTMLAttributes } from "react";

export interface DropdownItemProps extends HTMLAttributes<HTMLDivElement> {
  isSelected?: boolean;
  isHighlighted?: boolean;
}

export default function DropdownItem({
  children,
  isSelected = false,
  isHighlighted = false,
  className,
  ...props
}: DropdownItemProps) {
  return (
    <div
      className={clsx(
        "px-4 py-2.5 cursor-pointer transition-colors duration-150",
        "text-gray-900 text-sm",
        isHighlighted && "bg-blue-50 text-blue-900",
        !isHighlighted && "hover:bg-gray-50",
        isSelected && "bg-blue-100 text-blue-900 font-medium",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
