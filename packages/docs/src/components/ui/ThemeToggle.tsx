import { useEffect, useId, useRef, useState } from 'react';

type Mode = 'auto' | 'sunshine' | 'moonlight';

const MODES: { value: Mode; label: string }[] = [
  { value: 'auto', label: 'Auto (system)' },
  { value: 'sunshine', label: 'Light' },
  { value: 'moonlight', label: 'Dark' },
];

function ThemeIcon({ mode }: { mode: Mode }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {mode === 'auto' && <><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8M12 17v4" /></>}
      {mode === 'sunshine' && <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5" /></>}
      {mode === 'moonlight' && <path d="M21 13A9 9 0 0 1 11 3a9 9 0 1 0 10 10Z" />}
    </svg>
  );
}

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
  const id = useId();
  const menuId = `${id}-theme-menu`;
  const menuRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>('auto');
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

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
    <div className="dropdown dropdown-block-end" data-theme-toggle="">
      <button
        type="button"
        className="appbar-nav"
        aria-label={`Theme preference: ${MODES.find(option => option.value === mode)!.label}`}
        aria-controls={menuId}
        aria-expanded={open}
        popoverTarget={menuId}
        disabled={!mounted}
      >
        <ThemeIcon mode={mode} />
      </button>
      <div
        ref={menuRef}
        id={menuId}
        className="dropdown-content"
        popover="auto"
        role="radiogroup"
        aria-label="Theme preference"
        onToggle={event => setOpen(event.currentTarget.matches(':popover-open'))}
      >
        {MODES.map(({ value, label }) => {
          const optionId = `${id}-theme-${value}`;
          return (
            <div key={value}>
              <input
                type="radio"
                name={`${id}-theme-mode`}
                value={value}
                id={optionId}
                className="theme-controller-item"
                checked={mounted ? mode === value : value === 'auto'}
                onChange={() => handleChange(value)}
                onClick={() => menuRef.current?.hidePopover()}
              />
              <label htmlFor={optionId} className="theme-controller-label popover-menu-item justify-start">
                <ThemeIcon mode={value} />
                {label}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
