export const hourlyHeatRisk = [
  { hour: '00:00', temp: 28, heatIndex: 29, humidity: 78, uv: 0, usAqi: 45, euAqi: 28, risk: 'low' },
  { hour: '01:00', temp: 27, heatIndex: 28, humidity: 80, uv: 0, usAqi: 42, euAqi: 26, risk: 'low' },
  { hour: '02:00', temp: 26, heatIndex: 27, humidity: 82, uv: 0, usAqi: 40, euAqi: 25, risk: 'low' },
  { hour: '03:00', temp: 26, heatIndex: 27, humidity: 83, uv: 0, usAqi: 38, euAqi: 24, risk: 'low' },
  { hour: '04:00', temp: 25, heatIndex: 26, humidity: 85, uv: 0, usAqi: 36, euAqi: 23, risk: 'low' },
  { hour: '05:00', temp: 25, heatIndex: 26, humidity: 86, uv: 0, usAqi: 35, euAqi: 22, risk: 'low' },
  { hour: '06:00', temp: 26, heatIndex: 27, humidity: 84, uv: 1, usAqi: 38, euAqi: 24, risk: 'low' },
  { hour: '07:00', temp: 28, heatIndex: 30, humidity: 78, uv: 3, usAqi: 45, euAqi: 28, risk: 'moderate' },
  { hour: '08:00', temp: 30, heatIndex: 34, humidity: 72, uv: 5, usAqi: 52, euAqi: 32, risk: 'moderate' },
  { hour: '09:00', temp: 32, heatIndex: 38, humidity: 68, uv: 7, usAqi: 58, euAqi: 36, risk: 'high' },
  { hour: '10:00', temp: 34, heatIndex: 42, humidity: 62, uv: 9, usAqi: 65, euAqi: 41, risk: 'high' },
  { hour: '11:00', temp: 36, heatIndex: 45, humidity: 58, uv: 10, usAqi: 72, euAqi: 45, risk: 'extreme' },
  { hour: '12:00', temp: 37, heatIndex: 47, humidity: 55, uv: 11, usAqi: 78, euAqi: 48, risk: 'extreme' },
  { hour: '13:00', temp: 37, heatIndex: 48, humidity: 56, uv: 11, usAqi: 80, euAqi: 49, risk: 'extreme' },
  { hour: '14:00', temp: 36, heatIndex: 47, humidity: 58, uv: 10, usAqi: 76, euAqi: 47, risk: 'extreme' },
  { hour: '15:00', temp: 35, heatIndex: 44, humidity: 60, uv: 8, usAqi: 70, euAqi: 44, risk: 'high' },
  { hour: '16:00', temp: 34, heatIndex: 41, humidity: 63, uv: 6, usAqi: 65, euAqi: 41, risk: 'high' },
  { hour: '17:00', temp: 33, heatIndex: 39, humidity: 66, uv: 4, usAqi: 60, euAqi: 38, risk: 'moderate' },
  { hour: '18:00', temp: 31, heatIndex: 36, humidity: 70, uv: 2, usAqi: 55, euAqi: 34, risk: 'moderate' },
  { hour: '19:00', temp: 30, heatIndex: 33, humidity: 73, uv: 0, usAqi: 50, euAqi: 31, risk: 'moderate' },
  { hour: '20:00', temp: 29, heatIndex: 31, humidity: 75, uv: 0, usAqi: 48, euAqi: 30, risk: 'low' },
  { hour: '21:00', temp: 28, heatIndex: 30, humidity: 77, uv: 0, usAqi: 46, euAqi: 29, risk: 'low' },
  { hour: '22:00', temp: 28, heatIndex: 29, humidity: 78, uv: 0, usAqi: 44, euAqi: 28, risk: 'low' },
  { hour: '23:00', temp: 27, heatIndex: 28, humidity: 79, uv: 0, usAqi: 43, euAqi: 27, risk: 'low' },
];

export const dayPlannerBlocks = [
  {
    label: 'Overnight',
    hours: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00'],
    risk: 'low',
    description: 'Cool and safe for outdoor activity',
  },
  {
    label: 'Early Morning',
    hours: ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00'],
    risk: 'high',
    description: 'Heat builds rapidly — limit exertion',
  },
  {
    label: 'Midday',
    hours: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
    risk: 'extreme',
    description: 'Peak danger — stay indoors, hydrate',
  },
  {
    label: 'Evening',
    hours: ['18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
    risk: 'moderate',
    description: 'Cooling but still elevated — caution advised',
  },
];

export const heatScreening = {
  level: 'High risk',
  description: 'Heat index exceeds 40°C. Prolonged exposure may cause heat exhaustion. Limit outdoor activity to early morning or evening.',
  recommendations: [
    'Stay hydrated — drink water every 20 minutes',
    'Avoid strenuous activity 10:00–17:00',
    'Seek shade or air conditioning',
    'Check on vulnerable neighbors',
  ],
};

export const airQuality = {
  usAqi: 72,
  usCategory: 'Moderate',
  euAqi: 45,
  euCategory: 'Fair',
  pm25: 22,
  pm10: 38,
  o3: 110,
  no2: 28,
  so2: 8,
  co: 0.6,
  description: 'Air quality is acceptable. Sensitive individuals may experience minor respiratory symptoms.',
};

export const preparednessChecklist = [
  { id: 'water', label: '2L water per person per day', done: false, priority: 'high' },
  { id: 'cooling', label: 'Identify cooling centers nearby', done: false, priority: 'high' },
  { id: 'meds', label: 'Check medication heat sensitivity', done: false, priority: 'high' },
  { id: 'shade', label: 'Create shade at home/work', done: true, priority: 'medium' },
  { id: 'checkin', label: 'Plan check-ins for elderly relatives', done: false, priority: 'high' },
  { id: 'clothing', label: 'Light, loose, light-colored clothing', done: true, priority: 'medium' },
  { id: 'electrolytes', label: 'Electrolyte replacement available', done: false, priority: 'medium' },
  { id: 'vehicle', label: 'Never leave people/pets in parked car', done: true, priority: 'high' },
];

export const officialWarnings = {
  connected: false,
  source: 'NDMA SACHET',
  message: 'The SACHET panel is optional and needs the backend adapter. Until it is connected, no official warning appears here, which does not mean none is in force. Check your state or national weather office.',
  lastUpdated: null,
};

export const heatModelInfo = {
  model: 'Gradient Boosting',
  mae: '0.8759 °C',
  rmse: '1.2156 °C',
  rSquared: '0.8782',
  trainedOn: '16,440 daily rows across 15 locations (2023–2025)',
  testedOn: '3,285 rows (chronological holdout)',
  note: 'Heat risk on this page comes from deterministic heat-index screening, not a learned classifier.',
};

export const metricDetails = {
  'temperature': {
    title: 'Temperature',
    unit: '°C',
    description: 'Ambient air temperature measured at 2m above ground.',
    current: 34,
    min: 25,
    max: 37,
    trend: 'rising',
  },
  'heat-index': {
    title: 'Heat index',
    unit: '°C',
    description: 'Apparent temperature combining air temperature and relative humidity.',
    current: 42,
    min: 26,
    max: 48,
    trend: 'rising',
  },
  'humidity': {
    title: 'Humidity',
    unit: '%',
    description: 'Relative humidity — the amount of moisture in the air relative to the maximum possible.',
    current: 62,
    min: 55,
    max: 86,
    trend: 'falling',
  },
  'uv-index': {
    title: 'UV index',
    unit: '',
    description: 'Ultraviolet radiation intensity on a scale of 0–11+.',
    current: 9,
    min: 0,
    max: 11,
    trend: 'rising',
  },
  'air-quality': {
    title: 'Air quality',
    unit: 'AQI',
    description: 'US AQI and EU AQI with pollutant breakdown.',
    current: 72,
    min: 35,
    max: 80,
    trend: 'rising',
  },
  'heat-risk': {
    title: 'Heat risk',
    unit: '',
    description: 'Risk level derived from heat index screening thresholds.',
    current: 'High',
    min: 'Low',
    max: 'Extreme',
    trend: 'rising',
  },
};

// Risk colors using single neutral ramp (slate) with accent for high/extreme
// One accent color used sparingly - for primary actions, selection, key figures
// Nested radii: inner = outer - padding, min 4px. Controls 8-10, cards 12-16, panels 14-20
export const riskColors = {
  low: { bg: 'bg-slate-100 dark:bg-slate-900', text: 'text-slate-700 dark:text-slate-300', border: 'border-slate-200 dark:border-slate-700' },
  moderate: { bg: 'bg-slate-100 dark:bg-slate-900', text: 'text-slate-600 dark:text-slate-400', border: 'border-slate-200 dark:border-slate-700' },
  high: { bg: 'bg-slate-100 dark:bg-slate-900', text: 'text-accent-600 dark:text-accent-400', border: 'border-slate-300 dark:border-accent-600' },
  extreme: { bg: 'bg-slate-100 dark:bg-slate-900', text: 'text-accent-600 dark:text-accent-400', border: 'border-slate-300 dark:border-accent-600' },
};

export const riskOrder = ['low', 'moderate', 'high', 'extreme'];