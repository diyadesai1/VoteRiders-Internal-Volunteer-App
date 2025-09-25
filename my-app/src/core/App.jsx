import React, { useState, useEffect } from 'react';
import './App.css';
import Login from '../pages/login';
import Home from '../pages/home';
import Helpline from '../pages/helpline';
import Support from '../pages/support';
import Finish from '../components/finish';
import DTree from '../components/dtree';
import Agree from '../components/agree';
import Zendesk from '../components/zendesk';
import Chat from '../pages/chat';
import ChatZendesk from '../components/chat_zendesk';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
// Added Firebase auth state handling
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { isEmailAllowed } from './firebase';

function ScrollToTop() {
  const { pathname, search, hash } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname, search, hash]);
  return null;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const allowed = await isEmailAllowed(user.email); // await async check
        if (!allowed) {
          // Immediately sign out without switching UI to home
          try { await signOut(auth); } catch(_) {}
          setIsLoggedIn(false);
          setLoadingAuth(false);
          return; // abort so we don't set logged in
        }
      }
      setIsLoggedIn(!!user);
      setLoadingAuth(false);
    });
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loadingAuth) {
    return (
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',color:'#fff',background:'#0f172a'}}>
        Loading...
      </div>
    );
  }

  if (!isLoggedIn) return <Login onLoginSuccess={() => { /* auth listener will flip state */ }} />;

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
