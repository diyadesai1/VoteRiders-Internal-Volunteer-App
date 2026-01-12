import { ArrowLeft, FileText, Copy, Check, MessageSquare, Phone, Shield, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface Step3VoterAgreementProps {
  onBack: () => void;
  onComplete: () => void;
}

export function Step3VoterAgreement({ onBack, onComplete }: Step3VoterAgreementProps) {
  const [scriptMode, setScriptMode] = useState<'verbal' | 'text'>('verbal');
  const [verbalCopied, setVerbalCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const AGREEMENT_LINK = 'https://drive.google.com/file/d/1v9CCQor2FMF6XFPu_sgFjx3o99ttNT1H/view';
  
  const verbalScript = `You have asked VoteRiders to help you get a state ID or other documents. In order to do this, we will need to ask you questions and get certain information.

We will use this information to fill out online applications for you to get the documents you need.

We will take reasonable steps to keep this information safe and private.

We will pay for the costs of the documents and provide you with a free ride to the DMV or other offices if needed using an independent ride agency.

We don't promise that you will be able to get your ID. You agree that you will not make a claim against us if we are unsuccessful in those efforts. We also cannot promise that you will be able to vote – but, we'll do our very best on all this!

We may share anonymous information about your experience to help others understand ID-related challenges. Only general aspects of your situation may be used as examples, and identifying details will never be shared unless VoteRiders first contacts you to obtain your explicit permission.

Do you understand and agree with what I have just said? Can you confirm that you are at least 16 years of age, a current US citizen, and therefore meet the criteria for receiving free ID help from VoteRiders?`;

  const copyVerbalScript = async () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(verbalScript);
        setVerbalCopied(true);
        setTimeout(() => setVerbalCopied(false), 2000);
        return;
      } catch (e) {
        console.warn('Clipboard API failed, trying fallback', e);
      }
    }
    
    try {
      const textarea = document.createElement('textarea');
      textarea.value = verbalScript;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setVerbalCopied(true);
      setTimeout(() => setVerbalCopied(false), 2000);
    } catch (e) {
      console.error('Copy failed', e);
      alert('Copy to clipboard failed. Please manually select and copy the script.');
    }
  };

  const copyAgreementLink = async () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(AGREEMENT_LINK);
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
        return;
      } catch (e) {
        console.warn('Clipboard API failed, trying fallback', e);
      }
    }
    
    try {
      const textarea = document.createElement('textarea');
      textarea.value = AGREEMENT_LINK;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (e) {
      console.error('Copy failed', e);
      alert('Copy to clipboard failed. Please manually copy: ' + AGREEMENT_LINK);
    }
  };

  return (
    <main className="flex-1 overflow-auto">
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 group"
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Step 2</span>
        </button>

        {/* Page Header - Matching Step 1 & 2 style */}
        <div className="mb-8 flex items-center gap-4">
          <div
            className="rounded-2xl p-4"
            style={{ backgroundColor: '#8B5CF6' }}
          >
            <FileText className="size-6 text-white" />
          </div>
          <div>
            <h1 className="mb-1">Helpline: Step 3 - Virtual Voter Agreement</h1>
            <p className="text-muted-foreground">
              Essential information that must be shared with voters before providing ID assistance
            </p>
          </div>
        </div>

        {/* Important Notice */}
        <div className="border border-border rounded-xl p-6 mb-8" style={{ backgroundColor: '#F59E0B' + '10', borderColor: '#F59E0B' + '30' }}>
          <div className="flex items-start gap-3">
            <Shield className="size-6 flex-shrink-0 mt-1" style={{ color: '#F59E0B' }} />
            <div>
              <h3 className="mb-2">Important Requirements</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                When assisting voters with their ID needs, it is important that the voter understands what VoteRiders will do for them, why we will be asking for certain information, what we will do with it and that we will be taking reasonable steps to keep the information safe and private.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Since virtual work does not easily allow our written Voter Agreement to be shared with the voter, please provide the following information with the voter verbally and ask them to confirm that they understand.
              </p>
            </div>
          </div>
        </div>

        {/* Spanish Version Quick Access */}
        <div className="border border-border bg-card rounded-xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="mb-1">Spanish Language Support</h3>
              <p className="text-sm text-muted-foreground">
                For Spanish-speaking voters, use the Spanish version of the Voter Agreement
              </p>
            </div>
            <a
              href="https://drive.google.com/file/d/1I8qeyObJLm88SzlcIVR5s1NPbfwPZ8AU/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white transition-all hover:shadow-lg hover:scale-[1.02] whitespace-nowrap"
              style={{ backgroundColor: '#4A90E2' }}
            >
              <FileText className="size-4" />
              <span>Open Spanish Version</span>
              <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>PDF</span>
            </a>
          </div>
        </div>

        {/* Script Display */}
        <div className="border border-border bg-card rounded-xl p-6 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="mb-1">Verbal Agreement Script</h3>
              <p className="text-sm text-muted-foreground">
                Share the voter agreement using one of the methods below
              </p>
            </div>
            
            {/* Toggle between Verbal and Text */}
            <div className="inline-flex rounded-lg border border-border p-1 bg-muted/30">
              <button
                onClick={() => setScriptMode('verbal')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all text-sm ${
                  scriptMode === 'verbal'
                    ? 'bg-card shadow-sm'
                    : 'hover:bg-card/50 text-muted-foreground'
                }`}
                style={scriptMode === 'verbal' ? { color: '#4A90E2' } : {}}
              >
                <Phone className="size-3.5" />
                <span>Verbal</span>
              </button>
              
              <button
                onClick={() => setScriptMode('text')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all text-sm ${
                  scriptMode === 'text'
                    ? 'bg-card shadow-sm'
                    : 'hover:bg-card/50 text-muted-foreground'
                }`}
                style={scriptMode === 'text' ? { color: '#1AC166' } : {}}
              >
                <MessageSquare className="size-3.5" />
                <span>Text</span>
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm">
                {scriptMode === 'verbal' 
                  ? 'Read this script aloud to the voter and confirm their understanding'
                  : 'Copy and send this link to the voter via text message'
                }
              </p>
              <button
                onClick={scriptMode === 'verbal' ? copyVerbalScript : copyAgreementLink}
                className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-lg hover:bg-muted transition-colors text-sm"
              >
                {(scriptMode === 'verbal' ? verbalCopied : linkCopied) ? (
                  <>
                    <Check className="size-3.5" style={{ color: '#1AC166' }} />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {scriptMode === 'verbal' ? (
              <div>
                <div className="bg-muted rounded-lg p-4 border border-border mb-4">
                  <p className="leading-relaxed whitespace-pre-line">{verbalScript}</p>
                </div>
                <div className="rounded-lg p-4 border-l-4" style={{ backgroundColor: '#4A90E2' + '10', borderColor: '#4A90E2' }}>
                  <p className="text-sm">
                    <strong>Note:</strong> This script can also be texted to the voter in advance of the call and their agreement recorded in the checkbox on the ID form or the Internal Notes Section of the Zendesk ticket.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <div className="bg-muted rounded-lg p-4 border border-border mb-4">
                  <p className="text-sm text-muted-foreground break-all select-all">
                    {AGREEMENT_LINK}
                  </p>
                </div>
                <div className="flex gap-3 mb-4">
                  <button
                    onClick={copyAgreementLink}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white transition-all hover:shadow-lg"
                    style={{ backgroundColor: '#1AC166' }}
                  >
                    <Copy className="size-4" />
                    {linkCopied ? 'Link Copied!' : 'Copy Agreement Link'}
                  </button>
                  <a
                    href={AGREEMENT_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-lg hover:bg-muted transition-colors"
                  >
                    <ExternalLink className="size-4" />
                    Open PDF
                  </a>
                </div>
                <div className="rounded-lg p-4 border-l-4" style={{ backgroundColor: '#1AC166' + '10', borderColor: '#1AC166' }}>
                  <p className="text-sm">
                    <strong>Instructions:</strong> Paste the link in your text. After the voter confirms, record their agreement in the checkbox on the ID form or the Internal Notes Section of the Zendesk ticket.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-5 py-2.5 border border-border rounded-lg hover:bg-muted transition-all group"
          >
            <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
            Back to Step 2
          </button>

          <button
            onClick={onComplete}
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