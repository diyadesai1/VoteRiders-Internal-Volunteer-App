import { useState } from 'react';

interface InfoCollectionScriptsProps {
  selectedState: string;
  isOpen: boolean;
  onClose: () => void;
}

export function InfoCollectionScripts({ selectedState, isOpen, onClose }: InfoCollectionScriptsProps) {
  const [scriptType, setScriptType] = useState<'email' | 'text'>('text');

  const emailCollectionScript = `Great, thanks for that.  Now I'll need to collect some additional information from you.  Can you let me know:
• The full address where you can receive mail?
• Have you ever had an ID from ${selectedState || '[STATE]'} or any other state before?  If so, what happened to it?  (Is it current, expired, lost, etc.?)  If you have a picture of it or know the number on it, please send that.
• Your birth date${selectedState ? '' : ' (if you were unable to get that information before)'}:
• The city/state where you were born:
• Do you have your birth certificate? (If needed, we can help get that, too.)
• Do you have your social security card or know your social security number? (Please do NOT share it with me, just let me know if you know it.)

Looking forward to hearing back from you so we can get your case over to the folks who will work with you to get what you need!

ALSO:
• Ask for direct phone number or email address, if not already in ticket/profile.${selectedState === 'Georgia' ? '\n• If GA voter: Is this your permanent residence?' : ''}`;

  const textCollectionScript1 = `Great, thanks for that.  Now I'll have a series of questions for you. Please let me know:
• The full address where you can receive mail
• Have you ever had an ID from ${selectedState || '[STATE]'} or any other state before?  If so, what happened to it?  (Is it current, expired, lost, etc.?)  If you have a picture of it or know the number on it, please send that.
• Do you have your birth certificate?
• Do you have your Social Security card or know your Social Security number? (Please do NOT share it with me, just let me know if you know it.)
More questions to come.  Thanks!`;

  const textCollectionScript2 = `Thanks, now more questions.
• What's your birth date?${selectedState ? '' : ' (If you didn\'t get this info at the beginning of the text exchange)'}
• Where were you born (city/state)?`;

  const textCollectionScript3 = `Thanks again!  Now please send your email address if you have one.${selectedState === 'Georgia' ? '\nAnd if GA voter:\n• Is the address you gave me your permanent residence?' : ''}`;

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-background/40 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-card border border-border rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-card border-b border-border px-6 py-5 z-10 rounded-t-2xl">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="mb-1">Information Collection Scripts</h2>
              <p className="text-sm text-muted-foreground">
                Use these scripts to collect voter information{selectedState ? ` for ${selectedState}` : ''}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors -mr-2 -mt-1"
              aria-label="Close"
            >
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setScriptType('text')}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                scriptType === 'text'
                  ? 'text-white'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
              style={scriptType === 'text' ? { backgroundColor: '#4A90E2' } : {}}
            >
              Text
            </button>
            <button
              onClick={() => setScriptType('email')}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                scriptType === 'email'
                  ? 'text-white'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
              style={scriptType === 'email' ? { backgroundColor: '#4A90E2' } : {}}
            >
              Email
            </button>
          </div>
        </div>

        <div className="p-6">
          {scriptType === 'text' ? (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="size-6 rounded-full flex items-center justify-center text-xs text-white" style={{ backgroundColor: '#8B5CF6' }}>
                    1
                  </div>
                  <h3 className="text-sm">First text message</h3>
                </div>
                <div className="bg-muted rounded-lg p-5 border border-border ml-8">
                  <p className="leading-relaxed whitespace-pre-line text-sm">{textCollectionScript1}</p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="size-6 rounded-full flex items-center justify-center text-xs text-white" style={{ backgroundColor: '#8B5CF6' }}>
                    2
                  </div>
                  <h3 className="text-sm">After they respond to first message</h3>
                </div>
                <div className="bg-muted rounded-lg p-5 border border-border ml-8">
                  <p className="leading-relaxed whitespace-pre-line text-sm">{textCollectionScript2}</p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="size-6 rounded-full flex items-center justify-center text-xs text-white" style={{ backgroundColor: '#8B5CF6' }}>
                    3
                  </div>
                  <h3 className="text-sm">Final text message</h3>
                </div>
                <div className="bg-muted rounded-lg p-5 border border-border ml-8">
                  <p className="leading-relaxed whitespace-pre-line text-sm">{textCollectionScript3}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-muted rounded-lg p-5 border border-border">
              <p className="leading-relaxed whitespace-pre-line">{emailCollectionScript}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}