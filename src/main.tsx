import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';
import App from './App';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<App />} />
        <Route path="/important-links" element={<App initialPage="important-links" />} />
        <Route path="/helpline" element={<App initialPage="helpline-step1" />} />
        <Route path="/chat" element={<App initialPage="chat-step1" />} />
        <Route path="/support" element={<App initialPage="resources-support" />} />
        <Route path="/resource-based" element={<App initialPage="resources-research-based" />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
