import { apiInstance } from "../../../shared/api";
import type { Location } from "../types";

interface KakaoAddress {
  address_name: string;
  b_code: string;
  h_code: string;
  main_address_no: string;
  mountain_yn: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_h_name: string;
  region_3depth_name: string;
  sub_address_no: string;
  x: string;
  y: string;
}

interface KakaoGeocodeDocument {
  address: KakaoAddress;
  address_name: string;
  address_type: string;
  road_address: null | unknown;
  x: string;
  y: string;
}

interface KakaoGeocodeResponse {
  documents: KakaoGeocodeDocument[];
  meta: {
    is_end: boolean;
    pageable_count: number;
    total_count: number;
  };
}

export default async function getCoordinatesFromAddress(
  address: string
): Promise<Location | null> {
  const { data } = await apiInstance.get<KakaoGeocodeResponse>(
    "https://dapi.kakao.com/v2/local/search/address.json",
    {
      params: {
        query: address,
      },
      headers: {
        Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
      },
    }
  );

  const { x, y } = data.documents[0];
  return { latitude: Number(y), longitude: Number(x) };
}
