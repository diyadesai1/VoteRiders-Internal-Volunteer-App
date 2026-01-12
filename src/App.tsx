import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { MainContent } from './MainContent';
import { Step1 } from './components/helpline/Step1';
import { Step2IDAssistance } from './components/helpline/Step2IDAssistance';
import { Step2Research } from './components/helpline/Step2Research';
import { Step3VoterAgreement } from './components/helpline/Step3VoterAgreement';
import { Step4Zendesk } from './components/helpline/Step4Zendesk';
import { ThankYou } from './components/helpline/ThankYou';
import { ImportantLinks } from './components/resources/ImportantLinks';
import { ResearchBased } from './components/resources/ResearchBased';

import { useState } from 'react';

export type Page =
  | 'dashboard'
  | 'helpline-step1'
  | 'helpline-step2-id'
  | 'helpline-step2-research'
  | 'helpline-step3'
  | 'helpline-step4-zendesk'
  | 'helpline-thank-you'
  | 'resources-important-links'
  | 'resources-research-based';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [lastHelplineStep, setLastHelplineStep] = useState<'id' | 'research' | null>(null);

  return (
    <div className="h-screen flex">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header currentPage={currentPage} />
        {currentPage === 'dashboard' && (
          <MainContent onNavigateToHelpline={() => setCurrentPage('helpline-step1')} />
        )}
        {currentPage === 'helpline-step1' && (
          <Step1 
            onBack={() => setCurrentPage('dashboard')}
            onSelectResearch={() => setCurrentPage('resources-research-based')}
            onSelectID={() => setCurrentPage('helpline-step2-id')}
          />
        )}
        {currentPage === 'helpline-step2-id' && (
          <Step2IDAssistance
            onBack={() => setCurrentPage('helpline-step1')}
            onContinue={() => {
              setLastHelplineStep('id');
              setCurrentPage('helpline-step3');
            }}
          />
        )}
        {currentPage === 'helpline-step2-research' && (
          <Step2Research
            onBack={() => setCurrentPage('helpline-step1')}
            onContinue={() => {
              setLastHelplineStep('research');
              setCurrentPage('helpline-step3');
            }}
          />
        )}
        {currentPage === 'helpline-step3' && (
          <Step3VoterAgreement
            onBack={() =>
              setCurrentPage(
                lastHelplineStep === 'research' ? 'helpline-step2-research' : 'helpline-step2-id',
              )
            }
            onComplete={() => setCurrentPage('helpline-step4-zendesk')}
          />
        )}
        {currentPage === 'helpline-step4-zendesk' && (
          <Step4Zendesk
            onBack={() => setCurrentPage('helpline-step3')}
            onComplete={() => setCurrentPage('helpline-thank-you')}
          />
        )}
        {currentPage === 'helpline-thank-you' && (
          <ThankYou onReturnToDashboard={() => setCurrentPage('dashboard')} />
        )}
        {currentPage === 'resources-important-links' && <ImportantLinks />}
        {currentPage === 'resources-research-based' && <ResearchBased context="resources" />}
      </div>
    </div>
  );
}