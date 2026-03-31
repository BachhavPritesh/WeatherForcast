import { useWeatherContext } from '../context/useWeatherContext';
import { useTheme } from '../context/useTheme';

export function RecentSearches() {
  const { recentSearches, fetchWeatherByCity } = useWeatherContext();
  const { theme } = useTheme();

  if (recentSearches.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-6">
      {recentSearches.map((city, index) => (
        <button
          key={`${city.name}-${index}`}
          onClick={() => fetchWeatherByCity(city.name)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-md transition-all duration-300 ${
            theme === 'dark'
              ? 'bg-white/10 border border-white/20 text-white/80 hover:bg-white/20 hover:text-white'
              : 'bg-white/50 border border-slate-300 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
          }`}
        >
          {city.name}
        </button>
      ))}
    </div>
  );
}
