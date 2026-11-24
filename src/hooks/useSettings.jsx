import { useState, useEffect, useCallback, createContext, useContext } from 'react';

const DEFAULT_SETTINGS = {
  city: 'Mumbai',
  region: 'Maharashtra',
  country: 'India',
  lat: 19.0760,
  lon: 72.8777,
  darkMode: false,
  units: 'metric',
  alerts: {
    heatScreening: true,
    airQuality: true,
    officialWarnings: false,
  },
  apiUrl: '',
  apiKey: '',
  apiConnected: false,
  currentRisk: 'extreme',
};

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('heat-shield-settings');
        if (stored) {
          return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
        }
      } catch (e) {
        console.warn('Failed to parse settings:', e);
      }
    }
    return DEFAULT_SETTINGS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('heat-shield-settings', JSON.stringify(settings));
      document.documentElement.classList.toggle('dark', settings.darkMode);
    } catch (e) {
      console.warn('Failed to save settings:', e);
    }
  }, [settings]);

  const updateSettings = useCallback((updates) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  }, []);

  const toggleSetting = useCallback((key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  const updateAlert = useCallback((alertKey, value) => {
    setSettings((prev) => ({
      ...prev,
      alerts: { ...prev.alerts, [alertKey]: value },
    }));
  }, []);

  const toggleTheme = useCallback(() => {
    setSettings((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, toggleSetting, updateAlert, toggleTheme }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}