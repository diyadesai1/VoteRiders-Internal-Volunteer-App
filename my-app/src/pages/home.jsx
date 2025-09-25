import React from "react";
import GlobalLayout from "../core/global";
import { Phone, Lock, User, MessageCircle, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { auth } from "../core/firebase";

export default function Home({ onLogout }) {
  const navigate = useNavigate();

  // Centralized style & config to avoid repetition
  const baseActionBtn = "text-white px-8 py-4 rounded-lg flex items-center justify-center transition-colors transition-transform";
  const colorVariants = {
    blue: "bg-blue-500 hover:bg-blue-600",
    red: "bg-red-500 hover:bg-red-600"
  };
  const actionButtons = [
    { label: 'HELPLINE', to: '/helpline', color: 'blue', Icon: Phone },
    { label: 'CHAT', to: '/chat', color: 'red', Icon: MessageCircle }
  ];
  const features = [
    { Icon: User, text: '24/7 Support', iconColor: 'text-blue-300' },
    { Icon: Lock, text: 'Secure & Private', iconColor: 'text-green-300' }
  ];

  const ActionButton = ({ to, color, Icon, label }) => (
    <button
      onClick={() => navigate(to)}
      className={`${colorVariants[color]} ${baseActionBtn} group`}
    >
      <Icon className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-200" />
      {label}
    </button>
  );

  const FeatureChip = ({ Icon, text, iconColor }) => (
    <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-white">
      <Icon className={`w-4 h-4 mr-2 ${iconColor}`} />
      <span>{text}</span>
    </div>
  );

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
        <p className="text-xl font-bold text-white mb-4">
          Thanks for volunteering{auth.currentUser?.displayName ? `, ${auth.currentUser.displayName.split(' ')[0]}` : ''}!
        </p>
        <p className="text-lg text-white leading-relaxed max-w-md">
          Empowering democracy through accessible voting assistance and support for every citizen.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {actionButtons.map(btn => (
          <ActionButton key={btn.label} {...btn} />
        ))}
      </div>

      {/* Feature Labels */}
      <div className="flex flex-col sm:flex-row gap-4">
        {features.map(f => (
          <FeatureChip key={f.text} {...f} />
        ))}
      </div>
    </GlobalLayout>
  );
}
