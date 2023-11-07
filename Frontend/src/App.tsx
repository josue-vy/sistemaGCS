import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppRouter from './routes/AppRouter';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path="/*" element={<AppRouter />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
