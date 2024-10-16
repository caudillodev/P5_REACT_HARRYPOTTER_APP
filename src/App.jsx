import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CharacterDetail from './pages/CharacterDetail';
import ErrorBoundary from './ErrorBoundary';

const App = () => (
  <Router>
    <ErrorBoundary>
    <div className="bg-warning" style={{ minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/character/:name" element={<CharacterDetail />} />
        </Routes>
      </div>
    </ErrorBoundary>
  </Router>
);

export default App;