import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import GlobalLayout from "../core/global";
import { ArrowLeft, FileText, MessageSquare, Phone, Shield } from "lucide-react"; // Removed CheckCircle, Users

export default function Agree({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const fromFlow = location?.state?.from === 'chat' ? 'chat' : 'helpline';
  const [scriptMode, setScriptMode] = useState('verbal');
  const [linkCopied, setLinkCopied] = useState(false); // new state for copy feedback

  const AGREEMENT_LINK = 'https://drive.google.com/file/d/1NT7XvuwkG3IDvsOZS-KClskPbEmJ4gIh/view';
  const copyAgreementLink = async () => {
    try {
      await navigator.clipboard.writeText(AGREEMENT_LINK);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (e) {
      alert('Copy failed. Please copy manually: ' + AGREEMENT_LINK);
    }
  };

  const verbalScript = `You have asked VoteRiders to help you get a state ID or other documents. In order to do this, we will need to ask you questions and get certain information\nWe will use this information to fill out online applications for you to get the documents you need\nWe will take reasonable steps to keep this information safe and private\nWe will pay for the costs of the documents and provide you with a free ride to the DMV or other offices if needed using an independent ride agency\nWe don't promise that you will be able to get your ID. You agree that you will not make a claim against us if we are unsuccessful in those efforts. We also cannot promise that you will be able to vote – but, we'll do our very best on all this!\nWe may share anonymous information about your experience to help others understand ID-related challenges. Only general aspects of your situation may be used as examples, and identifying details will never be shared unless VoteRiders first contacts you to obtain your explicit permission.\nDo you understand and agree with what I have just said? Can you confirm that you are at least 16 years of age, a current US citizen, and therefore meet the criteria for receiving free ID help from VoteRiders?`;

  const MODES = [
    { key: 'verbal', label: 'Verbal Script', Icon: Phone, activeColor: 'bg-blue-600 hover:bg-blue-700', inactiveColor: 'bg-white/10 hover:bg-white/20' },
    { key: 'text', label: 'Text Message', Icon: MessageSquare, activeColor: 'bg-green-600 hover:bg-green-700', inactiveColor: 'bg-white/10 hover:bg-white/20' }
  ];

  const onBack = () => navigate('/dtree', { state: { from: fromFlow } });
  const onComplete = () => navigate('/zendesk');

  const InfoNote = ({ color = 'blue', children }) => (
    <div className={`mt-6 p-4 bg-${color}-500/10 border border-${color}-400/20 rounded`}>{children}</div>
  );

  return (
    <GlobalLayout onLogout={onLogout}>
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-6 mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <FileText className="w-8 h-8 text-green-300" />
              <h1 className="text-3xl md:text-4xl font-bold text-white">VIRTUAL VOTER AGREEMENT</h1>
            </div>
            <div>
              <span className="inline-block text-xs px-2 py-1 rounded border border-white/20 text-blue-200 bg-white/10">
                Flow: {fromFlow === 'chat' ? 'Chat' : 'Helpline'}
              </span>
            </div>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Essential information that must be shared with voters before providing ID assistance.
            </p>
            {/* Spanish Version Quick Access */}
            <div className="mt-4">
              <a
                href="https://drive.google.com/file/d/1I8qeyObJLm88SzlcIVR5s1NPbfwPZ8AU/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white font-semibold shadow-lg hover:from-blue-300 hover:via-blue-400 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 transition"
              >
                <span>Click to Open Spanish Version</span>
                <span className="text-xs uppercase tracking-wide bg-white/20 px-2 py-0.5 rounded">PDF</span>
              </a>
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-yellow-500/10 border border-yellow-400/20 rounded-2xl p-6 mb-6">
            <div className="flex items-start space-x-3">
              <Shield className="w-6 h-6 text-yellow-300 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-white font-medium mb-2 text-left">Important Requirements</h3>
                <p className="text-yellow-200 text-sm leading-relaxed text-left">
                  When assisting voters with their ID needs, it is important that the voter understands what VoteRiders will do for them, why we will be asking for certain information, what we will do with it and that we will be taking reasonable steps to keep the information safe and private.
                </p>
                <p className="text-yellow-200 text-sm leading-relaxed mt-2 text-left">
                  Since virtual work does not easily allow our written Voter Agreement to be shared with the voter, please provide the following information with the voter verbally and ask them to confirm that they understand.
                </p>
              </div>
            </div>
          </div>

          {/* Script Mode Toggle */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h3 className="text-white font-medium text-left">Script Mode</h3>
                <p className="text-blue-200 text-sm">Choose how you'll share the agreement with the voter</p>
              </div>
              <div className="flex gap-2">
                {MODES.map(m => {
                  const active = scriptMode === m.key;
                  const Icon = m.Icon;
                  return (
                    <button
                      key={m.key}
                      onClick={() => setScriptMode(m.key)}
                      className={`${active ? m.activeColor + ' text-white' : m.inactiveColor + ' text-white'} px-3 py-2 rounded-md inline-flex items-center`}
                    >
                      <Icon className="w-4 h-4 mr-2" /> {m.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Script Content */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 mb-6 text-left">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {scriptMode === 'verbal' ? (
                  <>
                    <Phone className="w-5 h-5 text-blue-300" />
                    <h3 className="text-white font-medium">Verbal Script for Phone/Video Calls</h3>
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-5 h-5 text-green-300" />
                    <h3 className="text-white font-medium">Text Message Link</h3>
                  </>
                )}
              </div>
              {scriptMode === 'text' && (
                <button
                  type="button"
                  onClick={copyAgreementLink}
                  className="px-3 py-2 border border-white/30 text-white hover:bg-white/10 rounded-md inline-flex items-center"
                >
                  <FileText className="w-4 h-4 mr-2" /> {linkCopied ? 'Link Copied!' : 'Copy Link'}
                </button>
              )}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              {scriptMode === 'verbal' ? (
                <div>
                  <span className="inline-block px-2 py-1 rounded border bg-blue-500/20 text-blue-200 border-blue-400/30 mb-4 text-xs font-medium">
                    READ ALOUD TO VOTER
                  </span>
                  <ul className="list-disc pl-6 space-y-2 text-white font-mono text-sm">
                    {verbalScript.split('\n').map((line, idx) => line.trim() && <li key={idx}>{line}</li>)}
                  </ul>
                  <InfoNote>
                    <p className="text-blue-200 text-sm text-left">
                      <strong>Note:</strong> This script can also be texted to the voter in advance of the call and their agreement recorded in the checkbox on the ID form or the Internal Notes Section of the Zendesk ticket.
                    </p>
                  </InfoNote>
                </div>
              ) : (
                <div>
                  <span className="inline-block px-2 py-1 rounded border bg-green-500/20 text-green-200 border-green-400/30 mb-4 text-xs font-medium">
                    COPY AND TEXT TO VOTER
                  </span>
                  <p className="text-white text-sm mb-3 text-left">
                    Click the button below to copy the agreement link, then paste it into your text message to the voter. Ask them to review it and confirm their agreement.
                  </p>
                  <button
                    type="button"
                    onClick={copyAgreementLink}
                    className="inline-flex items-center px-3 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white text-sm"
                  >
                    <FileText className="w-4 h-4 mr-2" /> {linkCopied ? 'Link Copied!' : 'Copy Agreement Link'}
                  </button>
                  <p className="text-green-200 text-xs mt-3 break-all select-all">
                    {AGREEMENT_LINK}
                  </p>
                  <InfoNote color="green">
                    <p className="text-green-200 text-sm text-left">
                      <strong>Instructions:</strong> Paste the link in your text. After the voter confirms, record their agreement in the checkbox on the ID form or the Internal Notes Section of the Zendesk ticket.
                    </p>
                  </InfoNote>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={onBack}
              className="px-4 py-2 rounded-md border border-white/30 text-white hover:bg-white/10 backdrop-blur-sm hover:border-white/50 transition-all duration-300 inline-flex items-center group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Decision Tree
            </button>

            <div className="text-center">
              <p className="text-blue-200 text-sm">Virtual Voter Agreement - Step 4 of 4</p>
            </div>

            <button
              onClick={onComplete}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all duration-300 px-6 py-2 rounded-md inline-flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2 rotate-180" />
              Continue
            </button>
          </div>
        </div>
      </main>
    </GlobalLayout>
  );
}
