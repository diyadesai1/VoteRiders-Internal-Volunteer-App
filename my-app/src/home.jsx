import React from "react";
import GlobalLayout from "./global";
import { Phone, Lock, User, MessageCircle, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home({ onLogout }) {
  const navigate = useNavigate();
  return (
    <GlobalLayout onLogout={onLogout}>
      {/* Volunteer App Badge */}
      <div className="mt-16 mb-8">
        <button className="bg-blue-500/20 text-blue-200 border-blue-400/30 backdrop-blur-sm text-sm font-bold px-2 py-1 rounded-lg flex items-center">
          <Zap className="w-3 h-3 mr-1" />
          VOLUNTEER APP
        </button>
      </div>

      {/* Welcome Section */}
      <div className="mb-12 text-left mt-8">
        <h1 className="text-6xl font-bold text-white mb-2">WELCOME TO</h1>
        <h2 className="text-6xl font-extrabold mb-4">
          <span className="bg-gradient-to-r from-red-400 via-red-500 to-blue-500 bg-clip-text text-transparent">VOTERIDERS</span>
        </h2>
        <p className="text-xl font-bold text-white mb-4">Every voter. Every ballot. Every time.</p>
        <p className="text-lg text-white leading-relaxed max-w-md">
          Empowering democracy through accessible voting assistance and support for every citizen.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button 
          onClick={() => navigate('/helpline')}
          className="bg-blue-500 text-white px-8 py-4 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors transition-transform group"
        >
          <Phone className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-200" />
          HELPLINE
        </button>
        <button 
          onClick={() => navigate('/chat')}
          className="bg-red-500 text-white px-8 py-4 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors transition-transform group"
        >
          <MessageCircle className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-200" />
          CHAT
        </button>
      </div>

      {/* Feature Labels */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-white">
          <User className="w-4 h-4 mr-2 text-blue-300" />
          <span>24/7 Support</span>
        </div>
        <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-white">
          <Lock className="w-4 h-4 mr-2 text-green-300" />
          <span>Secure & Private</span>
        </div>
      </div>
    </GlobalLayout>
  );
}
