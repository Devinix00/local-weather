import clsx from "clsx";
import dayjs from "dayjs";
import type { WeatherData, ForecastItem } from "../../entities/weather";

interface WeatherCardProps {
  address: string;
  weather: WeatherData;
  forecast?: ForecastItem[];
  className?: string;
}

export default function WeatherCard({
  address,
  weather,
  forecast,
  className,
}: WeatherCardProps) {
  const { main, weather: weatherInfo, wind } = weather;

  const todayForecast = forecast
    ?.filter((item) => {
      const itemDate = dayjs(item.dt_txt);
      const diffHours = itemDate.diff(dayjs(), "hour");
      return diffHours >= 0 && diffHours <= 24;
    })
    .slice(0, 8);

  return (
    <div
      className={clsx(
        "bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex flex-col justify-center w-full",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-2xl font-bold text-gray-900 mb-1">{address}</h3>
        <p className="font-bold capitalize">{weatherInfo[0].description}</p>
      </div>

      <div className="space-y-3 mb-6">
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

      {todayForecast && todayForecast.length > 0 && (
        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">
            시간대별 기온
          </h4>
          <div className="space-y-2">
            {todayForecast.map((item, index) => (
              <div
                key={`${item.dt}-${index}`}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">
                    {dayjs(item.dt_txt).format("M월 D일")}
                  </span>
                  <span className="text-gray-900 font-medium">
                    {dayjs(item.dt_txt).format("HH:mm")}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-900 font-medium">
                    {Math.round(item.main.temp)}°C
                  </span>
                  <span className="text-gray-500 text-xs">
                    {item.weather[0].description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
