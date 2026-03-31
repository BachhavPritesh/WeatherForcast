import { useWeatherContext } from '../context/useWeatherContext';
import { useTheme } from '../context/useTheme';
import { getDayName, getWeatherIconUrl } from '../utils/weatherUtils';

export function ForecastCard({ forecast }) {
  const { unit } = useWeatherContext();
  const { theme } = useTheme();

  const dayName = getDayName(forecast.date);
  const icon = getWeatherIconUrl(forecast.day.condition.icon);
  const minTemp = unit === 'F' ? Math.round(forecast.day.mintemp_f) : Math.round(forecast.day.mintemp_c);
  const maxTemp = unit === 'F' ? Math.round(forecast.day.maxtemp_f) : Math.round(forecast.day.maxtemp_c);

  return (
    <div className={`min-w-[120px] backdrop-blur-md rounded-2xl p-4 text-center transition-all duration-300 hover:scale-105 flex-shrink-0 ${
      theme === 'dark'
        ? 'bg-white/10 border border-white/20 hover:bg-white/15'
        : 'bg-white/30 border border-white/40 hover:bg-white/50'
    }`}>
      <div className={`font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{dayName}</div>
      <img src={icon} alt={forecast.day.condition.text} className="w-12 h-12 mx-auto mb-2" />
      <div className={`text-sm ${theme === 'dark' ? 'text-white/70' : 'text-slate-600'}`}>
        <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{maxTemp}°</span> / {minTemp}°
      </div>
    </div>
  );
}
