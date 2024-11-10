import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignUp from './SignUp';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Default route (root) that shows LoginPage */}
        <Route path="/" element={<LoginPage />} />
        
        {/* Existing routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
