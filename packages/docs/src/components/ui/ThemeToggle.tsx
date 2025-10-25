import { useEffect, useState } from 'react';

type Theme = 'sunshine' | 'moonlight';

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>('sunshine');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'sunshine' ? 'moonlight' : 'sunshine';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <button className="theme-toggle" aria-label="Toggle theme">
        <span className="theme-icon">🌙</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Switch to ${theme === 'sunshine' ? 'moonlight' : 'sunshine'} theme`}
      title={`Switch to ${theme === 'sunshine' ? 'dark' : 'light'} mode`}
    >
      <span className="theme-icon">
        {theme === 'sunshine' ? '🌙' : '☀️'}
      </span>
      <span className="sr-only">
        Current theme: {theme}
      </span>
    </button>
  );
};
