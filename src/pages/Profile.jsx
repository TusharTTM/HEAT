import { useState } from 'react';
import { useSettings } from '../hooks/useSettings';
import { LucideIcon } from '../components/Layout';

function SettingRow({ label, description, control }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-3 border-b border-slate-100 dark:border-slate-700 last:border-0">
      <div className="flex-1 min-w-0">
        <p className="font-medium text-slate-900 dark:text-slate-100 truncate">{label}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{description}</p>
      </div>
      <div className="flex-shrink-0">{control}</div>
    </div>
  );
}

function Toggle({ checked, onChange, ariaLabel }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 focus:ring-offset-white ${
        checked ? 'bg-accent-600' : 'bg-slate-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
        aria-hidden="true"
      />
    </button>
  );
}

export default function Profile() {
  const { settings, updateSettings, toggleSetting, updateAlert } = useSettings();
  const [editedCity, setEditedCity] = useState(settings.city);
  const [editedRegion, setEditedRegion] = useState(settings.region);
  const [editedCountry, setEditedCountry] = useState(settings.country);

  const handleSaveLocation = () => {
    updateSettings({ city: editedCity, region: editedRegion, country: editedCountry });
  };

  return (
    <div className="space-y-6">
      {/* Header - page as long as content */}
      <header>
        <h1 className="text-2xl font-semibold text-slate-900">Profile</h1>
        <p className="text-sm text-slate-500 mt-1">Manage account and preferences</p>
      </header>

      <section className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" aria-labelledby="location-heading">
        <h2 id="location-heading" className="font-medium text-slate-900 dark:text-slate-100 mb-4">Location</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">City</label>
            <input
              type="text"
              id="city"
              value={editedCity}
              onChange={(e) => setEditedCity(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 focus:ring-offset-white focus:border-transparent text-sm"
            />
          </div>
          <div>
            <label htmlFor="region" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Region</label>
            <input
              type="text"
              id="region"
              value={editedRegion}
              onChange={(e) => setEditedRegion(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 focus:ring-offset-white focus:border-transparent text-sm"
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Country</label>
            <input
              type="text"
              id="country"
              value={editedCountry}
              onChange={(e) => setEditedCountry(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 focus:ring-offset-white focus:border-transparent text-sm"
            />
          </div>
        </div>
        <button
          onClick={handleSaveLocation}
          className="px-4 py-2 rounded-lg bg-accent-600 text-white text-sm font-medium hover:bg-accent-700 focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-950 transition-colors"
        >
          Save location
        </button>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">Current: {settings.city}, {settings.region}, {settings.country}</p>
      </section>

      <section className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" aria-labelledby="display-heading">
        <h2 id="display-heading" className="font-medium text-slate-900 dark:text-slate-100 mb-4">Display</h2>
        <div className="space-y-4">
          <SettingRow
            label="Dark mode"
            description="Use dark color scheme"
            control={
              <Toggle
                checked={settings.darkMode}
                onChange={() => toggleSetting('darkMode')}
                ariaLabel="Enable dark mode"
              />
            }
          />
          <SettingRow
            label="Units"
            description="Temperature and distance units"
            control={
              <select
                value={settings.units}
                onChange={(e) => updateSettings({ units: e.target.value })}
                className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 focus:ring-offset-white focus:border-transparent text-sm"
                aria-label="Select units"
              >
                <option value="metric">Celsius (°C)</option>
                <option value="imperial">Fahrenheit (°F)</option>
              </select>
            }
          />
        </div>
      </section>

      <section className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" aria-labelledby="alerts-heading">
        <h2 id="alerts-heading" className="font-medium text-slate-900 dark:text-slate-100 mb-4">Alerts</h2>
        <div className="space-y-4">
          <SettingRow
            label="Heat screening"
            description="Notify when heat index is high"
            control={
              <Toggle
                checked={settings.alerts.heatScreening}
                onChange={() => updateAlert('heatScreening', !settings.alerts.heatScreening)}
                ariaLabel="Enable heat alerts"
              />
            }
          />
          <SettingRow
            label="Air quality"
            description="Notify when air quality degrades"
            control={
              <Toggle
                checked={settings.alerts.airQuality}
                onChange={() => updateAlert('airQuality', !settings.alerts.airQuality)}
                ariaLabel="Enable air quality alerts"
              />
            }
          />
          <SettingRow
            label="Official warnings"
            description="Receive government heat warnings"
            control={
              <Toggle
                checked={settings.alerts.officialWarnings}
                onChange={() => updateAlert('officialWarnings', !settings.alerts.officialWarnings)}
                ariaLabel="Enable official warnings"
              />
            }
          />
        </div>
      </section>

      <section className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" aria-labelledby="data-heading">
        <h2 id="data-heading" className="font-medium text-slate-900 dark:text-slate-100 mb-4">Data & privacy</h2>
        <div className="text-sm text-slate-600 dark:text-slate-400">
          <p>All data is stored locally in your browser. No personal information is sent to external servers.</p>
          <button
            className="text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-300 font-medium text-left mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            onClick={() => {
              if (confirm('Clear all local data? This cannot be undone.')) {
                localStorage.removeItem('heat-shield-settings');
                window.location.reload();
              }
            }}
          >
            Clear local data
          </button>
        </div>
      </section>
    </div>
  );
}