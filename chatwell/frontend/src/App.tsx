import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import UserForm from './components/UserForm';
import Chat from './components/Chat';
import './App.css';
import './components/Home'
import HomePage from './components/Home';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Navbar /> */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/form" element={<UserForm />} />
            <Route path="/chat" element={<Chat/>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
