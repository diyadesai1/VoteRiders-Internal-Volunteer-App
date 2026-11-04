import { ArrowLeft, CreditCard } from 'lucide-react';
import { DecisionTree } from '../resources/DecisionTree';

interface IDAssistanceProps {
  onBack: () => void;
  onContinue: () => void;
  flowType?: 'helpline' | 'chat';
}

export function IDAssistance({ onBack, onContinue, flowType = 'helpline' }: IDAssistanceProps) {
  return (
    <main className="flex-1 overflow-auto">
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Step 1</span>
        </button>

        {/* Page Header */}
        <div className="mb-8 flex items-center gap-4">
          <div
            className="rounded-2xl p-4"
            style={{ backgroundColor: '#1AC166' }}
          >
            <CreditCard className="size-6 text-white" />
          </div>
          <div>
            <h1 className="mb-1">{flowType === 'chat' ? 'Chat' : 'Helpline'}: Step 2 - ID Assistance</h1>
            <p className="text-muted-foreground">
              Decision tree to determine the appropriate assistance for voter ID needs
            </p>
          </div>
        </div>

        {/* Embedded Decision Tree */}
        <DecisionTree embedded={true} flowType={flowType} onContinue={onContinue} />
      </div>
    </main>
  );
}
