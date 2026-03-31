import { useTheme } from '../context/useTheme';

export function SkeletonLoader({ type = 'current' }) {
  const { theme } = useTheme();
  
  const textClass = theme === 'dark' ? 'bg-white/20' : 'bg-slate-300/50';

  if (type === 'current') {
    return (
      <div className={`backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-8 ${theme === 'dark' ? 'bg-white/10 border border-white/20' : 'bg-white/40 border border-white/60'}`}>
        <div className={`skeleton h-8 w-48 rounded-lg mb-6 mx-auto ${textClass}`} />
        <div className={`skeleton h-24 w-40 rounded-lg mb-4 mx-auto ${textClass}`} />
        <div className={`skeleton h-6 w-32 rounded-lg mb-2 mx-auto ${textClass}`} />
        <div className={`skeleton h-5 w-24 rounded-lg mb-8 mx-auto ${textClass}`} />
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className={`skeleton h-24 rounded-2xl ${textClass}`} />
          <div className={`skeleton h-24 rounded-2xl ${textClass}`} />
          <div className={`skeleton h-24 rounded-2xl ${textClass}`} />
          <div className={`skeleton h-24 rounded-2xl ${textClass}`} />
        </div>
      </div>
    );
  }

  if (type === 'forecast') {
    return (
      <div className="flex gap-4 overflow-x-auto pb-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`skeleton min-w-[120px] h-36 rounded-2xl flex-shrink-0 ${textClass}`}
          />
        ))}
      </div>
    );
  }

  return null;
}
