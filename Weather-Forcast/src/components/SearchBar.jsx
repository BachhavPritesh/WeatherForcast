import { Search, X } from 'lucide-react';
import { useWeatherContext } from '../context/useWeatherContext';
import { useTheme } from '../context/useTheme';
import { useDebounce } from '../hooks/useDebounce';
import { useState, useCallback } from 'react';

export function SearchBar() {
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue, 300);
  const { fetchWeatherByCity, loading } = useWeatherContext();
  const { theme } = useTheme();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (debouncedValue.trim()) {
      fetchWeatherByCity(debouncedValue.trim());
      setInputValue('');
    }
  }, [debouncedValue, fetchWeatherByCity]);

  const handleClear = useCallback(() => {
    setInputValue('');
  }, []);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto mb-6">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search city..."
            disabled={loading}
            className={`w-full px-6 py-3 pr-12 rounded-full backdrop-blur-md focus:outline-none focus:ring-2 transition-all duration-300 disabled:opacity-50 ${
              theme === 'dark'
                ? 'bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-white/40 focus:ring-white/20'
                : 'bg-white/50 border border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-400 focus:ring-blue-200'
            }`}
          />
          {inputValue && (
            <button
              type="button"
              onClick={handleClear}
              className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${
                theme === 'dark' ? 'text-white/50 hover:text-white' : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        <button
          type="submit"
          disabled={loading || !inputValue.trim()}
          className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
            theme === 'dark'
              ? 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
              : 'bg-white/50 border border-slate-300 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}
