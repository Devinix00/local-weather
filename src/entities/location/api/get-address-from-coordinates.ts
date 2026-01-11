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

interface KakaoRoadAddress {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  road_name: string;
  underground_yn: string;
  main_building_no: string;
  sub_building_no: string;
  building_name: string;
  zone_no: string;
  x: string;
  y: string;
}

interface KakaoReverseGeocodeDocument {
  address: KakaoAddress;
  road_address: KakaoRoadAddress | null;
}

interface KakaoReverseGeocodeResponse {
  documents: KakaoReverseGeocodeDocument[];
  meta: {
    total_count: number;
  };
}

export interface AddressFromCoordinates {
  address: string;
  roadAddress: string | null;
  region1Depth: string;
  region2Depth: string;
  region3Depth: string;
}

export default async function getAddressFromCoordinates(
  location: Location
): Promise<AddressFromCoordinates | null> {
  const { data } = await apiInstance.get<KakaoReverseGeocodeResponse>(
    "https://dapi.kakao.com/v2/local/geo/coord2address.json",
    {
      params: {
        x: location.longitude,
        y: location.latitude,
      },
      headers: {
        Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
      },
    }
  );

  if (!data.documents.length) {
    return null;
  }

  const { address, road_address } = data.documents[0];

  return {
    address: address.address_name,
    roadAddress: road_address?.address_name || null,
    region1Depth: address.region_1depth_name,
    region2Depth: address.region_2depth_name,
    region3Depth: address.region_3depth_name,
  };
}

