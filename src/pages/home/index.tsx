import { Dropdown, DropdownItem, SearchInput } from "../../shared/ui";
import {
  useAddressSearch,
  useGetAddressFromCoordinates,
  useGetMyLocation,
} from "../../entities/location";

export default function HomePage() {
  const { location } = useGetMyLocation();
  const { data: geocodedLocation } = useGetAddressFromCoordinates(location);

  const {
    searchValue,
    inputRef,
    isDropdownOpen,
    setIsDropdownOpen,
    filteredAddresses,
    handleInputChange,
    handleInputFocus,
    handleSelectAddress,
  } = useAddressSearch();

  // const getErrorMessage = () => {
  //   if (!error) return null;

  //   switch (error.code) {
  //     case error.PERMISSION_DENIED:
  //       return "위치 권한이 거부되었습니다. 브라우저 설정에서 위치 권한을 허용해주세요.";
  //     case error.POSITION_UNAVAILABLE:
  //       return "위치 정보를 사용할 수 없습니다.";
  //     case error.TIMEOUT:
  //       return "위치 정보 요청 시간이 초과되었습니다.";
  //     default:
  //       return "위치 정보를 가져오는 중 오류가 발생했습니다.";
  //   }
  // };

  return (
    <div className="py-4">
      <div className="relative">
        <SearchInput
          ref={inputRef}
          value={searchValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder="위치를 입력해주세요 ex) 은평구, 갈현동"
        />
        <Dropdown
          isOpen={isDropdownOpen && filteredAddresses.length > 0}
          onClose={() => setIsDropdownOpen(false)}
          triggerRef={inputRef}
        >
          {filteredAddresses.map((address: string) => (
            <DropdownItem
              key={address}
              onClick={() => handleSelectAddress(address)}
            >
              <p>{address}</p>
            </DropdownItem>
          ))}
        </Dropdown>
      </div>
    </div>
  );
}
