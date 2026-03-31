import { Droplets, Wind, Thermometer, Gauge } from 'lucide-react';
import { useWeatherContext } from '../context/useWeatherContext';
import { useTheme } from '../context/useTheme';

export function DetailGrid() {
  const { weatherData, unit } = useWeatherContext();
  const { theme } = useTheme();

  if (!weatherData) return null;

  const { current } = weatherData;

  const details = [
    { icon: Droplets, label: 'Humidity', value: current.humidity, unit: '%' },
    { icon: Wind, label: 'Wind Speed', value: current.wind_kph, unit: ' km/h' },
    { icon: Thermometer, label: 'Feels Like', value: unit === 'F' ? Math.round(current.feelslike_f) : Math.round(current.feelslike_c), unit: `°${unit}` },
    { icon: Gauge, label: 'Pressure', value: current.pressure_mb, unit: ' mb' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      {details.map((detail) => (
        <div
          key={detail.label}
          className={`backdrop-blur-md rounded-2xl p-4 text-center transition-all duration-300 hover:scale-105 ${
            theme === 'dark'
              ? 'bg-white/10 border border-white/20 hover:bg-white/15'
              : 'bg-white/30 border border-white/40 hover:bg-white/50'
          }`}
        >
          <detail.icon className={`w-6 h-6 mx-auto mb-1 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} strokeWidth={2} />
          <div className={`text-sm mb-1 ${theme === 'dark' ? 'text-white/60' : 'text-slate-600'}`}>{detail.label}</div>
          <div className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            {detail.value}{detail.unit}
          </div>
        </div>
      ))}
    </div>
  );
}
