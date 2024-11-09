import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignUp from './SignUp'; // Make sure the import is correct

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Root route (/) will now point to the LoginPage */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Signup page */}
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
