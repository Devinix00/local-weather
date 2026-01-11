import { useQuery } from "@tanstack/react-query";
import getAddressFromCoordinates from "../api/get-address-from-coordinates";
import type { Location } from "../types";

export const addressFromCoordinatesQueryKeys = {
  byLocation: (location: Location) => [
    "addressFromCoordinates",
    `${location.latitude},${location.longitude}`,
  ],
} as const;

export default function useGetAddressFromCoordinates(
  location: Location | null
) {
  return useQuery({
    queryKey: addressFromCoordinatesQueryKeys.byLocation(
      location ?? { latitude: 0, longitude: 0 }
    ),
    queryFn: () => {
      if (location) return getAddressFromCoordinates(location);
    },
    enabled: !!location,
  });
}
