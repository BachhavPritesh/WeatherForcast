import { useWeatherContext } from '../context/useWeatherContext';
import { useTheme } from '../context/useTheme';
import { ForecastCard } from './ForecastCard';
import { SkeletonLoader } from './SkeletonLoader';

export function Forecast() {
  const { forecastData, loading } = useWeatherContext();
  const { theme } = useTheme();

  if (loading) {
    return (
      <div className="mt-6">
        <h2 className={`text-xl font-semibold mb-4 text-center ${
          theme === 'dark' ? 'text-white' : 'text-slate-900'
        }`}>
          5-Day Forecast
        </h2>
        <SkeletonLoader type="forecast" />
      </div>
    );
  }

  if (!forecastData) return null;

  const dailyForecasts = forecastData.forecast.forecastday;

  return (
    <div className="mt-6">
      <h2 className={`text-xl font-semibold mb-4 text-center ${
        theme === 'dark' ? 'text-white' : 'text-slate-900'
      }`}>
        5-Day Forecast
      </h2>
      <div className={`flex gap-4 overflow-x-auto pb-2 custom-scrollbar px-1 ${theme === 'light' ? 'light-scrollbar' : ''}`}>
        {dailyForecasts.map((forecast, index) => (
          <ForecastCard key={`${forecast.date}-${index}`} forecast={forecast} />
        ))}
      </div>
    </div>
  );
}
