import React from "react";
import GlobalLayout from "./global";
import { CheckCircle, RefreshCw, LogOut, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Finish({ onLogout }) {
  const navigate = useNavigate();
  const onRestart = () => navigate("/home");

  return (
    <GlobalLayout onLogout={onLogout}>
      <div className="relative z-10 container mx-auto px-6 text-center pt-16 md:pt-24 lg:pt-28 pb-16">
        <div className="max-w-2xl mx-auto space-y-10">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-gradient-to-r from-blue-500 to-red-500 flex items-center justify-center shadow-xl shadow-blue-500/20 ring-1 ring-white/10">
                <CheckCircle className="w-14 h-14 md:w-16 md:h-16 text-white drop-shadow" />
              </div>
              {/* subtle glow */}
              <div className="absolute inset-0 -z-10 blur-2xl rounded-3xl bg-blue-500/20" aria-hidden="true" />
            </div>
          </div>

          {/* Thank You Message */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              THANK YOU FOR
              <br />
              <span className="bg-gradient-to-r from-red-400 via-red-500 to-blue-500 bg-clip-text text-transparent">
                HELPING VOTERS
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white leading-relaxed">
              Your dedication to supporting democracy makes a real difference in voters' lives.
            </p>
          </div>

         
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pt-4">
            <button
              onClick={onRestart}
              className="group px-8 py-5 text-lg min-w-[200px] rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors transition-transform shadow-lg hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 inline-flex items-center justify-center"
            >
              <RefreshCw className="w-6 h-6 mr-3 transition-transform duration-300 group-hover:rotate-180" />
              HELP ANOTHER VOTER
            </button>

            <button
              onClick={onLogout}
              className="group px-8 py-5 text-lg min-w-[200px] rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors transition-transform shadow-lg hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/60 inline-flex items-center justify-center"
            >
              <LogOut className="w-6 h-6 mr-3 transition-transform group-hover:translate-x-0.5" />
              END SESSION
            </button>
          </div>

          {/* Additional Info */}
          <div className="pt-6 space-y-3">
            <div className="rounded-xl bg-white/10 ring-1 ring-white/10 p-4">
              <div className="flex items-center justify-center gap-2 text-white">
                <Star className="w-4 h-4 text-blue-300" />
                <span className="text-sm">Remember to complete any follow‑up tasks in Zendesk</span>
                <Star className="w-4 h-4 text-blue-300" />
              </div>
            </div>

            <p className="text-white/80 text-sm">
              Need assistance with the volunteer platform? Contact the VoteRiders team in Support section.
            </p>
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
}
