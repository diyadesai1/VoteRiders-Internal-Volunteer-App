import React, { useState, useEffect } from "react";
import GlobalLayout from "./global";
import { HelpCircle, CreditCard, ArrowLeft, Check, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Faq from "./faq";

export default function Chat() {
  const navigate = useNavigate();
  const [showFAQ, setShowFAQ] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [showFAQ]);

  return (
    <GlobalLayout>
      <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${showFAQ ? 'pt-10' : 'pt-24 lg:pt-32'} py-4`}>
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-8">CHAT FLOW</h1>

          {!showFAQ ? (
            <>
              {/* Step 1 */}
              <p className="text-2xl text-white mb-8 max-w-3xl mx-auto leading-snug">
                Does the voter have an easy-to-answer question, or do they need
                <br />
                ID assistance?
              </p>

              <div className="mb-12">
                <div className="text-white text-lg mb-2">Step 1 of 4</div>
                <div className="w-full max-w-2xl mx-auto bg-gray-600 rounded-full h-3">
                  <div className="bg-black h-3 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
                <button
                  onClick={() => setShowFAQ(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg flex items-center space-x-3 text-lg font-semibold transition-colors transition-transform group"
                >
                  <HelpCircle className="w-6 h-6 group-hover:rotate-12 transition-transform duration-200" />
                  <span>Easy to Answer</span>
                </button>

                <button
                  onClick={() => navigate('/dtree', { state: { from: 'chat' } })}
                  className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg flex items-center space-x-3 text-lg font-semibold transition-colors transition-transform group"
                >
                  <CreditCard className="w-6 h-6 group-hover:rotate-12 transition-transform duration-200" />
                  <span>ID Assistance</span>
                </button>
              </div>

              <button
                onClick={() => navigate(-1)}
                className="w-32 h-8 bg-white/20 rounded border border-white/30 mx-auto text-white flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>
            </>
          ) : (
            <>
              {/* Step 2: FAQ guide (mirrors Helpline Step 2) */}
              <p className="text-xl text-white mb-8 text-center">
                Use this FAQ and guide to answer the voter's question.
              </p>

              <div className="mb-8">
                <div className="text-white text-lg mb-2">Step 2 of 4</div>
                <div className="w-full max-w-2xl mx-auto bg-gray-600 rounded-full h-3">
                  <div className="bg-black h-3 rounded-full" style={{ width: '50%' }}></div>
                </div>
              </div>

              <Faq />

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
                <button
                  onClick={() => navigate('/chat-zendesk')}
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg flex items-center space-x-3 text-lg font-semibold transition-colors transition-transform"
                >
                  <Check className="w-6 h-6" />
                  <span>Answered</span>
                </button>
                
                <button 
                  onClick={() => navigate('/support')}
                  className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg flex items-center space-x-3 text-lg font-semibold transition-colors transition-transform">
                  <AlertCircle className="w-6 h-6" />
                  <span>Need Help</span>
                </button>
              </div>

              <button
                onClick={() => setShowFAQ(false)}
                className="w-32 h-8 bg-white/20 rounded border border-white/30 mx-auto text-white flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>
            </>
          )}
        </div>
      </main>
    </GlobalLayout>
  );
}
