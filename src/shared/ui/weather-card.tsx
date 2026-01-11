import clsx from "clsx";
import type { WeatherData } from "../../entities/weather";

interface WeatherCardProps {
  weather: WeatherData;
  className?: string;
}

export default function WeatherCard({ weather, className }: WeatherCardProps) {
  const { main, weather: weatherInfo, wind, name } = weather;

  return (
    <div
      className={clsx(
        "bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex flex-col justify-center w-full",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-2xl font-bold text-gray-900 mb-1">{name}</h3>
        <p className="font-bold">{weatherInfo[0].description}</p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">현재 온도</span>
          <span className="text-3xl font-bold text-gray-900">
            {Math.round(main.temp)}°C
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">체감 온도</span>
          <span className="text-gray-900 font-medium">
            {Math.round(main.feels_like)}°C
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">최고/최저</span>
          <span className="text-gray-900 font-medium">
            {Math.round(main.temp_max)}°C / {Math.round(main.temp_min)}°C
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">습도</span>
          <span className="text-gray-900 font-medium">{main.humidity}%</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">풍속</span>
          <span className="text-gray-900 font-medium">{wind.speed} m/s</span>
        </div>
      </div>
    </div>
  );
}
