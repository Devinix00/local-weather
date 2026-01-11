import { Map, MapMarker } from "react-kakao-maps-sdk";
import type { Location } from "../../entities/location/types";
import clsx from "clsx";
import { useKakaoLoader } from "../../shared/lib";

interface KakaoMapProps {
  location: Location | null;
  className?: string;
}

export default function KakaoMap({ location, className }: KakaoMapProps) {
  const { isLoaded } = useKakaoLoader();

  if (!location || !isLoaded) return null;

  return (
    <Map
      id="map"
      center={{
        lat: location?.latitude,
        lng: location?.longitude,
      }}
      level={3}
      className={clsx("w-full rounded-2xl md:w-1/2 h-[350px]", className)}
    >
      <MapMarker
        position={{
          lat: location.latitude,
          lng: location.longitude,
        }}
      />
    </Map>
  );
}
