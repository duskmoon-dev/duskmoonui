import { useEffect, useState } from 'react';

type Mode = 'auto' | 'sunshine' | 'moonlight';

const MODES: { value: Mode; icon: string; label: string }[] = [
  { value: 'auto', icon: '💻', label: 'Auto (system)' },
  { value: 'sunshine', icon: '☀️', label: 'Light' },
  { value: 'moonlight', icon: '🌙', label: 'Dark' },
];

function resolveTheme(mode: Mode): string {
  if (mode === 'auto') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'moonlight'
      : 'sunshine';
  }
  return mode;
}

function applyTheme(mode: Mode) {
  document.documentElement.setAttribute('data-theme', resolveTheme(mode));
}

function readMode(): Mode {
  const stored = localStorage.getItem('theme-mode');
  if (stored === 'auto' || stored === 'sunshine' || stored === 'moonlight') {
    return stored;
  }
  return 'auto';
}

export const ThemeToggle = () => {
  const [mode, setMode] = useState<Mode>('auto');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = readMode();
    setMode(saved);
    applyTheme(saved);
  }, []);

  // Listen for OS color scheme changes when in auto mode
  useEffect(() => {
    if (!mounted) return;

    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (readMode() === 'auto') {
        applyTheme('auto');
      }
    };

    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [mounted]);

  const handleChange = (newMode: Mode) => {
    setMode(newMode);
    localStorage.setItem('theme-mode', newMode);
    applyTheme(newMode);
  };

  return (
    <div
      className="theme-controller theme-controller-icon theme-controller-sm"
      role="radiogroup"
      aria-label="Theme preference"
      data-theme-toggle=""
    >
      {MODES.map(({ value, icon, label }) => {
        const id = `theme-${value}`;
        return (
          <span key={value}>
            <input
              type="radio"
              name="theme-mode"
              value={value}
              id={id}
              className="theme-controller-item"
              checked={mounted ? mode === value : value === 'auto'}
              onChange={() => handleChange(value)}
            />
            <label htmlFor={id} className="theme-controller-label" title={label}>
              <span aria-hidden="true">{icon}</span>
              <span className="sr-only">{label}</span>
            </label>
          </span>
        );
      })}
    </div>
  );
};
