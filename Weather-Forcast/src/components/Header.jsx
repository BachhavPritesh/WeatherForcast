import { Menu } from 'lucide-react';
import { useTheme } from '../context/useTheme';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  const { toggleMobileMenu, theme } = useTheme();

  return (
    <header className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleMobileMenu}
          className={`lg:hidden p-2 rounded-full ${theme === 'dark' ? 'bg-white/10 hover:bg-white/20' : 'bg-slate-200 hover:bg-slate-300'} transition-all duration-300`}
        >
          <Menu className={`w-6 h-6 ${theme === 'dark' ? 'text-white' : 'text-slate-700'}`} />
        </button>
        <h1 className={`text-xl md:text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          Weather Forecast
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden md:block">
          <ThemeToggle />
        </div>
        <div className="w-10 md:hidden"></div>
      </div>
    </header>
  );
}
