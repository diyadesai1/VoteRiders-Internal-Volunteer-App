import { ArrowLeft, FileText } from 'lucide-react';
import { useState } from 'react';

interface InformationCollectionProps {
  onBack: () => void;
  onContinue: () => void;
  flowType?: 'helpline' | 'chat';
}

export function InformationCollection({ onBack, onContinue, flowType = 'helpline' }: InformationCollectionProps) {
  const [scriptVersion, setScriptVersion] = useState<'phone-email' | 'text'>('phone-email');

  return (
    <main className="flex-1 overflow-auto">
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Step 2</span>
        </button>

        {/* Page Header */}
        <div className="mb-8 flex items-center gap-4">
          <div
            className="rounded-2xl p-4"
            style={{ backgroundColor: '#F59E0B' }}
          >
            <FileText className="size-6 text-white" />
          </div>
          <div>
            <h1 className="mb-1">{flowType === 'chat' ? 'Chat' : 'Helpline'}: Step 3 - Information Collection</h1>
            <p className="text-muted-foreground">
              ID Assistance Data Collection Script
            </p>
          </div>
        </div>

        {/* Script Version Selector */}
        <div className="mb-6 flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Select Version:</span>
          <button
            onClick={() => setScriptVersion('phone-email')}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              scriptVersion === 'phone-email'
                ? 'text-white'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
            style={scriptVersion === 'phone-email' ? { backgroundColor: '#4A90E2' } : {}}
          >
            Phone & Email Version
          </button>
          <button
            onClick={() => setScriptVersion('text')}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              scriptVersion === 'text'
                ? 'text-white'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
            style={scriptVersion === 'text' ? { backgroundColor: '#4A90E2' } : {}}
          >
            Text Version
          </button>
        </div>

        {/* Content Display */}
        <div className="border border-border bg-card rounded-xl p-8 mb-6">
          {scriptVersion === 'phone-email' ? (
            <div className="space-y-6">
              <div>
                <h3 className="mb-4">Phone & Email Version:</h3>
                <div className="bg-muted rounded-lg p-5 border border-border space-y-4">
                  <p className="leading-relaxed">
                    Great, thanks for that. Now I'll need to collect some additional information from you. Can you let me know:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li className="leading-relaxed">• The full address where you can receive mail?</li>
                    <li className="leading-relaxed">• Have you ever had an ID from your current state or any other state before? If so, what happened to it? (Is it current, expired, lost, etc.?) If you have a picture of it or know the number on it, please send that.</li>
                    <li className="leading-relaxed">• Do you have your social security card or know your social security number? Please do NOT share it with me, just let me know if you know it.</li>
                  </ul>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="size-6 rounded-full flex items-center justify-center text-xs text-white" style={{ backgroundColor: '#8B5CF6' }}>
                    ↓
                  </div>
                  <h3 className="text-sm">Ask the following if not collected during eligibility screening:</h3>
                </div>
                <div className="bg-muted rounded-lg p-5 border border-border space-y-2">
                  <p className="leading-relaxed">• Please provide a direct phone number and email address</p>
                  <p className="leading-relaxed">• Do you have your birth certificate? If needed, we can help get that, too.</p>
                  <p className="leading-relaxed">• Your birth date</p>
                  <p className="leading-relaxed">• The city/state where you were born</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="size-6 rounded-full flex items-center justify-center text-xs text-white" style={{ backgroundColor: '#8B5CF6' }}>
                    1
                  </div>
                  <h3 className="text-sm">Message 1:</h3>
                </div>
                <div className="bg-muted rounded-lg p-5 border border-border space-y-4">
                  <p className="leading-relaxed">
                    Great, thanks for that. Now I'll have a series of questions for you. Please let me know:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li className="leading-relaxed">• The full address where you can receive mail.</li>
                    <li className="leading-relaxed">• Your email address if you have one</li>
                    <li className="leading-relaxed">• Have you ever had an ID from your current state or any other state before? If so, what happened to it? (Is it current, expired, lost, etc.?) If you have a picture of it or know the number on it, please send that.</li>
                    <li className="leading-relaxed">• Do you have your Social Security card or know your Social Security number? (Please do NOT share it with me, just let me know if you know it.)</li>
                  </ul>
                  <p className="leading-relaxed">Thanks!</p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="size-6 rounded-full flex items-center justify-center text-xs text-white" style={{ backgroundColor: '#8B5CF6' }}>
                    2
                  </div>
                  <h3 className="text-sm">Message 2: (If not collected during eligibility screening)</h3>
                </div>
                <div className="bg-muted rounded-lg p-5 border border-border space-y-2">
                  <p className="leading-relaxed">• Do you have your birth certificate?</p>
                  <p className="leading-relaxed">• What's your birth date?</p>
                  <p className="leading-relaxed">• Where were you born (city/state)?</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Continue Button */}
        <div className="flex justify-end">
          <button
            onClick={onContinue}
            className="px-6 py-3 rounded-lg text-white transition-all hover:shadow-lg hover:scale-[1.02]"
            style={{ backgroundColor: '#1AC166' }}
          >
            Continue to Step 4
          </button>
        </div>
      </div>
    </main>
  );
}