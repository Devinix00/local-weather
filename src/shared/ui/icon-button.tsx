import clsx from "clsx";
import type { IconType } from "react-icons";
import type { ButtonHTMLAttributes } from "react";
import { forwardRef } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconType;
  size?: "sm" | "md" | "lg";
  rounded?: "lg" | "full";
  variant?: "light" | "dark";
}

const sizeClasses = {
  sm: "p-1.5",
  md: "p-2",
  lg: "p-3",
};

const iconSizeClasses = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

const roundedClasses = {
  lg: "rounded-lg",
  full: "rounded-full",
};

const variantClasses = {
  light: "bg-white/20 text-white backdrop-blur-sm hover:bg-white/30",
  dark: "bg-gray-800/20 text-gray-700 backdrop-blur-sm hover:bg-gray-800/30",
};

function IconButton(
  {
    icon: Icon,
    size = "md",
    rounded = "lg",
    variant = "light",
    className,
    ...props
  }: IconButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <button
      ref={ref}
      className={clsx(
        "transition-all duration-200",
        variantClasses[variant],
        sizeClasses[size],
        roundedClasses[rounded],
        className
      )}
      {...props}
    >
      <Icon className={iconSizeClasses[size]} />
    </button>
  );
}

export default forwardRef<HTMLButtonElement, IconButtonProps>(IconButton);
