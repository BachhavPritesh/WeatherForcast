import { useWeatherContext } from '../context/useWeatherContext';
import { useTheme } from '../context/useTheme';

export function UnitToggle() {
  const { unit, toggleUnit } = useWeatherContext();
  const { theme } = useTheme();

  return (
    <div className="flex justify-center mb-6">
      <div className={`inline-flex rounded-full backdrop-blur-md p-1 ${
        theme === 'dark'
          ? 'bg-white/10 border border-white/20'
          : 'bg-white/50 border border-slate-300'
      }`}>
        <button
          onClick={() => toggleUnit()}
          className={`px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
            unit === 'C'
              ? theme === 'dark'
                ? 'bg-white/20 text-white'
                : 'bg-slate-200 text-slate-900'
              : theme === 'dark'
                ? 'text-white/50 hover:text-white'
                : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          °C
        </button>
        <button
          onClick={() => toggleUnit()}
          className={`px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
            unit === 'F'
              ? theme === 'dark'
                ? 'bg-white/20 text-white'
                : 'bg-slate-200 text-slate-900'
              : theme === 'dark'
                ? 'text-white/50 hover:text-white'
                : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          °F
        </button>
      </div>
    </div>
  );
}
