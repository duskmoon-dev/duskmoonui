'use client';

import { useState } from 'react';

export default function Home() {
  const [theme, setTheme] = useState('sunshine');

  const toggleTheme = () => {
    const newTheme = theme === 'sunshine' ? 'moonlight' : 'sunshine';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <main className="min-h-screen bg-surface p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-on-surface">
              DuskMoonUI + Next.js
            </h1>
            <p className="text-on-surface-variant mt-2">
              A starter template showcasing all components
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className="btn btn-tonal"
          >
            {theme === 'sunshine' ? '🌙 Moonlight' : '☀️ Sunshine'}
          </button>
        </div>

        {/* Buttons Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-on-surface">Buttons</h2>
          <div className="flex flex-wrap gap-3">
            <button className="btn btn-primary">Primary</button>
            <button className="btn btn-secondary">Secondary</button>
            <button className="btn btn-tertiary">Tertiary</button>
            <button className="btn btn-outlined">Outlined</button>
            <button className="btn btn-text">Text</button>
            <button className="btn btn-tonal">Tonal</button>
            <button className="btn btn-success">Success</button>
            <button className="btn btn-error">Error</button>
          </div>
        </section>

        {/* Cards Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-on-surface">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Default Card</h3>
                <p className="card-subtitle">This is a default surface container card</p>
              </div>
            </div>

            <div className="card card-high">
              <div className="card-body">
                <h3 className="card-title">Elevated Card</h3>
                <p className="card-subtitle">High elevation with shadow</p>
              </div>
              <div className="card-actions">
                <button className="btn btn-text">Action</button>
              </div>
            </div>

            <div className="card card-outlined">
              <div className="card-body">
                <h3 className="card-title">Outlined Card</h3>
                <p className="card-subtitle">With border outline</p>
              </div>
            </div>
          </div>
        </section>

        {/* Inputs Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-on-surface">Form Inputs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="input-group">
              <label className="input-label">Filled Input</label>
              <input
                type="text"
                className="input"
                placeholder="Enter text..."
              />
              <span className="input-helper">Helper text goes here</span>
            </div>

            <div className="input-group">
              <label className="input-label">Outlined Input</label>
              <input
                type="text"
                className="input input-outlined"
                placeholder="Enter text..."
              />
            </div>

            <div className="input-group">
              <label className="input-label">Select</label>
              <select className="select">
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Textarea</label>
              <textarea
                className="textarea"
                placeholder="Enter your message..."
              />
            </div>
          </div>
        </section>

        {/* Badges Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-on-surface">Badges</h2>
          <div className="flex flex-wrap gap-3 items-center">
            <span className="badge badge-primary">Primary</span>
            <span className="badge badge-secondary">Secondary</span>
            <span className="badge badge-tertiary">Tertiary</span>
            <span className="badge badge-success">Success</span>
            <span className="badge badge-error">Error</span>
            <span className="badge badge-warning">Warning</span>
            <span className="badge badge-info">Info</span>
            <span className="badge badge-tonal">Tonal</span>
            <span className="badge badge-outlined">Outlined</span>
          </div>
        </section>

        {/* Alerts Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-on-surface">Alerts</h2>
          <div className="space-y-3">
            <div className="alert alert-info">
              <div className="alert-content">
                <div className="alert-title">Info Alert</div>
                <div className="alert-description">
                  This is an informational message
                </div>
              </div>
            </div>

            <div className="alert alert-success">
              <div className="alert-content">
                <div className="alert-title">Success Alert</div>
                <div className="alert-description">
                  Operation completed successfully!
                </div>
              </div>
            </div>

            <div className="alert alert-warning">
              <div className="alert-content">
                <div className="alert-title">Warning Alert</div>
                <div className="alert-description">
                  Please review this warning message
                </div>
              </div>
            </div>

            <div className="alert alert-error">
              <div className="alert-content">
                <div className="alert-title">Error Alert</div>
                <div className="alert-description">
                  An error occurred. Please try again
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
