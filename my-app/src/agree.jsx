import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import GlobalLayout from "./global";
import { ArrowLeft, FileText, MessageSquare, Phone, Copy, CheckCircle, Users, Shield } from "lucide-react";

export default function Agree({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const fromFlow = location?.state?.from === 'chat' ? 'chat' : 'helpline';
  const [scriptMode, setScriptMode] = useState('verbal');
  const [isAgreed, setIsAgreed] = useState(false);
  const [copied, setCopied] = useState(false);

  const verbalScript = `You have asked VoteRiders to help you get a state ID or other documents. In order to do this, we will need to ask you questions and get certain information
We will use this information to fill out online applications for you to get the documents you need
We will take reasonable steps to keep this information safe and private
We will pay for the costs of the documents and provide you with a free ride to the DMV or other offices if needed using an independent ride agency
We don't promise that you will be able to get your ID. You agree that you will not make a claim against us if we are unsuccessful in those efforts. We also cannot promise that you will be able to vote – but, we'll do our very best on all this!
We may share anonymous information about your experience to help others understand ID-related challenges. Only general aspects of your situation may be used as examples, and identifying details will never be shared unless VoteRiders first contacts you to obtain your explicit permission.
Do you understand and agree with what I have just said? Can you confirm that you are at least 16 years of age, a current US citizen, and therefore meet the criteria for receiving free ID help from VoteRiders?`;

  const textScript = `You have asked VoteRiders to help you get a state ID or other documents
In order to do this, we will need to ask you questions and get certain information
We will use this information to fill out online applications for you to get the documents you need
We will take reasonable steps to keep this information safe and private
We will pay for the costs of the documents and provide you with a free ride to the DMV or other offices if needed using an independent ride agency
We don't promise that you will be able to get your ID. You agree that you will not make a claim against us if we are unsuccessful in those efforts. We also cannot promise that you will be able to vote – but, we'll do our very best on all this!
We may share anonymous information about your experience to help others understand ID-related challenges. Only general aspects of your situation may be used as examples, and identifying details will never be shared unless VoteRiders first contacts you to obtain your explicit permission.
Do you understand and agree with what you have just read?
Can you confirm that you are at least 16 years of age, a current US citizen, and therefore meet the criteria for receiving free ID help from VoteRiders?`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(textScript).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const onBack = () => navigate('/dtree', { state: { from: fromFlow } });
  const onComplete = () => navigate('/zendesk');

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
                <button
                  onClick={() => setScriptMode('verbal')}
                  className={`${scriptMode === 'verbal' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-white/10 text-white hover:bg-white/20'} px-3 py-2 rounded-md inline-flex items-center`}
                >
                  <Phone className="w-4 h-4 mr-2" /> Verbal Script
                </button>
                <button
                  onClick={() => setScriptMode('text')}
                  className={`${scriptMode === 'text' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-white/10 text-white hover:bg-white/20'} px-3 py-2 rounded-md inline-flex items-center`}
                >
                  <MessageSquare className="w-4 h-4 mr-2" /> Text Message
                </button>
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
                    <h3 className="text-white font-medium">Text Message Script</h3>
                  </>
                )}
              </div>

              {scriptMode === 'text' && (
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-2 border border-white/30 text-white hover:bg-white/10 rounded-md inline-flex items-center"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" /> Copy Text
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              {scriptMode === 'verbal' ? (
                <div>
                  <div className="mb-4">
                    <span className="inline-block px-2 py-1 rounded border bg-blue-500/20 text-blue-200 border-blue-400/30 mb-3 text-xs font-medium">
                      READ ALOUD TO VOTER
                    </span>
                  </div>
                  <ul className="list-disc pl-6 space-y-2 text-white font-mono text-sm">
                    {verbalScript
                      .split('\n')
                      .filter((line) => line.trim().length > 0)
                      .map((line, idx) => (
                        <li key={idx}>{line}</li>
                      ))}
                  </ul>
                  <div className="mt-6 p-4 bg-blue-500/10 border border-blue-400/20 rounded">
                    <p className="text-blue-200 text-sm text-left">
                      <strong>Note:</strong> This script can also be texted to the voter in advance of the call and their agreement recorded in the checkbox on the ID form or the Internal Notes Section of the Zendesk ticket.
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-4">
                    <span className="inline-block px-2 py-1 rounded border bg-green-500/20 text-green-200 border-green-400/30 mb-3 text-xs font-medium">
                      COPY AND PASTE TO TEXT THE VOTER
                    </span>
                  </div>
                  <ul className="list-disc pl-6 space-y-2 text-white font-mono text-sm">
                    {textScript
                      .split('\n')
                      .filter((line) => line.trim().length > 0)
                      .map((line, idx) => (
                        <li key={idx}>{line}</li>
                      ))}
                  </ul>
                  <div className="mt-6 p-4 bg-green-500/10 border border-green-400/20 rounded">
                    <p className="text-green-200 text-sm text-left">
                      <strong>Instructions:</strong> Copy this message and text it to the voter, then record their agreement in the checkbox on the ID form or the Internal Notes Section of the Zendesk ticket.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Agreement Confirmation */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 mb-8">
            <h3 className="text-white font-medium mb-4">Volunteer Confirmation</h3>
            <div className="space-y-4">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAgreed}
                  onChange={(e) => setIsAgreed(e.target.checked)}
                  className="mt-1 h-4 w-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-blue-200 text-sm leading-relaxed text-left">
                  I have shared the Voter Agreement script with the voter and received their understanding and agreement. I have confirmed they are at least 16 years old and a US citizen, meeting the criteria for VoteRiders ID assistance.
                </span>
              </label>

              {isAgreed && (
                <div className="p-4 bg-green-500/10 border border-green-400/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-green-200 font-medium">Agreement Confirmed</span>
                  </div>
                  <p className="text-green-300 text-sm mt-1 text-left">Remember to record this confirmation in your Zendesk ticket notes.</p>
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
              disabled={!isAgreed}
              className={`${
                isAgreed
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                  : 'bg-gray-600 cursor-not-allowed'
              } text-white transition-all duration-300 px-6 py-2 rounded-md inline-flex items-center`}
            >
              {isAgreed ? (
                <>
                  <ArrowLeft className="w-4 h-4 mr-2 rotate-180" />
                  Continue
                </>
              ) : (
                <>
                  <Users className="w-4 h-4 mr-2" />
                  Confirm Agreement First
                </>
              )}
            </button>
          </div>
        </div>
      </main>
    </GlobalLayout>
  );
}
