import {
  useGetMyLocation,
  useGetCoordinatesFromAddress,
} from "../../entities/location";
import { SearchInput } from "../../shared/ui";

export default function HomePage() {
  const { location } = useGetMyLocation();
  const {
    data: geocodedLocation,
    isLoading,
    error,
  } = useGetCoordinatesFromAddress("갈현로 120-11");

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
      <SearchInput placeholder="주소를 입력해주세요." />
    </div>
  );
}
