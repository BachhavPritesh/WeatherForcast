import { useCallback, useEffect } from 'react';
import { useWeather } from '../hooks/useWeather';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ThemeContext } from './ThemeContext.js';
import { WeatherContext } from './WeatherContext.js';

export function WeatherProvider({ children }) {
  const {
    weatherData,
    forecastData,
    loading,
    error,
    fetchWeatherByCity,
    fetchWeatherByCoords
  } = useWeather();

  const [unit, setUnit] = useLocalStorage('weatherUnit', 'C');
  const [recentSearches, setRecentSearches] = useLocalStorage('recentSearches', []);
  const [theme, setTheme] = useLocalStorage('weatherTheme', 'dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useLocalStorage('mobileMenuOpen', false);

  const toggleUnit = useCallback(() => {
    setUnit(prev => (prev === 'C' ? 'F' : 'C'));
  }, [setUnit]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, [setTheme]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, [setMobileMenuOpen]);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, [setMobileMenuOpen]);

  const addRecentSearch = useCallback((city) => {
    setRecentSearches(prev => {
      const filtered = prev.filter(
        item => item.name.toLowerCase() !== city.name.toLowerCase()
      );
      return [city, ...filtered].slice(0, 5);
    });
  }, [setRecentSearches]);

  const handleFetchWeather = useCallback((city) => {
    fetchWeatherByCity(city);
    addRecentSearch({ name: city });
    closeMobileMenu();
  }, [fetchWeatherByCity, addRecentSearch, closeMobileMenu]);

  const handleGeolocation = useCallback(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        () => {
          fetchWeatherByCity('London');
        }
      );
    } else {
      fetchWeatherByCity('London');
    }
  }, [fetchWeatherByCoords, fetchWeatherByCity]);

  useEffect(() => {
    handleGeolocation();
  }, [handleGeolocation]);

  const weatherValue = {
    weatherData,
    forecastData,
    loading,
    error,
    unit,
    recentSearches,
    toggleUnit,
    fetchWeatherByCity: handleFetchWeather,
    fetchWeatherByCoords,
    handleGeolocation
  };

  const themeValue = {
    theme,
    toggleTheme,
    mobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu
  };

  return (
    <ThemeContext.Provider value={themeValue}>
      <WeatherContext.Provider value={weatherValue}>
        {children}
      </WeatherContext.Provider>
    </ThemeContext.Provider>
  );
}
