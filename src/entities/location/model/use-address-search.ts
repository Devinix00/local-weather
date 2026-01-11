import { useState, useRef, useMemo } from "react";
import { useDebounce } from "../../../shared/lib";
import koreaDistricts from "../../../../korea_districts.json";

export default function useAddressSearch() {
  const [searchValue, setSearchValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedSearchValue = useDebounce({ value: searchValue, delay: 300 });

  const filteredAddresses = useMemo(() => {
    if (!debouncedSearchValue.trim()) {
      return (koreaDistricts as string[]).slice(0, 30);
    }

    const searchTerm = debouncedSearchValue.toLowerCase();
    const filtered = (koreaDistricts as string[]).filter((address) =>
      address.toLowerCase().includes(searchTerm)
    );

    return filtered;
  }, [debouncedSearchValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    setIsDropdownOpen(true);
  };

  const handleInputFocus = () => {
    setIsDropdownOpen(true);
  };

  const handleSelectAddress = (address: string) => {
    setSearchValue(address);
    setIsDropdownOpen(false);
    inputRef.current?.blur();
  };

  return {
    searchValue,
    setSearchValue,
    inputRef,
    isDropdownOpen,
    setIsDropdownOpen,
    filteredAddresses,
    handleInputChange,
    handleInputFocus,
    handleSelectAddress,
  };
}
