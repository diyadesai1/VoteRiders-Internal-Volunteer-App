import { ArrowLeft, FileCheck, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { InfoCollectionScripts } from '../common/InfoCollectionScripts';

interface IDZendeskGuideProps {
  onBack: () => void;
  onComplete: () => void;
  flowType?: 'helpline' | 'chat';
}

export function IDZendeskGuide({ onBack, onComplete, flowType = 'helpline' }: IDZendeskGuideProps) {
  const [showInfoCollection, setShowInfoCollection] = useState(false);
  
  return (
    <main className="flex-1 overflow-auto">
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 group"
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Step 3</span>
        </button>

        {/* Page Header */}
        <div className="mb-8 flex items-center gap-4">
          <div
            className="rounded-2xl p-4"
            style={{ backgroundColor: '#F59E0B' }}
          >
            <FileCheck className="size-6 text-white" />
          </div>
          <div>
            <h1 className="mb-1">{flowType === 'chat' ? 'Chat' : 'Helpline'}: Step 4 - Zendesk Guide</h1>
            <p className="text-muted-foreground">
              Fill out the Zendesk ticket for ID assist questions
            </p>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">Final Step</span>
            <span className="text-sm" style={{ color: '#1AC166' }}>
              Step 4 of 4
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full transition-all duration-500 rounded-full"
              style={{ 
                backgroundColor: '#1AC166',
                width: '100%'
              }}
            />
          </div>
        </div>

        {/* Important Notice */}
        <div className="border border-border rounded-xl p-6 mb-8" style={{ backgroundColor: '#F59E0B' + '10', borderColor: '#F59E0B' + '30' }}>
          <div className="flex items-start gap-3">
            <FileCheck className="size-6 flex-shrink-0 mt-1" style={{ color: '#F59E0B' }} />
            <div>
              <h3 className="mb-2">Complete the Zendesk Ticket</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Follow the interactive Scribe guide below to properly document the voter's case in Zendesk. This ensures that the ID Assist team has all the information they need to help the voter.
              </p>
            </div>
          </div>
        </div>

        {/* Scribe Guide Embed */}
        <div className="border border-border bg-card rounded-xl overflow-hidden mb-8">
          <div className="bg-muted border-b border-border p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileCheck className="size-5" style={{ color: '#4A90E2' }} />
              <div>
                <h3 className="text-sm">Interactive Zendesk Guide</h3>
                <p className="text-xs text-muted-foreground">
                  Step-by-step instructions for completing the ticket
                </p>
              </div>
            </div>
            <a
              href="https://scribehow.com/viewer/Helpline_to_ID_Tutorial_Updated_42525__HR9I79GfTj-4cB6bwsozgA"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all hover:bg-muted-foreground/10"
              style={{ color: '#4A90E2' }}
            >
              <ExternalLink className="size-3.5" />
              <span>Open in New Tab</span>
            </a>
          </div>
          
          <div className="relative w-full" style={{ paddingBottom: '75%', minHeight: '600px' }}>
            <iframe
              src="https://scribehow.com/embed/Helpline_to_ID_Tutorial_Updated_42525__HR9I79GfTj-4cB6bwsozgA"
              title="Zendesk Guide for ID Assist"
              className="absolute top-0 left-0 w-full h-full"
              style={{ border: 'none' }}
              allowFullScreen
            />
          </div>
        </div>

        {/* Help Resources */}
        <div className="border border-border bg-card rounded-xl p-6 mb-8">
          <h3 className="mb-4">Additional Resources</h3>
          <div className="space-y-3">
            <button
              onClick={() => setShowInfoCollection(true)}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted transition-colors group w-full text-left"
            >
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F59E0B' + '20' }}>
                  <FileCheck className="size-5" style={{ color: '#F59E0B' }} />
                </div>
                <div>
                  <p className="text-sm">Information Collection Scripts</p>
                  <p className="text-xs text-muted-foreground">Email and text scripts for collecting voter information</p>
                </div>
              </div>
              <ExternalLink className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </button>

            <a
              href="https://sites.google.com/voteriders.org/volunteerintranet/helpline-and-chat"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#4A90E2' + '20' }}>
                  <FileCheck className="size-5" style={{ color: '#4A90E2' }} />
                </div>
                <div>
                  <p className="text-sm">VID Assist Team Leads</p>
                  <p className="text-xs text-muted-foreground">Who to tag in Slack for different states</p>
                </div>
              </div>
              <ExternalLink className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </a>

            <a
              href="https://drive.google.com/file/d/1v9CCQor2FMF6XFPu_sgFjx3o99ttNT1H/view"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#8B5CF6' + '20' }}>
                  <FileCheck className="size-5" style={{ color: '#8B5CF6' }} />
                </div>
                <div>
                  <p className="text-sm">Voter Agreement</p>
                  <p className="text-xs text-muted-foreground">Reference the voter agreement document</p>
                </div>
              </div>
              <ExternalLink className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-5 py-2.5 border border-border rounded-lg hover:bg-muted transition-all group"
          >
            <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
            Back to Step 3
          </button>

          <button
            onClick={onComplete}
            className="px-6 py-3 rounded-lg text-white transition-all hover:shadow-lg hover:scale-[1.02]"
            style={{ backgroundColor: '#1AC166' }}
          >
            Complete & Return to Dashboard
          </button>
        </div>
      </div>

      {/* Information Collection Modal Overlay */}
      <InfoCollectionScripts 
        selectedState=""
        isOpen={showInfoCollection}
        onClose={() => setShowInfoCollection(false)}
      />
    </main>
  );
}