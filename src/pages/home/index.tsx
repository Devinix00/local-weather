import {
  useAddressSearch,
  useGetMyLocation,
  useGetAddressFromCoordinates,
} from "../../entities/location";
import { useGetWeather, useGetWeatherForecast } from "../../entities/weather";
import {
  Dropdown,
  DropdownItem,
  KakaoMap,
  SearchInput,
  WeatherCard,
  SaveButton,
} from "../../shared/ui";
import { useFavoritesStore } from "../../features/favorites";

export default function HomePage() {
  const { location: myLocation, error: myLocationError } = useGetMyLocation();
  const {
    searchValue,
    inputRef,
    isDropdownOpen,
    setIsDropdownOpen,
    filteredAddresses,
    handleInputChange,
    handleInputFocus,
    handleSelectAddress,
    handlePressEnter,
    handleCompositionStart,
    handleCompositionEnd,
    selectedLocation,
  } = useAddressSearch();

  const getMyLocationErrorMessage = () => {
    if (!myLocationError) return null;

    switch (myLocationError.code) {
      case myLocationError.PERMISSION_DENIED:
        return "위치 권한이 거부되었습니다. 브라우저 설정에서 위치 권한을 허용해주세요.";
      case myLocationError.POSITION_UNAVAILABLE:
        return "위치 정보를 사용할 수 없습니다.";
      case myLocationError.TIMEOUT:
        return "위치 정보 요청 시간이 초과되었습니다.";
      default:
        return "위치 정보를 가져오는 중 오류가 발생했습니다.";
    }
  };

  const myLocationErrorMessage = getMyLocationErrorMessage();
  const location = selectedLocation || myLocation;
  const { data: weather } = useGetWeather(location);
  const { data: forecast } = useGetWeatherForecast(location);
  const { data: addressData } = useGetAddressFromCoordinates(location);

  const { favorites, toggleFavorite } = useFavoritesStore();

  const favoriteId = weather
    ? `${weather.coord.lat}-${weather.coord.lon}`
    : null;
  const isSaved = favoriteId
    ? favorites.some((fav) => fav.id === favoriteId)
    : false;

  const handleSaveClick = () => {
    if (!weather || !forecast) return;

    const name = searchValue || addressData?.address || weather.name;
    toggleFavorite({ name, weather, forecast });
  };

  return (
    <div className="pb-4">
      <div className="pt-4 pb-0 sticky top-(--header-height) z-(--z-search-input) bg-white rounded-b-xl shadow-[0_4px_12px_2px_rgba(255,255,255,0.8)]">
        <div className="relative">
          <SearchInput
            ref={inputRef}
            value={searchValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onKeyDown={handlePressEnter}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            placeholder="위치를 입력해주세요 ex) 은평구, 갈현동"
            className="w-full"
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
      {!myLocationError && !myLocationErrorMessage && (
        <div className="flex md:flex-row flex-col gap-4 mt-4 md:h-[564px]">
          {location && (
            <KakaoMap
              location={location}
              className="w-full md:w-1/2 rounded-3xl h-[350px] md:h-auto"
            />
          )}
          {weather && forecast && addressData?.address && (
            <WeatherCard
              address={addressData.address}
              weather={weather}
              forecast={forecast.list}
              className="w-full md:h-full md:w-1/2"
            />
          )}
        </div>
      )}
      {myLocationErrorMessage && (
        <div className="text-red-500 mt-2">{myLocationErrorMessage}</div>
      )}
      {location && weather === null && (
        <div className="text-red-500 mt-2">
          해당 장소의 정보가 제공되지 않습니다.
        </div>
      )}
      {location && weather && forecast && (
        <SaveButton
          isSaved={isSaved}
          onClick={handleSaveClick}
          disabled={!weather || !forecast}
          className="fixed bottom-4 right-4 z-(--z-save-button)"
        />
      )}
    </div>
  );
}
