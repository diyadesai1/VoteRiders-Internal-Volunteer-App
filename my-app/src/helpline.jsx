import React, { useState, useEffect } from "react";
import GlobalLayout from "./global";
import { ArrowLeft, HelpCircle, CreditCard, Check, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Faq from "./faq";

export default function Helpline({ onBack }) {
  const [showFAQ, setShowFAQ] = useState(false);
  // Add guide step state
  const [showGuide, setShowGuide] = useState(false);
  const navigate = useNavigate();

  const handleEasyAnswer = () => {
    setShowFAQ(true);
  };

  // Smoothly scroll to the top whenever the step toggles
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [showFAQ, showGuide]);

  return (
    <GlobalLayout>
      <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${showFAQ ? 'pt-16 lg:pt-16' : 'pt-24 lg:pt-32'} py-4`}>
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-8">HELPLINE FLOW</h1>
          
          {/* Step 3: Zendesk/Scribe guide */}
          {showGuide ? (
            <>
              <p className="text-xl text-white mb-8 text-center">
                Fill out the Zendesk guide for easy-to-answer questions.
              </p>

              <div className="mb-8">
                <div className="text-white text-lg mb-2">Step 3 of 4</div>
                <div className="w-full max-w-2xl mx-auto bg-gray-600 rounded-full h-3">
                  <div className="bg-black h-3 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>

              <div className="max-w-5xl mx-auto space-y-4 mb-6">
                <a
                  href="https://scribehow.com/viewer/Helpline_Guide__ScfEFDdKRsWE6KXslygI5A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Open Guide in New Tab
                </a>

                <div className="rounded-lg overflow-hidden border border-white/20">
                  <iframe
                    title="Helpline Guide"
                    src="https://scribehow.com/viewer/Helpline_Guide__ScfEFDdKRsWE6KXslygI5A"
                    className="w-full"
                    style={{ height: '75vh' }}
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Add green and red buttons in step 3 */}
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
                onClick={() => setShowGuide(false)}
                className="w-32 h-8 bg-white/20 rounded border border-white/30 mx-auto text-white flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>
            </>
          ) : (
            !showFAQ ? (
              <>
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
                    onClick={handleEasyAnswer}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg flex items-center space-x-3 text-lg font-semibold transition-colors transition-transform group"
                  >
                    <HelpCircle className="w-6 h-6 group-hover:rotate-12 transition-transform duration-200" />
                    <span>Easy to Answer</span>
                  </button>
                  
                  <button 
                    onClick={() => navigate('/dtree')}
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
                    onClick={() => setShowGuide(true)}
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
            )
          )}
        </div>
      </main>
    </GlobalLayout>
  );
}
