import clsx from "clsx";
import type { InputHTMLAttributes } from "react";
import { forwardRef, useState } from "react";
import { FiSearch } from "react-icons/fi";

interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "glass";
  showClearButton?: boolean;
}

const sizeClasses = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-base",
  lg: "h-13 px-5 text-lg",
};

const iconSizeClasses = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

const variantClasses = {
  default:
    "bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
  glass:
    "bg-white/80 backdrop-blur-md border border-white/20 text-gray-900 placeholder:text-gray-500 focus:bg-white/95 focus:border-white/40 focus:ring-2 focus:ring-white/30 shadow-lg",
};

function SearchInput(
  {
    size = "md",
    variant = "default",
    className,
    value,
    onChange,
    ...props
  }: SearchInputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={clsx(
        "relative flex items-center transition-all duration-200",
        className
      )}
    >
      <div className="absolute left-0 pl-3 pointer-events-none">
        <FiSearch
          className={clsx(
            iconSizeClasses[size],
            "text-gray-400 transition-colors duration-200",
            isFocused && "text-blue-500",
            variant === "glass" && isFocused && "text-gray-600"
          )}
        />
      </div>

      <input
        ref={ref}
        type="search"
        value={value}
        onChange={onChange}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
        className={clsx(
          "w-full rounded-xl transition-all duration-200 outline-none",
          "pl-10",
          sizeClasses[size],
          variantClasses[variant],
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "hover:border-gray-300",
          "[&::-webkit-search-cancel-button]:hidden",
          "[&::-webkit-search-decoration]:hidden",
          "[&::-moz-search-clear-button]:hidden"
        )}
        {...props}
      />
    </div>
  );
}

export default forwardRef<HTMLInputElement, SearchInputProps>(SearchInput);
