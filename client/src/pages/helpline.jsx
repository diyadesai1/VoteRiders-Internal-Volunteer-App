import React, { useState, useEffect } from "react";
import GlobalLayout from "../core/global";
import { HelpCircle, CreditCard, Check, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Faq from "../components/faq";
import FlowButton from "../components/ui/FlowButton";
import ProgressBar from "../components/ui/ProgressBar";
import BackButton from "../components/ui/BackButton";

export default function Helpline({ onBack }) {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [step]);

  const TOTAL_STEPS = 4;

  const goBack = () => {
    if (step === 1) {
      if (onBack) return onBack();
      return navigate(-1);
    }
    setStep(step - 1);
  };

  const topPadding = step === 1 ? 'pt-24 lg:pt-32' : 'pt-16 lg:pt-16';

  return (
    <GlobalLayout>
      <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${topPadding} py-4`}>
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-8">HELPLINE FLOW</h1>

          {step === 1 && (
            <>
              <p className="text-2xl text-white mb-8 max-w-3xl mx-auto leading-snug">Does the voter have an research-based question, or do they need<br />ID assistance?</p>
              <ProgressBar step={step} total={TOTAL_STEPS} />
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
                <FlowButton color="blue" icon={HelpCircle} onClick={() => setStep(2)}>Research-Based Question</FlowButton>
                <FlowButton color="red" icon={CreditCard} onClick={() => navigate('/dtree')}>ID Assistance</FlowButton>
              </div>
              <BackButton onClick={goBack} />
            </>
          )}

          {step === 2 && (
            <>
              {/* Resource links + intro moved from FAQ */}
              <div className="mb-6 flex flex-col items-center gap-4">
                <p className="text-center text-blue-100 text-base sm:text-lg max-w-2xl px-4">
                  Open these resources in a new tab, or use the FAQ search below to help the voter.
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 text-sm">
                  <a
                    href="https://example.com/faq-document" /* TODO: replace real FAQ doc URL */
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600/30 hover:bg-blue-600/40 text-blue-50 border border-blue-400/40 shadow-sm hover:shadow transition"
                  >
                    <span className="font-semibold">FAQ Doc</span>
                    <span className="opacity-80 text-[0.65rem] sm:text-xs tracking-wide uppercase">New Tab</span>
                  </a>
                  <a
                    href="https://www.voteriders.org/staterules"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/40 text-indigo-50 border border-indigo-400/40 shadow-sm hover:shadow transition"
                  >
                    <span className="font-semibold">State Rules</span>
                    <span className="opacity-80 text-[0.65rem] sm:text-xs tracking-wide uppercase">New Tab</span>
                  </a>
                </div>
              </div>
              <ProgressBar step={step} total={TOTAL_STEPS} />
              <Faq />
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
                <FlowButton color="green" icon={Check} onClick={() => setStep(3)}>Answered</FlowButton>
                <FlowButton color="red" icon={AlertCircle} onClick={() => navigate('/support')}>Need Help</FlowButton>
              </div>
              <BackButton onClick={goBack} />
            </>
          )}

          {step === 3 && (
            <>
              <p className="text-xl text-white mb-8 text-center">Fill out the Zendesk guide for research-based questions.</p>
              <ProgressBar step={step} total={TOTAL_STEPS} />
              <div className="max-w-5xl mx-auto space-y-4 mb-6">
                <a href="https://scribehow.com/viewer/Helpline_Guide__ScfEFDdKRsWE6KXslygI5A" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">Open Guide in New Tab</a>
                <div className="rounded-lg overflow-hidden border border-white/20">
                  <iframe title="Helpline Guide" src="https://scribehow.com/viewer/Helpline_Guide__ScfEFDdKRsWE6KXslygI5A" className="w-full" style={{ height: '75vh' }} allowFullScreen />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
                <FlowButton color="green" icon={Check} onClick={() => navigate('/finish')}>Filled Out</FlowButton>
                <FlowButton color="red" icon={AlertCircle} onClick={() => navigate('/support')}>Need Help</FlowButton>
              </div>
              <BackButton onClick={goBack} />
            </>
          )}
        </div>
      </main>
    </GlobalLayout>
  );
}
