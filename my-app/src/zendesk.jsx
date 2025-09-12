import React from "react";
import GlobalLayout from "./global";
import { useNavigate } from "react-router-dom";
import { Check, AlertCircle, ArrowLeft } from "lucide-react";

export default function Zendesk({ onLogout }) {
  const navigate = useNavigate();

  return (
    <GlobalLayout onLogout={onLogout}>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 py-4">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-8">ZENDESK/SCRIBE GUIDE</h1>

          <p className="text-xl text-white mb-8 text-center">
            Fill out the Zendesk guide for ID assist questions.
          </p>

          <div className="mb-8">
            <div className="text-white text-lg mb-2">Final Step</div>
            <div className="w-full max-w-2xl mx-auto bg-gray-600 rounded-full h-3">
              <div className="bg-black h-3 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto space-y-4 mb-6">
            <a
              href="https://scribehow.com/viewer/Helpline_to_ID_Tutorial_Updated_42525__HR9I79GfTj-4cB6bwsozgA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Open Guide in New Tab
            </a>

            <div className="rounded-lg overflow-hidden border border-white/20">
              <iframe
                title="Zendesk Guide for ID Assist"
                src="https://scribehow.com/viewer/Helpline_to_ID_Tutorial_Updated_42525__HR9I79GfTj-4cB6bwsozgA"
                className="w-full"
                style={{ height: '75vh' }}
                allowFullScreen
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <button
              onClick={() => navigate('/finish')}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg flex items-center space-x-3 text-lg font-semibold transition-colors transition-transform"
            >
              <Check className="w-6 h-6" />
              <span>Filled Out</span>
            </button>
            
            <button
              onClick={() => navigate('/support')}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg flex items-center space-x-3 text-lg font-semibold transition-colors transition-transform"
            >
              <AlertCircle className="w-6 h-6" />
              <span>Need Help</span>
            </button>
          </div>

          <button
            onClick={() => navigate('/agree')}
            className="w-32 h-8 bg-white/20 rounded border border-white/30 mx-auto text-white flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
        </div>
      </main>
    </GlobalLayout>
  );
}
