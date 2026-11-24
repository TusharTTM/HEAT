import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useSettings } from '../hooks/useSettings.jsx';
import { riskColors as sharedRiskColors } from '../data/mockData';

/**
 * LucideIcon - A helper function that renders inline SVG icons
 * @param {string} name - The name of the icon to render
 * @param {string} className - CSS classes for styling
 * @param {number} size - Icon size in pixels
 * @returns {JSX.Element} SVG icon element
 */
export function LucideIcon({ name, className = 'w-5 h-5', size = 20, ...props }) {
  const icons = {
    home: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    menu: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
    bot: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    user: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    thermometer: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    sun: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.457l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    droplet: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
    ),
    'uv-index': (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true" {...props}>
        <circle cx="12" cy="12" r="5" strokeLinecap="round" strokeLinejoin="round" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
    wind: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
      </svg>
    ),
    alert: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    'sun-light': (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true" {...props}>
        <circle cx="12" cy="12" r="5" strokeLinecap="round" strokeLinejoin="round" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
    x: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    'chevron-left': (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
      </svg>
    ),
    check: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
    send: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
    'arrow-up': (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    ),
    'arrow-down': (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0L5 14m7 7V3" />
      </svg>
    ),
    'arrow-right': (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7m0 0l-7 7m7-7H5" />
      </svg>
    ),
    'shield-alert': (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01" />
      </svg>
    ),
    info: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true" {...props}>
        <circle cx="12" cy="12" r="10" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
      </svg>
    ),
    'user-circle': (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true" {...props}>
        <circle cx="12" cy="12" r="10" />
        <path d="M16 16.93c-.28.16-1.3.21-2.18-.1-.5-.22-.92-.58-.92-1.13v-2" />
        <path d="M8.5 15C8.5 14.2 7.8 13.5 7 13.5c-.55 0-.95.3-.95.75v2.5" />
        <circle cx="12" cy="8" r="1.5" />
      </svg>
    ),
  };

  return icons[name] || icons.home;
}

// Risk badge with color coding
function RiskBadge({ risk, riskColors }) {
  const colors = riskColors[risk] || riskColors.low;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${colors.bg} ${colors.text} ${colors.border} border`}>
      <span className="font-medium">{risk.charAt(0).toUpperCase() + risk.slice(1)}</span>
    </span>
  );
}

export function Layout() {
  const location = useLocation();
  const { settings, toggleTheme, toggleSetting, updateAlert } = useSettings();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Main navigation items - quiet navigation
  const mainNavItems = [
    { path: '/', label: 'Dashboard', icon: 'home' },
    { path: '/menu', label: 'Metrics', icon: 'menu' },
    { path: '/assistant', label: 'Assistant', icon: 'bot' },
    { path: '/profile', label: 'Profile', icon: 'user' },
  ];

  // Metric detail links
  const metricLinks = [
    { path: '/metric/temperature', label: 'Temperature', icon: 'thermometer' },
    { path: '/metric/heat-index', label: 'Heat Index', icon: 'sun' },
    { path: '/metric/humidity', label: 'Humidity', icon: 'droplet' },
    { path: '/metric/uv-index', label: 'UV Index', icon: 'uv-index' },
    { path: '/metric/air-quality', label: 'Air Quality', icon: 'wind' },
    { path: '/metric/heat-risk', label: 'Heat Risk', icon: 'alert' },
  ];

  // Risk colors shared with the dashboard (lime = safe, red = danger)
  const riskColors = sharedRiskColors;

  function NavLink({ to, isActive, icon, label }) {
    return (
      <Link
        to={to}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 ${
          isActive
            ? 'bg-accent-50 text-accent-700 dark:bg-slate-900 dark:text-accent-400'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white'
        }`}
        aria-current={isActive ? 'page' : undefined}
        onClick={() => setIsMenuOpen(false)}
      >
        <LucideIcon name={icon} className={`w-5 h-5 ${isActive ? 'text-accent-600 dark:text-accent-400' : 'text-slate-400 dark:text-slate-500'}`} aria-hidden="true" />
        {label}
      </Link>
    );
  }

  // Get current location path for navigation
  const isMainMenuActive = (path) => {
    return location.pathname === path || (path === '/menu' && location.pathname.startsWith('/metric'));
  };

  // Sidebar width - 240px
  const sidebarWidth = 'w-[240px]';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Mobile header - persistent signature */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 z-40 flex items-center justify-between px-4">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <LucideIcon name="x" className="w-6 h-6" /> : <LucideIcon name="menu" className="w-6 h-6" />}
        </button>
        {/* Signature: location + active risk level */}
        <div className="text-right">
          <div className="text-xs text-slate-500 dark:text-slate-400">{settings.city}, {settings.region}</div>
          {settings.currentRisk && (
            <RiskBadge risk={settings.currentRisk} riskColors={riskColors} />
          )}
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
          aria-label={settings.darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {settings.darkMode ? <LucideIcon name="sun-light" className="w-6 h-6" /> : <LucideIcon name="moon" className="w-6 h-6" />}
        </button>
      </header>

      {/* Desktop header - persistent signature */}
      <header className="hidden lg:flex items-center justify-between h-16 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-6">
        <div>
          <h1 className="text-lg font-semibold text-slate-900 dark:text-white">Heat Shield AI</h1>
        </div>
        {/* Signature: location + active risk level */}
        <div className="text-right">
          <div className="text-xs text-slate-500 dark:text-slate-400">{settings.city}, {settings.region}</div>
          {settings.currentRisk && (
            <RiskBadge risk={settings.currentRisk} riskColors={riskColors} />
          )}
        </div>
      </header>

      {/* Sidebar - 240-280px, quiet with one button */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 ${sidebarWidth} bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transform transition-transform duration-200 ease-out lg:translate-x-0 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        aria-label="Main navigation"
      >
        <div className="flex flex-col h-full">
          {/* Logo area */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-700">
            <h1 className="text-lg font-semibold text-slate-900 dark:text-white">Heat Shield AI</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{settings.city}, {settings.region}</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto" role="navigation" aria-label="Main">
            {/* Main Navigation Section */}
            <div className="px-3 py-2 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              Navigation
            </div>
            {mainNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                isActive={isMainMenuActive(item.path)}
                icon={item.icon}
                label={item.label}
              />
            ))}

            {/* Metrics Section */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
              <div className="px-3 py-2 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Metrics
              </div>
              {metricLinks.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  isActive={location.pathname === item.path}
                  icon={item.icon}
                  label={item.label}
                />
              ))}
            </div>
          </nav>

          {/* Bottom button - Settings/Profile */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-700">
            <Link
              to="/profile"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <LucideIcon name="user" className="w-5 h-5" aria-hidden="true" />
              Settings
            </Link>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main content - fluid, capped at 1440-1600px */}
      <main className="pt-16 lg:pt-0 lg:ml-[240px] min-h-screen">
        <div className="w-full max-w-[1440px] mx-auto px-4 py-6 lg:px-8 lg:py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;