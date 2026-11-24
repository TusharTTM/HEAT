import React, { useState, useEffect } from 'react';
import { useSettings } from '../hooks/useSettings';
import { LucideIcon } from '../components/Layout';
import {
  hourlyHeatRisk,
  dayPlannerBlocks,
  heatScreening,
  airQuality,
  preparednessChecklist,
  officialWarnings,
  heatModelInfo,
  riskColors,
} from '../data/mockData';

function RiskBadge({ risk, riskColors }) {
  const colors = riskColors[risk] || riskColors.low;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${colors.bg} ${colors.text} ${colors.border} border`}>
      <span className="font-medium">{risk.charAt(0).toUpperCase() + risk.slice(1)}</span>
    </span>
  );
}

function StatCard({ label, value, unit, change, reference, iconName, isPrimary }) {
  // Nested radii: inner = outer - padding, min 4px. Controls 8-10, cards 12-16, panels 14-20
  const containerRadius = 'rounded-xl';
  const iconRadius = 'rounded-lg';
  const iconColorClass = isPrimary ? 'text-accent-600' : 'text-slate-600';
  const iconBgClass = isPrimary ? 'bg-accent-100' : 'bg-slate-100';

  // Change indicator with reference value
  const changeClass = change && reference ? (
    <span className={`ml-2 text-sm ${
      change > 0 ? 'text-accent-600' : change < 0 ? 'text-slate-500' : 'text-slate-400'
    }`}>
      {change > 0 ? '+' : ''}{change} vs {reference}
    </span>
  ) : null;

  return (
    <div className={`p-4 rounded-xl border shadow-sm ${isPrimary ? 'border-accent-200 bg-accent-50' : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`p-2 ${iconRadius} ${iconBgClass} ${iconColorClass}`}>
            <LucideIcon name={iconName} className="w-5 h-5" aria-hidden="true" />
          </div>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
          {label}
        </p>
        <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100 tabular-nums mt-1">
          {value}<span className="text-lg font-normal text-slate-500 dark:text-slate-400 ml-1">{unit}</span>
        </p>
        {changeClass}
      </div>
    </div>
  );
}

function DayPlannerBlock({ block, isSelected, onClick, riskColors }) {
  // Nested radii: inner = outer - padding, min 4px
  const outerRadius = 'rounded-xl';
  const innerRadius = 'rounded-lg';

  // Active state: small surface step with hairline highlight
  const activeStyles = isSelected
    ? 'ring-1 ring-accent-500'
    : '';

  const background = block.risk === 'high' || block.risk === 'extreme'
    ? (isSelected ? 'bg-accent-50 dark:bg-accent-900/30' : 'bg-slate-50 dark:bg-slate-900')
    : (isSelected ? 'bg-white dark:bg-slate-800' : 'bg-slate-50 dark:bg-slate-900');

  return (
    <button
      onClick={onClick}
      className={`${outerRadius} p-4 border relative overflow-hidden ${background} ${activeStyles} ${isSelected ? '' : 'hover:bg-slate-100 dark:hover:bg-slate-700'} transition-colors duration-150 ease-out`}
      aria-pressed={isSelected}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">{block.label}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{block.hours[0]} – {block.hours[block.hours.length - 1]}</p>
        </div>
        <RiskBadge risk={block.risk} riskColors={riskColors} />
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{block.description}</p>
      {isSelected && (
        <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
          <span className="text-xs text-slate-400 dark:text-slate-500">Hours:</span>
          <span className="ml-2 text-sm text-slate-500 dark:text-slate-400 font-mono">{block.hours.join(', ')}</span>
        </div>
      )}
    </button>
  );
}

function AQICard({ label, value, category, color }) {
  return (
    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</p>
      <p className="text-3xl font-semibold text-slate-900 dark:text-slate-100 tabular-nums mt-2">{value}</p>
      <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mt-2">{category}</p>
    </div>
  );
}

function PollutantRow({ label, value, unit }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800 last:border-0">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" />
        <span className="text-sm text-slate-600 dark:text-slate-300">{label}</span>
      </div>
      <span className="font-mono tabular-nums text-sm font-medium text-slate-900 dark:text-slate-100">
        {value} <span className="font-normal text-slate-500 dark:text-slate-400">{unit}</span>
      </span>
    </div>
  );
}

function HourlyChart({ data, unit, metricId, riskColors, currentHour }) {
  // Charts: muted grid, muted mono labels, one bright accent color per chart
  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue || 1;
  const chartHeight = 170;
  const barWidth = 28;
  const gap = 6;

  // Bright warm accent - heat index is the one bright element on the dashboard
  const accentColor = '#f59e0b'; // amber-500

  return (
    <div className="relative p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm">
      {/* Muted grid lines behind the chart */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10">
        <defs>
          <pattern id={`grid-${metricId}`} width="40" height="20" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="1" opacity="0.6" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill={`url(#grid-${metricId})`} />
      </svg>

      <div className="flex items-end gap-1 h-[170px] overflow-x-auto pb-4 min-w-max">
        {data.map((d, i) => {
          const heightPercent = ((d.value - minValue) / range) * 100;
          const barHeight = Math.max(4, (heightPercent / 100) * chartHeight);
          const isCurrent = i === currentHour;
          const barColor = isCurrent ? accentColor : '#e2e8f0';

          return (
            <div
              key={d.hour}
              className="flex flex-col items-center gap-1"
              style={{ width: barWidth }}
              title={`${d.hour}: ${d.value}${unit} (${d.risk})`}
            >
              <div
                className={`w-full rounded-t transition-colors duration-150 ease-out ${isCurrent ? 'shadow-[0_0_12px_rgba(245,158,11,0.5)]' : ''}`}
                style={{ height: barHeight, backgroundColor: barColor }}
              />
              <span className={`text-[10px] font-mono ${isCurrent ? 'text-slate-900 dark:text-slate-100 font-medium' : 'text-slate-400 dark:text-slate-500'}`}>
                {d.hour}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-5 mt-3 text-xs">
        <span className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
          <span className="w-3 h-1.5 rounded-full" style={{ backgroundColor: '#94a3b8' }} />
          Min: {minValue}{unit}
        </span>
        <span className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
          <span className="w-3 h-1.5 rounded-full" style={{ backgroundColor: '#94a3b8' }} />
          Max: {maxValue}{unit}
        </span>
        <span className="flex items-center gap-1.5" style={{ color: accentColor }}>
          <span className="w-3 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
          {metricId}
        </span>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { settings, updateSettings } = useSettings();

  const [currentHourIndex, setCurrentHourIndex] = useState(12);
  const [selectedBlock, setSelectedBlock] = useState(null);

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    setCurrentHourIndex(hour);
  }, []);

  const currentData = hourlyHeatRisk[currentHourIndex];
  const currentRisk = riskColors[currentData.risk];

  // Update settings with current risk for persistent header display
  useEffect(() => {
    updateSettings({ currentRisk: currentData.risk });
  }, [currentData.risk, updateSettings]);

  // Prepare hourly chart data for heat index - the product moment
  const heatIndexChartData = hourlyHeatRisk.map((h) => ({
    hour: h.hour,
    value: h.heatIndex,
    risk: h.risk,
  }));

  return (
    <div className="space-y-6">
      {/* Header - page as long as content */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Heat Shield AI</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            {settings.city}, {settings.region} · Updated {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${currentRisk.bg} ${currentRisk.text}`}>
            {currentData.risk.charAt(0).toUpperCase() + currentData.risk.slice(1)} risk
          </span>
        </div>
      </header>

      {/* Current Conditions - Pass 5: stat cards with label, figure, change with reference */}
      <section aria-label="Current conditions">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Temperature"
            value={currentData.temp}
            unit="°C"
            change={currentData.temp - (hourlyHeatRisk[currentHourIndex - 1]?.temp || currentData.temp)}
            reference="1h ago"
            iconName="thermometer"
            isPrimary
          />
          <StatCard
            label="Heat index"
            value={currentData.heatIndex}
            unit="°C"
            change={currentData.heatIndex - (hourlyHeatRisk[currentHourIndex - 1]?.heatIndex || currentData.heatIndex)}
            reference="1h ago"
            iconName="sun"
          />
          <StatCard
            label="Humidity"
            value={currentData.humidity}
            unit="%"
            change={currentData.humidity - (hourlyHeatRisk[currentHourIndex - 1]?.humidity || currentData.humidity)}
            reference="1h ago"
            iconName="droplet"
          />
          <StatCard
            label="UV index"
            value={currentData.uv}
            unit=""
            change={currentData.uv - (hourlyHeatRisk[currentHourIndex - 1]?.uv || currentData.uv)}
            reference="1h ago"
            iconName="uv-index"
          />
        </div>
      </section>

      {/* Heat Screening Alert - accent for key actions only */}
      <section aria-label="Heat screening">
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex items-start gap-4">
              <LucideIcon name="alert" className="w-5 h-5 mt-2 flex-shrink-0 text-slate-500 dark:text-slate-400" aria-hidden="true" />
              <div>
                <h2 className="font-semibold text-slate-900 dark:text-slate-100">Heat screening</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{heatScreening.description}</p>
              </div>
            </div>
            <RiskBadge risk={currentData.risk} riskColors={riskColors} />
          </div>
          <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
            {heatScreening.recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5">
                  <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-semibold bg-accent-600 text-white rounded-full">
                    {i + 1}
                  </span>
                </span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Hourly Timeline - Pass 5: tabular nums, Pass 7: chart hierarchy */}
      <section aria-label="Hourly timeline">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-slate-900 dark:text-slate-100">Hourly timeline</h2>
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <label className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="23"
                value={currentHourIndex}
                onChange={(e) => setCurrentHourIndex(Number(e.target.value))}
                className="w-48 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-accent-600"
                aria-label="Select hour"
              />
              <span className="font-mono tabular-nums text-slate-600 dark:text-slate-300">{hourlyHeatRisk[currentHourIndex].hour}</span>
            </label>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <HourlyChart data={heatIndexChartData} unit="°C" metricId="heat index" riskColors={riskColors} currentHour={currentHourIndex} />
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full min-w-[600px] text-sm" role="table">
            <thead>
              <tr className="text-left text-sm font-medium text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                <th className="py-2 px-3 sticky left-0 bg-white dark:bg-slate-800 z-10">
                  <div className="flex items-center gap-2">
                    Time
                    {/* Keyboard shortcut as small keycap */}
                    <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-semibold bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded">
                      →
                    </span>
                  </div>
                </th>
                <th className="py-2 px-3 text-right">Temp</th>
                <th className="py-2 px-3 text-right">HI</th>
                <th className="py-2 px-3 text-right">RH</th>
                <th className="py-2 px-3 text-right">UV</th>
                <th className="py-2 px-3 text-right">US AQI</th>
                <th className="py-2 px-3 text-right">EU AQI</th>
                <th className="py-2 px-3">Risk</th>
              </tr>
            </thead>
            <tbody>
              {hourlyHeatRisk.map((hour, i) => (
                <tr
                  key={hour.hour}
                  className={`border-b border-slate-100 dark:border-slate-800 transition-colors ${i === currentHourIndex ? 'bg-accent-50 dark:bg-accent-900/30' : 'hover:bg-slate-50 dark:hover:bg-slate-900'}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setCurrentHourIndex(i)}
                >
                  <td className="py-2 px-3 font-mono tabular-nums font-medium text-slate-900 dark:text-slate-100 sticky left-0 bg-white dark:bg-slate-800 z-10">
                    {hour.hour}
                  </td>
                  <td className="py-2 px-3 text-right text-slate-600 dark:text-slate-300 tabular-nums">{hour.temp}°C</td>
                  <td className="py-2 px-3 text-right text-slate-600 dark:text-slate-300 tabular-nums">{hour.heatIndex}°C</td>
                  <td className="py-2 px-3 text-right text-slate-600 dark:text-slate-300 tabular-nums">{hour.humidity}%</td>
                  <td className="py-2 px-3 text-right text-slate-600 dark:text-slate-300 tabular-nums">{hour.uv}</td>
                  <td className="py-2 px-3 text-right text-slate-600 dark:text-slate-300 tabular-nums">{hour.usAqi}</td>
                  <td className="py-2 px-3 text-right text-slate-600 dark:text-slate-300 tabular-nums">{hour.euAqi}</td>
                  <td className="py-2 px-3">
                    <RiskBadge risk={hour.risk} riskColors={riskColors} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Day Planner - Pass 1: 4px grid, Pass 6: real proportions, Pass 6: Vary card sizes */}
      <section aria-label="Day planner">
        <h2 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Day planner</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dayPlannerBlocks.map((block) => {
            // Vary card sizes - some blocks span more columns on larger screens
            const sizeClass = block.label === 'Early Morning' ? 'sm:col-span-2' : '';

            return (
              <div key={block.label} className={sizeClass}>
                <DayPlannerBlock
                  block={block}
                  isSelected={selectedBlock === block.label}
                  onClick={() => setSelectedBlock(selectedBlock === block.label ? null : block.label)}
                  riskColors={riskColors}
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* Air Quality - single neutral ramp (slate) with accent sparingly */}
      <section aria-label="Air quality">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Air quality index</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AQICard
                label="US AQI"
                value={airQuality.usAqi}
                category={airQuality.usCategory}
              />
              <AQICard
                label="EU AQI"
                value={airQuality.euAqi}
                category={airQuality.euCategory}
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4">{airQuality.description}</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Pollutants</h3>
            <div className="space-y-3">
              <PollutantRow label="PM25" value={airQuality.pm25} unit="µg/m³" />
              <PollutantRow label="PM10" value={airQuality.pm10} unit="µg/m³" />
              <PollutantRow label="O3" value={airQuality.o3} unit="µg/m³" />
              <PollutantRow label="NO2" value={airQuality.no2} unit="µg/m³" />
              <PollutantRow label="SO2" value={airQuality.so2} unit="µg/m³" />
              <PollutantRow label="CO" value={airQuality.co} unit="mg/m³" />
            </div>
          </div>
        </div>
      </section>

      {/* Preparedness Checklist - consistent icons, short labels */}
      <section aria-label="Preparedness checklist">
        <h2 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Preparedness checklist</h2>
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <ul className="space-y-3" role="list">
            {preparednessChecklist.map((item) => (
              <li key={item.id} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id={item.id}
                  checked={item.done}
                  onChange={() => {}}
                  className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-accent-600 focus:ring-accent-500 focus:ring-offset-2 focus:ring-offset-white"
                />
                <label htmlFor={item.id} className={`flex-1 text-sm ${item.done ? 'line-through text-slate-400' : 'text-slate-600 dark:text-slate-300'}`}>
                  {item.label}
                </label>
                <span className={`text-xs font-medium px-2 py-0.5 rounded ${item.priority === 'high' ? 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300' : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300'}`}>
                  {item.priority}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Official Warnings */}
      <section aria-label="Official warnings">
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <LucideIcon name="shield-alert" className="w-5 h-5 text-slate-500 dark:text-slate-400" aria-hidden="true" />
              <h2 className="font-semibold text-slate-900 dark:text-slate-100">Official warnings</h2>
            </div>
            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300">
              {officialWarnings.connected ? 'Connected' : 'Offline'}
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">{officialWarnings.message}</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">Source: {officialWarnings.source}</p>
        </div>
      </section>

      {/* Model Info */}
      <section aria-label="Model information">
        <details className="group p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <summary className="flex items-center justify-between cursor-pointer list-none font-medium text-slate-900 dark:text-slate-100">
            Model information
            <LucideIcon name="arrow-right" className="w-4 h-4 text-accent-500 dark:text-accent-400 group-open:rotate-180 transition-transform" aria-hidden="true" />
          </summary>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-600 dark:text-slate-400">
            <div>
              <p className="font-medium text-slate-900 dark:text-slate-100">{heatModelInfo.model}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{heatModelInfo.trainedOn}</p>
            </div>
            <div>
              <p>MAE: <span className="font-mono tabular-nums text-slate-700 dark:text-slate-300">{heatModelInfo.mae}</span></p>
              <p>RMSE: <span className="font-mono tabular-nums text-slate-700 dark:text-slate-300">{heatModelInfo.rmse}</span></p>
              <p>R²: <span className="font-mono tabular-nums text-slate-700 dark:text-slate-300">{heatModelInfo.rSquared}</span></p>
            </div>
            <div className="sm:col-span-2 text-sm text-slate-500 dark:text-slate-400">{heatModelInfo.note}</div>
          </div>
        </details>
      </section>
    </div>
  );
}