import { X, Sun, Moon, MapPin } from 'lucide-react';
import { useTheme } from '../context/useTheme';
import { useWeatherContext } from '../context/useWeatherContext';

export function MobileMenu() {
  const { mobileMenuOpen, closeMobileMenu, theme, toggleTheme } = useTheme();
  const { handleGeolocation, recentSearches, fetchWeatherByCity } = useWeatherContext();

  if (!mobileMenuOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeMobileMenu} />
      <div className={`absolute right-0 top-0 h-full w-80 ${theme === 'dark' ? 'bg-[#1a1a2e]/95' : 'bg-white/95'} backdrop-blur-md shadow-2xl p-6`}>
        <div className="flex justify-between items-center mb-8">
          <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Settings
          </h2>
          <button
            onClick={closeMobileMenu}
            className={`p-2 rounded-full ${theme === 'dark' ? 'bg-white/10 hover:bg-white/20' : 'bg-slate-200 hover:bg-slate-300'} transition-all duration-300`}
          >
            <X className={`w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-slate-700'}`} />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className={`text-sm font-medium mb-3 ${theme === 'dark' ? 'text-white/60' : 'text-slate-600'}`}>
              Appearance
            </h3>
            <button
              onClick={toggleTheme}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl ${theme === 'dark' ? 'bg-white/10 border border-white/20 hover:bg-white/15' : 'bg-slate-100 border border-slate-200 hover:bg-slate-200'} transition-all duration-300`}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
              <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </span>
            </button>
          </div>

          <div>
            <h3 className={`text-sm font-medium mb-3 ${theme === 'dark' ? 'text-white/60' : 'text-slate-600'}`}>
              Location
            </h3>
            <button
              onClick={() => {
                handleGeolocation();
                closeMobileMenu();
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl ${theme === 'dark' ? 'bg-white/10 border border-white/20 hover:bg-white/15' : 'bg-slate-100 border border-slate-200 hover:bg-slate-200'} transition-all duration-300`}
            >
              <MapPin className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
              <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Use Current Location
              </span>
            </button>
          </div>

          {recentSearches.length > 0 && (
            <div>
              <h3 className={`text-sm font-medium mb-3 ${theme === 'dark' ? 'text-white/60' : 'text-slate-600'}`}>
                Recent Searches
              </h3>
              <div className="space-y-2">
                {recentSearches.map((city, index) => (
                  <button
                    key={`${city.name}-${index}`}
                    onClick={() => {
                      fetchWeatherByCity(city.name);
                      closeMobileMenu();
                    }}
                    className={`w-full text-left px-4 py-3 rounded-2xl ${theme === 'dark' ? 'bg-white/10 border border-white/20 hover:bg-white/15' : 'bg-slate-100 border border-slate-200 hover:bg-slate-200'} transition-all duration-300`}
                  >
                    <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      {city.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
