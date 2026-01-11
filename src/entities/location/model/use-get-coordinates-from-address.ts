import { useQuery } from "@tanstack/react-query";
import getCoordinatesFromAddress from "../api/get-coordinates-from-address";

export const coordinatesQueryKeys = {
  byAddress: (address: string) => ["coordinates", address],
} as const;

export default function useGetCoordinatesFromAddress(address: string | null) {
  return useQuery({
    queryKey: coordinatesQueryKeys.byAddress(address ?? ""),
    queryFn: () => getCoordinatesFromAddress(address ?? ""),
    enabled: !!address,
  });
}
