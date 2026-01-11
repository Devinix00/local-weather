import clsx from "clsx";
import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "glass";
  className?: string;
}

const sizeClasses = {
  sm: "h-9 px-1.5 text-sm",
  md: "h-11 px-2 text-base",
  lg: "h-13 px-3 text-lg",
};

const variantClasses = {
  default:
    "bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
  glass:
    "bg-white/80 backdrop-blur-md border border-white/20 text-gray-900 placeholder:text-gray-500 focus:bg-white/95 focus:border-white/40 focus:ring-2 focus:ring-white/30 shadow-lg",
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ size = "md", variant = "default", className, ...props }, ref) => (
    <input
      ref={ref}
      className={clsx(
        "w-full rounded-xl transition-all duration-200 outline-none",
        sizeClasses[size],
        variantClasses[variant],
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "hover:border-gray-300",
        className
      )}
      {...props}
    />
  )
);

Input.displayName = "Input";

export default Input;
