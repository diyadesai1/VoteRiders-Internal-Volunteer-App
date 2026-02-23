import { ArrowLeft } from 'lucide-react';
import { VoterAgreementContent } from '../common/VoterAgreementContent';

interface VoterAgreementFlowProps {
  onBack: () => void;
  onComplete: () => void;
  flowType?: 'helpline' | 'chat';
}

export function VoterAgreementFlow({ onBack, onComplete, flowType = 'helpline' }: VoterAgreementFlowProps) {
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

        {/* Voter Agreement Content */}
        <VoterAgreementContent flowType={flowType} />

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
            Continue to Step 5
          </button>
        </div>
      </div>
    </main>
  );
}