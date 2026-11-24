import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SettingsProvider } from './hooks/useSettings';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Menu from './pages/Menu';
import Assistant from './pages/Assistant';
import MetricDetail from './pages/MetricDetail';
import './index.css';

function App() {
  return (
    <SettingsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="menu" element={<Menu />} />
            <Route path="assistant" element={<Assistant />} />
            <Route path="metric/:metricId" element={<MetricDetail />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </SettingsProvider>
  );
}

export default App;