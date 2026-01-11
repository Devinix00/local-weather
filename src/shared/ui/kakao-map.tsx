import { Map, MapMarker } from "react-kakao-maps-sdk";
import type { Location } from "../../entities/location/types";
import clsx from "clsx";
import { useKakaoLoader } from "../../shared/lib";
import { useEffect, useRef } from "react";

interface KakaoMapProps {
  location: Location | null;
  className?: string;
}

export default function KakaoMap({ location, className }: KakaoMapProps) {
  const { isLoaded } = useKakaoLoader();
  const mapRef = useRef<kakao.maps.Map | null>(null);

  useEffect(() => {
    if (mapRef.current && location) {
      const moveLatLon = new kakao.maps.LatLng(
        location.latitude,
        location.longitude
      );
      mapRef.current.panTo(moveLatLon);
    }
  }, [location]);

  if (!location || !isLoaded) return null;

  return (
    <Map
      id="map"
      center={{
        lat: location.latitude,
        lng: location.longitude,
      }}
      level={3}
      className={clsx("rounded-2xl", className)}
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
