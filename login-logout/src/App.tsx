import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignUp from './SignUp'; // Make sure the import is correct

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Root route (/) will now point to the LoginPage /}
        <Route path="/login" element={<LoginPage />} />
        {/ Default route (root) that shows LoginPage /}
        <Route path="/" element={<LoginPage />} />

        {/ Signup page /}
        {/ Existing routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>);
}