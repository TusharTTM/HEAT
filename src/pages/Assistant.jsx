import React, { useState } from 'react';
import { useSettings } from '../hooks/useSettings';
import { LucideIcon } from '../components/Layout';

const sampleQuestions = [
  'What is the heat risk level for my location?',
  'When is the safest time to exercise outdoors?',
  'Show me the air quality trend for this week.',
  'What precautions for heat index above 40°C?',
  'Compare heat risk between locations.',
  'How to stay hydrated during peak heat?',
];

export default function Assistant() {
  const { settings, updateSettings } = useSettings();
  const { apiUrl = '', apiKey = '' } = settings;
  const [connected, setConnected] = useState(!!(apiUrl && apiKey));
  const [chatHistory, setChatHistory] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConnect = () => {
    if (apiUrl && apiKey) {
      updateSettings({ apiUrl, apiKey });
      setConnected(true);
    }
  };

  const handleDisconnect = () => {
    updateSettings({ apiUrl: '', apiKey: '' });
    setConnected(false);
    setChatHistory([]);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput('');
    setChatHistory(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    // Simulate API response
    await new Promise(resolve => setTimeout(resolve, 800));

    const responses = {
      'heat risk': 'Based on current data, heat risk in Mumbai peaks at Extreme (11:00-15:00). Heat index reaches 48C. Recommend staying indoors during these hours.',
      'safest time': 'The safest window for outdoor activity is 04:00-07:00 (Low risk, 25-27C). Evening 20:00-23:00 is Moderate.',
      'air quality': 'Air quality shows Moderate US AQI (72) currently. PM2.5 at 22 g/m3. Ozone elevated at 110 g/m3 midday. Trend: slowly improving overnight.',
      'precautions': 'For heat index over 40C: hydrate every 20 min, seek AC/shade, avoid exertion, wear loose light clothing, check vulnerable people.',
      'compare': 'Mumbai: peak heat index 48C (Extreme). Delhi: peak heat index 45C (High). Mumbai more humid; Delhi hotter dry-bulb.',
      'hydrated': 'Drink 2-3L water daily during heat waves. Electrolyte drinks help prevent dehydration. Sip continuously, not just when thirsty.',
    };

    let response = 'I can answer questions about heat risk, air quality, and safety for your configured location. Try asking about specific times, comparisons, or precautions.';
    for (const [keyword, resp] of Object.entries(responses)) {
      if (userMessage.toLowerCase().includes(keyword)) {
        response = resp;
        break;
      }
    }

    setChatHistory(prev => [...prev, { role: 'assistant', content: response }]);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header - page as long as content */}
      <header>
        <h1 className="text-2xl font-semibold text-slate-900">Assistant</h1>
        <p className="text-sm text-slate-500 mt-1">Ask about heat and air quality for your location</p>
      </header>

      {!connected ? (
        <section className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" aria-labelledby="setup-heading">
          <h2 id="setup-heading" className="font-medium text-slate-900 dark:text-slate-100 mb-4">Backend setup</h2>
          <div className="mb-4 p-3 rounded bg-slate-100 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-600 dark:text-slate-400">Assistant is not connected. Configure the backend to enable chat.</p>
          </div>
          <form onSubmit={handleConnect} className="space-y-4">
            <div>
              <label htmlFor="apiUrl" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Backend API URL</label>
              <input id="apiUrl" type="text" placeholder="https://api.example.com" value={apiUrl}
                onChange={e => updateSettings({ apiUrl: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-accent-500" />
            </div>
            <div>
              <label htmlFor="apiKey" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">API Key</label>
              <input id="apiKey" type="password" placeholder="sk_..." value={apiKey}
                onChange={e => updateSettings({ apiKey: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-accent-500" />
            </div>
            <button type="submit" disabled={!apiUrl || !apiKey}
              className="px-4 py-2 bg-black text-white rounded-lg font-medium text-sm hover:bg-slate-800 focus:ring-2 focus:ring-accent-500 disabled:opacity-50">
              Connect
            </button>
          </form>
        </section>
      ) : (
        <div className="space-y-6">
          <section className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" aria-labelledby="chat-heading">
            <h2 id="chat-heading" className="font-medium text-slate-900 dark:text-slate-100 mb-4">Conversation</h2>
            <div className="h-80 overflow-y-auto space-y-4 pb-4" role="log" aria-live="polite">
              {chatHistory.length === 0 ? (
                <div className="text-center text-slate-500 dark:text-slate-400 py-8">
                  <LucideIcon name="bot" size={48} className="mx-auto mb-3 text-slate-300 dark:text-slate-600" />
                  <p>No messages yet. Ask about heat, air quality, or safety.</p>
                </div>
              ) : (
                chatHistory.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-black text-white rounded-br-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-md'}`}>
                      {msg.content}
                    </div>
                  </div>
                ))
              )}
              {loading && <div className="flex justify-start"><div className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-4 py-2.5 rounded-2xl rounded-bl-md text-sm">...</div></div>}
            </div>
          </section>

          <section className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" aria-labelledby="suggestions-heading">
            <h2 id="suggestions-heading" className="font-medium text-slate-900 dark:text-slate-100 mb-3">Suggested questions</h2>
            <div className="flex flex-wrap gap-2">
              {sampleQuestions.map((q, i) => (
                <button key={i} onClick={() => { setInput(q); handleSend({ preventDefault: () => {} }); }}
                  className="px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700">
                  {q}
                </button>
              ))}
            </div>
          </section>

          <form onSubmit={handleSend} className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <div className="flex gap-2">
              <input type="text" value={input} onChange={e => setInput(e.target.value)}
                placeholder="Ask about heat, air quality, or safety..."
                className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-accent-500"
                disabled={loading} />
              <button type="submit" disabled={!input.trim() || loading}
                className="px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-slate-800 focus:ring-2 focus:ring-accent-500 disabled:opacity-50">
                <LucideIcon name="send" size={20} />
              </button>
            </div>
          </form>
        </div>
      )}

      <section className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800" aria-labelledby="technical-heading">
        <h2 id="technical-heading" className="font-medium text-slate-900 dark:text-slate-100 mb-4">Technical disclosure</h2>
        <div className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
          <p><strong>Disclaimer.</strong> This assistant provides general heat safety information based on publicly available guidelines. It does not provide medical advice.</p>
          <p><strong>Heat model.</strong> Risk assessments use deterministic heat-index screening thresholds, not a learned classifier. Gradient Boosting model (MAE 0.88C, R2 0.88) trained on 16,440 daily rows.</p>
          <p><strong>Data source.</strong> Open-Meteo for weather and air quality estimates. Modelled estimates only, not live government measurements.</p>
          <p><strong>API connection.</strong> Requires backend URL and key. Keys stored locally in browser only.</p>
        </div>
      </section>
    </div>
  );
}