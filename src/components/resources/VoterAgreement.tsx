import { ArrowLeft } from 'lucide-react';
import { VoterAgreementContent } from '../common/VoterAgreementContent';

interface VoterAgreementProps {
  onBack: () => void;
}

export function VoterAgreement({ onBack }: VoterAgreementProps) {
  return (
    <main className="flex-1 overflow-auto">
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 group"
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Dashboard</span>
        </button>

        {/* Voter Agreement Content - no flowType means standalone view */}
        <VoterAgreementContent />
      </div>
    </main>
  );
}