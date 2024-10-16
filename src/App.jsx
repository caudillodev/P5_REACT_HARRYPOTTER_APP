import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CharacterDetail from './pages/CharacterDetail';
import ErrorBoundary from './ErrorBoundary';

const App = () => (
  <Router>
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/character/:name" element={<CharacterDetail />} />
      </Routes>
    </ErrorBoundary>
  </Router>
);

export default App;