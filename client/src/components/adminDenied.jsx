import React from 'react';
import GlobalLayout from '../core/global';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminDenied({ onLogout }) {
  const navigate = useNavigate();
  return (
    <GlobalLayout onLogout={onLogout}>
      <div className="max-w-xl mx-auto mt-32 pt-8 text-center space-y-8">
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-400/30 flex items-center justify-center">
            <ShieldAlert className="w-10 h-10 text-red-400" />
          </div>
          <h1 className="text-3xl font-bold text-white">Access Restricted</h1>
          <p className="text-blue-200 leading-relaxed">
            You are signed in, but your account does not have administrator privileges. If you believe this is a mistake, please contact your program coordinator.
          </p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => navigate('/home')}
            className="px-5 py-2 rounded-md border border-white/30 text-white hover:bg-white/10 transition-all inline-flex items-center group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
        </div>
      </div>
    </GlobalLayout>
  );
}
