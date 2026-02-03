import { useEffect, useState } from 'react';

const THEMES = ['sunshine', 'moonlight', 'ocean', 'forest', 'sunset'] as const;
type Theme = (typeof THEMES)[number];

const THEME_META: Record<Theme, { icon: string; label: string }> = {
  sunshine: { icon: '☀️', label: 'light' },
  moonlight: { icon: '🌙', label: 'dark' },
  ocean: { icon: '🌊', label: 'ocean dark' },
  forest: { icon: '🌲', label: 'forest' },
  sunset: { icon: '🌅', label: 'sunset' },
};

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>('sunshine');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme && THEMES.includes(savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  const cycleTheme = () => {
    const currentIndex = THEMES.indexOf(theme);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    const newTheme = THEMES[nextIndex];
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

  const meta = THEME_META[theme];
  const nextTheme = THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length];
  const nextMeta = THEME_META[nextTheme];

  return (
    <button
      onClick={cycleTheme}
      className="theme-toggle"
      aria-label={`Switch to ${nextMeta.label} theme`}
      title={`Switch to ${nextMeta.label} mode (${nextTheme})`}
    >
      <span className="theme-icon">
        {meta.icon}
      </span>
      <span className="sr-only">
        Current theme: {theme}
      </span>
    </button>
  );
};
