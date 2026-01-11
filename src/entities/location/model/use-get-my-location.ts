import { useEffect, useState } from "react";
import type { Location } from "../types";

export default function useGetMyLocation() {
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<GeolocationPositionError | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      Promise.resolve().then(() => {
        setError({
          code: 0,
          message: "",
          PERMISSION_DENIED: 1,
          POSITION_UNAVAILABLE: 2,
          TIMEOUT: 3,
        } as GeolocationPositionError);
        setLoading(false);
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      },
      {
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 300000,
      }
    );
  }, []);

  return { location, loading, error };
}
