import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { LucideIcon } from '../components/Layout';
import { metricDetails, hourlyHeatRisk, riskColors, riskOrder } from '../data/mockData';

function RiskBadge({ risk, riskColors }) {
  const colors = riskColors[risk] || riskColors.low;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${colors.bg} ${colors.text} ${colors.border} border`}>
      <span className="font-medium">{risk.charAt(0).toUpperCase() + risk.slice(1)}</span>
    </span>
  );
}

function MetricIcon({ name, className }) {
  return <LucideIcon name={name} className={`w-5 h-5 ${className || ''}`} />;
}

export default function MetricDetail() {
  const { metricId } = useParams();

  const detail = metricDetails[metricId];

  const timelineData = hourlyHeatRisk.map((hour) => ({
    hour: hour.hour,
    temp: hour.temp,
    heatIndex: hour.heatIndex,
    risk: hour.risk,
  }));

  const riskHours = riskOrder.reduce((acc, level) => {
    acc[level] = timelineData.filter((d) => d.risk === level).length;
    return acc;
  }, {});

  const minValue = detail.min !== undefined ? detail.min : Math.min(...timelineData.map((d) => d.heatIndex));
  const maxValue = detail.max !== undefined ? detail.max : Math.max(...timelineData.map((d) => d.heatIndex));

  const trendIconName = detail.trend === 'rising' ? 'arrow-up' : detail.trend === 'falling' ? 'arrow-down' : 'arrow-right';

  const metricIcons = {
    temperature: 'thermometer',
    'heat-index': 'sun',
    humidity: 'droplet',
    'uv-index': 'uv-index',
    'air-quality': 'wind',
    'heat-risk': 'alert',
  };

  const metricUnits = {
    temperature: '°C',
    'heat-index': '°C',
    humidity: '%',
    'uv-index': '',
    'air-quality': 'AQI',
    'heat-risk': '',
  };

  if (!detail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2">Metric not found</h1>
          <p className="text-slate-500 dark:text-slate-400">The metric "{metricId}" does not exist.</p>
          <Link to="/menu" className="mt-4 inline-block text-accent-600 dark:text-accent-400 hover:underline">
            Back to Metrics
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header - page as long as content */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/menu"
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Back to metrics"
          >
            <LucideIcon name="chevron-left" size={20} />
          </Link>
          <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-slate-800">
            <MetricIcon name={metricIcons[metricId] || 'thermometer'} className="text-accent-600" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{detail.title}</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">{detail.description}</p>
          </div>
        </div>
        <div className="text-right">
          <RiskBadge risk={timelineData[12]?.risk || 'moderate'} riskColors={riskColors} />
        </div>
      </header>

      {/* Current Reading - Pass 5: Stat card with label, figure, change with reference */}
      <section className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" aria-labelledby="current-heading">
        <h2 id="current-heading" className="font-medium text-slate-900 dark:text-slate-100 mb-4">Current reading</h2>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-slate-800">
              <MetricIcon name={metricIcons[metricId] || 'thermometer'} className="text-accent-600" />
            </div>
            <div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                {detail.title}
              </div>
              <div className="text-4xl font-semibold tabular-nums text-slate-900 dark:text-slate-100 mt-1">
                {detail.current}
                {detail.unit && <span className="text-2xl font-normal text-slate-500 dark:text-slate-400 ml-1">{detail.unit}</span>}
              </div>
              {/* Change with reference */}
              <div className="flex items-center gap-1 mt-2 text-sm">
                <LucideIcon
                  name={trendIconName}
                  size={14}
                  className={detail.trend === 'rising' ? 'text-accent-600' : detail.trend === 'falling' ? 'text-slate-400' : 'text-slate-400'}
                  aria-hidden="true"
                />
                <span className="text-slate-600 dark:text-slate-300">
                  {detail.trend === 'rising' ? '+' : detail.trend === 'falling' ? '-' : ''}{detail.current}
                  <span className="text-slate-400 dark:text-slate-500"> vs {detail.min}{detail.unit}</span>
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 border-l border-slate-200 dark:border-slate-700 pl-6">
            <div>
              <div className="text-slate-400 dark:text-slate-500 text-xs">Min</div>
              <div className="font-medium tabular-nums text-slate-900 dark:text-slate-100 text-lg">{detail.min}{detail.unit}</div>
            </div>
            <div>
              <div className="text-slate-400 dark:text-slate-500 text-xs">Max</div>
              <div className="font-medium tabular-nums text-slate-900 dark:text-slate-100 text-lg">{detail.max}{detail.unit}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 24-Hour Timeline - Charts: muted grid, muted mono labels, one accent color per chart */}
      <section className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" aria-labelledby="hourly-heading">
        <h2 id="hourly-heading" className="font-medium text-slate-900 dark:text-slate-100 mb-4">24-Hour Timeline</h2>
        <div className="relative h-48">
          {/* Muted grid lines */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            role="img"
            aria-label={`${detail.title} over 24 hours`}
          >
            <defs>
              {/* Muted gradient for chart area */}
              <linearGradient id="metricGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
              {/* Muted grid pattern */}
              <pattern id="grid" width="12" height="12" patternUnits="userSpaceOnUse">
                <path d="M 12 0 L 0 0 0 12" fill="none" stroke="#e2e8f0" strokeWidth="0.5" opacity="0.3"/>
              </pattern>
            </defs>
            {/* Background grid */}
            <rect x="0" y="0" width="100" height="100" fill="url(#grid)" />
            {/* Main chart line - one accent color */}
            <polyline
              fill="url(#metricGradient)"
              stroke="#3b82f6"
              strokeWidth="1.5"
              points={timelineData.map((v, i) => {
                const x = (i / 23) * 100;
                const normalized = (maxValue - minValue) > 0 ? (v.heatIndex - minValue) / (maxValue - minValue) : 0.5;
                const y = 95 - normalized * 85;
                return x + ',' + y;
              }).join(' ')}
            />
            {/* Muted mono labels */}
            <g fontSize="5" fill="#64748b" opacity="0.7">
              {timelineData.filter((_, i) => i % 3 === 0).map((h, i) => (
                <text key={i} x={(i * 3 / 23) * 100} y="98" textAnchor="middle">
                  {h.hour}
                </text>
              ))}
            </g>
          </svg>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm" role="table">
            <thead>
              <tr className="text-left text-sm font-medium text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                <th className="py-2 px-3">
                  <div className="flex items-center gap-2">
                    Hour
                    {/* Keyboard shortcut as small keycap */}
                    <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-semibold bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded">
                      →
                    </span>
                  </div>
                </th>
                <th className="py-2 px-3 text-right">
                  {detail.title}{detail.unit ? ` (${detail.unit})` : ''}
                </th>
                <th className="py-2 px-3">Risk</th>
              </tr>
            </thead>
            <tbody>
              {timelineData.map((row, i) => (
                <tr
                  key={row.hour}
                  className={`border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-slate-50 dark:bg-slate-900' : 'bg-white dark:bg-slate-800'}`}
                >
                  <td className="py-2 px-3 font-mono tabular-nums text-slate-600 dark:text-slate-300 font-medium">{row.hour}</td>
                  <td className="py-2 px-3 text-right text-slate-600 dark:text-slate-300 tabular-nums">{row.heatIndex}</td>
                  <td className="py-2 px-3">
                    <RiskBadge risk={row.risk} riskColors={riskColors} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Risk Level Breakdown - muted styling with mono labels */}
      <section className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" aria-labelledby="risk-breakdown-heading">
        <h2 id="risk-breakdown-heading" className="font-medium text-slate-900 dark:text-slate-100 mb-4">Risk level breakdown</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {riskOrder.map((risk) => {
            const rc = riskColors[risk];
            const hoursInRisk = riskHours[risk] || 0;
            return (
              <div
                key={risk}
                className={`p-3 rounded-lg border text-center ${rc.border} ${rc.bg} ${rc.text}`}
              >
                <div className="font-medium capitalize text-slate-700 dark:text-slate-300">{risk}</div>
                <div className="text-2xl font-bold tabular-nums mt-1 text-slate-900 dark:text-slate-100">{hoursInRisk}h</div>
                <div className="text-xs mt-1 opacity-80 text-slate-500 dark:text-slate-400">
                  {risk === 'low' && 'Safe'}
                  {risk === 'moderate' && 'Caution'}
                  {risk === 'high' && 'Limit activity'}
                  {risk === 'extreme' && 'Avoid exposure'}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* About This Metric - muted counts/meta */}
      <section className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" aria-labelledby="about-heading">
        <h2 id="about-heading" className="font-medium text-slate-900 dark:text-slate-100 mb-3">About this metric</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">{detail.description}</p>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wide">Current</dt>
            <dd className="font-medium tabular-nums text-slate-900 dark:text-slate-100">{detail.current}{detail.unit}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wide">24h Range</dt>
            <dd className="font-medium tabular-nums text-slate-900 dark:text-slate-100">
              {detail.min}{detail.unit} - {detail.max}{detail.unit}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wide">Trend</dt>
            <dd className="flex items-center gap-1 font-medium text-slate-900 dark:text-slate-100">
              <LucideIcon
                name={trendIconName}
                size={16}
                className={detail.trend === 'rising' ? 'text-accent-600' : detail.trend === 'falling' ? 'text-slate-400' : 'text-slate-400'}
                aria-hidden="true"
              />
              <span className="capitalize">{detail.trend}</span>
            </dd>
          </div>
        </dl>
      </section>

      {/* Related Metrics - keyboard shortcuts as small keycaps */}
      <section className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" aria-labelledby="related-heading">
        <h2 id="related-heading" className="font-medium text-slate-900 dark:text-slate-100 mb-3">Related metrics</h2>
        <nav className="space-y-2">
          {Object.entries(metricDetails).filter(([id]) => id !== metricId).map(([id, d], idx) => (
            <Link
              key={id}
              to={`/metric/${id}`}
              className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-slate-800 transition-colors">
                <MetricIcon name={metricIcons[id]} className="text-accent-600 dark:text-accent-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors truncate">{d.title}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400 truncate">{d.description}</div>
              </div>
              <div className="flex items-center gap-2">
                {/* Keyboard shortcut as small keycap */}
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-semibold bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded">
                  {String.fromCharCode(97 + idx)}
                </span>
                <span className="font-medium tabular-nums text-slate-700 dark:text-slate-300">
                  {d.current}{metricUnits[id] || ''}
                </span>
              </div>
            </Link>
          ))}
        </nav>
      </section>

      {/* Data Source - muted counts/meta */}
      <section className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" aria-labelledby="data-source-heading">
        <h2 id="data-source-heading" className="font-medium text-slate-900 dark:text-slate-100 mb-3">Data source</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Open-Meteo provides modelled estimates for weather and air quality. See Technical Disclosure for details.
        </p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
          Source: Open-Meteo API · Updated: real-time modelled estimates
        </p>
      </section>
    </div>
  );
}