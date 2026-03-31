import { useWeatherContext } from '../context/useWeatherContext';
import { useTheme } from '../context/useTheme';
import { getCountryFlag, getWeatherIconUrl } from '../utils/weatherUtils';
import { DetailGrid } from './DetailGrid';

export function CurrentWeather() {
  const { weatherData, unit } = useWeatherContext();
  const { theme } = useTheme();

  if (!weatherData) return null;

  const { location, current } = weatherData;
  const countryFlag = getCountryFlag(location.country);
  const temperature = unit === 'F' ? Math.round(current.temp_f) : Math.round(current.temp_c);
  const weatherIcon = getWeatherIconUrl(current.condition.icon);

  return (
    <div className={`backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-8 transition-colors duration-500 ${
      theme === 'dark'
        ? 'bg-white/10 border border-white/20'
        : 'bg-white/40 border border-white/60'
    }`}>
      <div className="text-center">
        <h1 className={`text-2xl md:text-3xl font-semibold mb-1 ${
          theme === 'dark' ? 'text-white' : 'text-slate-900'
        }`}>
          {location.name} <span className="text-2xl">{countryFlag}</span>
        </h1>
        <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-white/60' : 'text-slate-600'}`}>
          {location.country}
        </p>
      </div>

      <div className="flex items-center justify-center gap-4 mb-2 w-full">
        <img
          src={weatherIcon}
          alt={current.condition.text}
          className="w-20 h-20 md:w-24 md:h-24"
        />
        <div className={`text-7xl md:text-8xl font-bold ${
          theme === 'dark' ? 'text-white' : 'text-slate-900'
        }`}>
          {temperature}°
        </div>
      </div>

      <p className={`text-center text-lg capitalize mb-2 ${
        theme === 'dark' ? 'text-white/80' : 'text-slate-700'
      }`}>
        {current.condition.text}
      </p>

      <DetailGrid />
    </div>
  );
}
