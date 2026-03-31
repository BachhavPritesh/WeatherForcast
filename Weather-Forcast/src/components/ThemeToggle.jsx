import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/useTheme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/20 transition-all duration-300"
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-yellow-400" strokeWidth={2} />
      ) : (
        <Moon className="w-5 h-5 text-slate-700" strokeWidth={2} />
      )}
    </button>
  );
}
