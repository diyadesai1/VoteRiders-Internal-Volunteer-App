import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './login';
import Home from './home';
import Helpline from './helpline';
import Support from './support';
import Finish from './finish';
import DTree from './dtree';
import Agree from './agree';
import Zendesk from './zendesk';
import Chat from './chat';
import ChatZendesk from './chat_zendesk';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname, search, hash } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname, search, hash]);
  return null;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/home" element={<Home onLogout={handleLogout} />} />
        <Route path="/helpline" element={<Helpline onLogout={handleLogout} />} />
        <Route path="/support" element={<Support onLogout={handleLogout} />} />
        <Route path="/dtree" element={<DTree onLogout={handleLogout} />} />
        <Route path="/finish" element={<Finish onLogout={handleLogout} />} />
        <Route path="/agree" element={<Agree />} />
        <Route path="/zendesk" element={<Zendesk onLogout={handleLogout} />} />
        <Route path="/chat" element={<Chat onLogout={handleLogout} />} />
        <Route path="/chat-zendesk" element={<ChatZendesk onLogout={handleLogout} />} />
        <Route path="*" element={<Home onLogout={handleLogout} />} />
      </Routes>
    </Router>
  );
}

export default App;
