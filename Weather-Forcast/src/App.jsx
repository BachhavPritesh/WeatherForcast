import { WeatherProvider } from './context/WeatherContext.jsx';
import { useWeatherContext } from './context/useWeatherContext.js';
import { useTheme } from './context/useTheme.js';
import { SearchBar } from './components/SearchBar';
import { CurrentWeather } from './components/CurrentWeather';
import { Forecast } from './components/Forecast';
import { UnitToggle } from './components/UnitToggle';
import { SkeletonLoader } from './components/SkeletonLoader';
import { Header } from './components/Header';
import { MobileMenu } from './components/MobileMenu';

function WeatherApp() {
  const { theme } = useTheme();
  const { loading, error, weatherData } = useWeatherContext();

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]' 
        : 'bg-gradient-to-br from-blue-100 via-white to-blue-200'
    } relative overflow-hidden`}>
      {theme === 'dark' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-blob" />
          <div className="absolute top-40 -left-40 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-blob animate-blob-delay-1" />
          <div className="absolute -bottom-40 left-1/2 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-blob animate-blob-delay-2" />
        </div>
      )}
      {theme === 'light' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-200/40 rounded-full blur-3xl animate-blob" />
          <div className="absolute top-1/2 -left-20 w-64 h-64 bg-yellow-200/40 rounded-full blur-3xl animate-blob animate-blob-delay-1" />
        </div>
      )}

      <MobileMenu />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-6 md:py-12 min-h-screen flex flex-col">
        <Header />

        <SearchBar />
        <UnitToggle />

        {error && (
          <div className={`backdrop-blur-md border rounded-2xl p-4 mb-6 text-center ${
            theme === 'dark' 
              ? 'bg-red-500/20 border-red-500/40' 
              : 'bg-red-100 border-red-300'
          }`}>
            <p className={theme === 'dark' ? 'text-red-200' : 'text-red-700'}>{error}</p>
          </div>
        )}

        {loading && !weatherData && (
          <>
            <SkeletonLoader type="current" />
            <SkeletonLoader type="forecast" />
          </>
        )}

        {weatherData && !loading && (
          <>
            <CurrentWeather />
            <Forecast />
          </>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <WeatherProvider>
      <WeatherApp />
    </WeatherProvider>
  );
}

export default App;
