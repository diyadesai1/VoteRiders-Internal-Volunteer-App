import React, { useState, useEffect } from "react";
import GlobalLayout from "../core/global";
import { HelpCircle, CreditCard, Check, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Faq from "../components/faq";
import FlowButton from "../components/ui/FlowButton";
import ProgressBar from "../components/ui/ProgressBar";
import BackButton from "../components/ui/BackButton";

export default function Chat() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: initial, 2: FAQ

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const TOTAL_STEPS = 4;

  const goBack = () => {
    if (step === 1) return navigate(-1);
    setStep(step - 1);
  };

  const topPadding = step === 1 ? 'pt-24 lg:pt-32' : 'pt-10';

  return (
    <GlobalLayout>
      <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${topPadding} py-4`}>
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-8">CHAT FLOW</h1>

          {step === 1 && (
            <>
              <p className="text-2xl text-white mb-8 max-w-3xl mx-auto leading-snug">
                Does the voter have an easy-to-answer question, or do they need
                <br />
                ID assistance?
              </p>
              <ProgressBar step={step} total={TOTAL_STEPS} />
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
                <FlowButton color="blue" icon={HelpCircle} onClick={() => setStep(2)}>Easy to Answer</FlowButton>
                <FlowButton color="red" icon={CreditCard} onClick={() => navigate('/dtree', { state: { from: 'chat' } })}>ID Assistance</FlowButton>
              </div>
              <BackButton onClick={goBack} />
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-xl text-white mb-8 text-center">
                Use this FAQ and guide to answer the voter's question.
              </p>
              <ProgressBar step={step} total={TOTAL_STEPS} />
              <Faq />
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
                <FlowButton color="green" icon={Check} onClick={() => navigate('/chat-zendesk')}>Answered</FlowButton>
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