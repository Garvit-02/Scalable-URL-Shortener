import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Shorten from './pages/Shorten';
import Dashboard from './pages/Dashboard';

import Links from './pages/Links';
import Analytics from './pages/Analytics';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Shorten />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/links" element={<Links />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
