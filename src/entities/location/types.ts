export interface Location {
  latitude: number;
  longitude: number;
}

export interface LocationState {
  location: Location | null;
  loading: boolean;
  error: GeolocationPositionError | null;
}

