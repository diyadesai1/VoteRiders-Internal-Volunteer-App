import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { MainContent } from './components/dashboard/MainContent';
import { OpeningScript } from './components/flows/OpeningScript';
import { IDAssistance } from './components/flows/IDAssistance';
import { VoterAgreementFlow } from './components/flows/VoterAgreementFlow';
import { ResearchZendeskGuide } from './components/flows/ResearchZendeskGuide';
import { IDZendeskGuide } from './components/flows/IDZendeskGuide';
import { ThankYou } from './components/flows/ThankYou';
import { ResearchBased } from './components/resources/ResearchBased';
import { ImportantLinks } from './components/resources/ImportantLinks';
import { DecisionTree } from './components/resources/DecisionTree';
import { VoterAgreement } from './components/resources/VoterAgreement';
import { Support } from './components/resources/Support';
import { useEffect, useState } from 'react';
import { SplashScreen } from './components/auth/SplashScreen';
import { LoginScreen } from './components/auth/LoginScreen';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';

// Re-export Page type for use in other components to avoid duplicate definitions
export type Page = 'dashboard' | 'helpline-step1' | 'helpline-step2-id' | 'helpline-step2-research' | 'helpline-step3' | 'helpline-step3-research-zendesk' | 'helpline-step4' | 'chat-step1' | 'chat-step2-id' | 'chat-step2-research' | 'chat-step3' | 'chat-step3-research-zendesk' | 'chat-step4' | 'thank-you' | 'resources-research-based' | 'resources-decision-tree' | 'resources-state-rules' | 'resources-support' | 'resources-faqs' | 'resources-voter-agreement' | 'important-links';

interface AppProps {
  initialPage?: Page;
}

export default function App({ initialPage = 'dashboard' }: AppProps) {
  const [currentPage, setCurrentPage] = useState<Page>(initialPage);
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  if (authLoading) {
    return null; // or a loading spinner if you prefer
  }

  if (!user) {
    return <LoginScreen onLoginSuccess={() => { /* onAuthStateChanged will update user */ }} />;
  }

  return (
    <div className="h-screen flex">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header currentPage={currentPage} />
        {currentPage === 'dashboard' && (
          <MainContent 
            onNavigateToHelpline={() => setCurrentPage('helpline-step1')} 
            onNavigateToChat={() => setCurrentPage('chat-step1')}
          />
        )}
        {currentPage === 'helpline-step1' && (
          <OpeningScript 
            onBack={() => setCurrentPage('dashboard')}
            onSelectResearch={() => setCurrentPage('helpline-step2-research')}
            onSelectID={() => setCurrentPage('helpline-step2-id')}
          />
        )}
        {currentPage === 'helpline-step2-id' && (
          <IDAssistance 
            onBack={() => setCurrentPage('helpline-step1')}
            onContinue={() => setCurrentPage('helpline-step3')}
          />
        )}
        {currentPage === 'helpline-step2-research' && (
          <ResearchBased 
            context="helpline"
            onBack={() => setCurrentPage('helpline-step1')}
            onContinue={() => setCurrentPage('helpline-step3-research-zendesk')}
          />
        )}
        {currentPage === 'helpline-step3' && (
          <VoterAgreementFlow 
            onBack={() => setCurrentPage('helpline-step2-id')}
            onComplete={() => setCurrentPage('helpline-step4')}
          />
        )}
        {currentPage === 'helpline-step3-research-zendesk' && (
          <ResearchZendeskGuide 
            onBack={() => setCurrentPage('helpline-step2-research')}
            onComplete={() => setCurrentPage('thank-you')}
          />
        )}
        {currentPage === 'helpline-step4' && (
          <IDZendeskGuide 
            onBack={() => setCurrentPage('helpline-step3')}
            onComplete={() => setCurrentPage('thank-you')}
          />
        )}
        {currentPage === 'thank-you' && (
          <ThankYou onReturnToDashboard={() => setCurrentPage('dashboard')} />
        )}
        
        {/* Chat Flow - using the same components as helpline but with flowType='chat' */}
        {currentPage === 'chat-step1' && (
          <OpeningScript 
            flowType="chat"
            onBack={() => setCurrentPage('dashboard')}
            onSelectResearch={() => setCurrentPage('chat-step2-research')}
            onSelectID={() => setCurrentPage('chat-step2-id')}
          />
        )}
        {currentPage === 'chat-step2-id' && (
          <IDAssistance 
            flowType="chat"
            onBack={() => setCurrentPage('chat-step1')}
            onContinue={() => setCurrentPage('chat-step3')}
          />
        )}
        {currentPage === 'chat-step2-research' && (
          <ResearchBased 
            context="helpline"
            onBack={() => setCurrentPage('chat-step1')}
            onContinue={() => setCurrentPage('chat-step3-research-zendesk')}
          />
        )}
        {currentPage === 'chat-step3' && (
          <VoterAgreementFlow 
            flowType="chat"
            onBack={() => setCurrentPage('chat-step2-id')}
            onComplete={() => setCurrentPage('chat-step4')}
          />
        )}
        {currentPage === 'chat-step3-research-zendesk' && (
          <ResearchZendeskGuide 
            flowType="chat"
            onBack={() => setCurrentPage('chat-step2-research')}
            onComplete={() => setCurrentPage('thank-you')}
          />
        )}
        {currentPage === 'chat-step4' && (
          <IDZendeskGuide 
            flowType="chat"
            onBack={() => setCurrentPage('chat-step3')}
            onComplete={() => setCurrentPage('thank-you')}
          />
        )}
        
        {currentPage === 'resources-research-based' && <ResearchBased context="resources" />}
        {currentPage === 'resources-decision-tree' && <DecisionTree />}
        {currentPage === 'important-links' && <ImportantLinks />}
        {currentPage === 'resources-voter-agreement' && <VoterAgreement onBack={() => setCurrentPage('dashboard')} />}
        {currentPage === 'resources-support' && <Support onBack={() => setCurrentPage('dashboard')} />}
      </div>
    </div>
  );
}