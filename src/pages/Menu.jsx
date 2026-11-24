import React from 'react';
import { Link } from 'react-router-dom';
import { metricDetails, riskColors, riskOrder } from '../data/mockData';
import { LucideIcon } from '../components/Layout';

function RiskBadge({ risk, riskColors }) {
  const colors = riskColors[risk] || riskColors.low;
  return React.createElement('span', {
    className: `inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${colors.bg} ${colors.text} ${colors.border} border`
  }, React.createElement('span', { className: 'font-medium' }, risk.charAt(0).toUpperCase() + risk.slice(1)));
}

function MetricIcon({ name, className }) {
  return React.createElement(LucideIcon, { name, className: `w-5 h-5 ${className || ''}` });
}

export default function Menu() {
  const metricIcons = {
    temperature: 'thermometer',
    'heat-index': 'sun',
    humidity: 'droplet',
    'uv-index': 'uv-index',
    'air-quality': 'wind',
    'heat-risk': 'alert',
  };

  return (
    <div className="space-y-6">
      {/* Header - page as long as content */}
      <header>
        <h1 className="text-2xl font-semibold text-slate-900">Metrics</h1>
        <p className="text-sm text-slate-500 mt-1">Explore detailed views for each environmental metric</p>
      </header>

      <section aria-label="Metric cards">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(metricDetails).map(([key, metric]) => {
            const risk = getMetricRisk(key, metric);
            const iconName = metricIcons[key] || 'thermometer';
            return (
              <Link
                key={key}
                to={`/metric/${key}`}
                className="group p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-100 transition-colors`}>
                    <MetricIcon name={iconName} className="text-accent-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors truncate">{metric.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{metric.description}</p>
                    <div className="mt-3 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                      <span className="font-mono tabular-nums text-slate-700 dark:text-slate-300 font-medium">{metric.current}{metric.unit}</span>
                      <RiskBadge risk={risk} riskColors={riskColors} />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section aria-label="About metrics" className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <h2 className="font-medium text-slate-900 dark:text-slate-100 mb-3">About these metrics</h2>
        <dl className="space-y-3 text-sm">
          {Object.entries(metricDetails).map(([id, metric]) => (
            <div key={id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 rounded bg-slate-100 dark:bg-slate-800">
              <div className="flex items-center gap-2">
                <MetricIcon name={metricIcons[id]} className="text-accent-600 dark:text-accent-400" />
                <dt className="font-medium text-slate-900 dark:text-slate-100">{metric.title}</dt>
              </div>
              <dd className="text-slate-600 dark:text-slate-400 sm:text-right">{metric.description}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-label="Risk legend" className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <h2 className="font-medium text-slate-900 dark:text-slate-100 mb-3">Heat risk levels</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {riskOrder.map((risk) => {
            const colors = riskColors[risk];
            return (
              <div key={risk} className={`p-3 rounded-lg border text-center ${colors.border} ${colors.bg} ${colors.text}`}>
                <div className="font-medium capitalize text-slate-700 dark:text-slate-300">{risk}</div>
                <div className="text-xs mt-1 opacity-80 text-slate-500 dark:text-slate-400">
                  {risk === 'low' && 'Safe for normal activity'}
                  {risk === 'moderate' && 'Caution advised'}
                  {risk === 'high' && 'Limit outdoor exertion'}
                  {risk === 'extreme' && 'Avoid outdoor exposure'}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function getMetricRisk(key, metric) {
  if (key === 'heat-risk') return metric.current.toLowerCase();
  if (key === 'air-quality') {
    if (metric.current <= 50) return 'low';
    if (metric.current <= 100) return 'moderate';
    if (metric.current <= 150) return 'high';
    return 'extreme';
  }
  return 'low';
}