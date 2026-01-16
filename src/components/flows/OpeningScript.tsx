import { ArrowLeft, FileQuestion, CreditCard, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface OpeningScriptProps {
  onBack: () => void;
  onSelectResearch: () => void;
  onSelectID: () => void;
  flowType?: 'helpline' | 'chat';
}

export function OpeningScript({ onBack, onSelectResearch, onSelectID, flowType = 'helpline' }: OpeningScriptProps) {
  const [selectedType, setSelectedType] = useState<'research' | 'id' | null>(null);
  const [copied, setCopied] = useState(false);

  const script = "Hi [VOTER NAME (if available)]! I'm [YOUR NAME/ALIAS], a VoteRiders volunteer, and I'm happy to help! To make sure I can assist you quickly, could you please share your full name, the state you live in, your ZIP code, and your question? That'll help me figure out the best next steps for you.";

  const handleCopyScript = async () => {
    // Try modern clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(script);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
      } catch (e) {
        console.warn('Clipboard API failed, trying fallback', e);
      }
    }
    
    // Fallback: use textarea method
    try {
      const textarea = document.createElement('textarea');
      textarea.value = script;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Copy failed', e);
      alert('Copy to clipboard failed. Please manually select and copy the script.');
    }
  };

  const handleContinue = () => {
    if (selectedType === 'research') {
      onSelectResearch();
    } else if (selectedType === 'id') {
      onSelectID();
    }
  };

  return (
    <main className="flex-1 overflow-auto">
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Dashboard</span>
        </button>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="mb-2">{flowType === 'chat' ? 'Chat' : 'Helpline'}: Step 1</h1>
          <p className="text-muted-foreground">
            Start with the opening script to gather voter information
          </p>
        </div>

        {/* Opening Script Section - Always visible */}
        <div className="border border-border bg-card rounded-xl p-6 mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="mb-1">Opening Script</h3>
              <p className="text-sm text-muted-foreground">
                Use this script to greet the voter and gather initial information
              </p>
            </div>
            <button
              onClick={handleCopyScript}
              className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              {copied ? (
                <>
                  <Check className="size-4" style={{ color: '#1AC166' }} />
                  <span className="text-sm">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="size-4" />
                  <span className="text-sm">Copy</span>
                </>
              )}
            </button>
          </div>
          
          <div className="bg-muted rounded-lg p-4 border border-border">
            <p className="leading-relaxed">{script}</p>
          </div>
        </div>

        {/* Selection Instructions */}
        <div className="mb-4">
          <h2 className="mb-2">After gathering voter information, select assistance type:</h2>
        </div>

        {/* Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => setSelectedType('research')}
            className={`group border p-8 rounded-2xl transition-all text-left ${
              selectedType === 'research'
                ? 'border-[#8B5CF6] bg-[#8B5CF6]/5 shadow-md'
                : 'border-border bg-card hover:shadow-lg'
            }`}
          >
            <div
              className="rounded-2xl p-4 mb-4 inline-block"
              style={{ backgroundColor: '#8B5CF6' }}
            >
              <FileQuestion className="size-6 text-white" />
            </div>
            <h3 className="mb-2">Resource-Based Question</h3>
            <p className="text-muted-foreground">
              Voter needs information about registration, voting locations, or general voting process
            </p>
          </button>

          <button
            onClick={() => setSelectedType('id')}
            className={`group border p-8 rounded-2xl transition-all text-left ${
              selectedType === 'id'
                ? 'border-[#1AC166] bg-[#1AC166]/5 shadow-md'
                : 'border-border bg-card hover:shadow-lg'
            }`}
          >
            <div
              className="rounded-2xl p-4 mb-4 inline-block"
              style={{ backgroundColor: '#1AC166' }}
            >
              <CreditCard className="size-6 text-white" />
            </div>
            <h3 className="mb-2">ID Assistance</h3>
            <p className="text-muted-foreground">
              Voter needs help obtaining voter ID or understanding ID requirements
            </p>
          </button>
        </div>

        {/* Next Steps Button - Shows when option is selected */}
        {selectedType && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 flex justify-end">
            <button 
              onClick={handleContinue}
              className="px-6 py-3 rounded-lg text-white transition-all hover:shadow-lg"
              style={{ backgroundColor: selectedType === 'research' ? '#8B5CF6' : '#1AC166' }}
            >
              Continue to Step 2
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
