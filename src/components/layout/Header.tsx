import { ChevronDown } from 'lucide-react';

// extend Page type to cover all app pages
type Page =
  | 'dashboard'
  | 'helpline-step1'
  | 'helpline-step2-id'
  | 'helpline-step2-research'
  | 'chat-step1'
  | 'resources-decision-tree'
  | 'resources-state-rules'
  | 'resources-support'
  | 'resources-research-based'
  | 'resources-voter-agreement'
  | 'important-links';

interface HeaderProps {
  currentPage: Page;
}

export function Header({ currentPage }: HeaderProps) {
  const getPageTitle = () => {
    // Chat flow pages
    if (currentPage.startsWith('chat')) {
      return 'Chat Flow';
    }

    // Helpline flow pages
    if (currentPage.startsWith('helpline')) {
      return 'Helpline Flow';
    }

    // Resources pages
    switch (currentPage) {
      case 'resources-decision-tree':
        return 'Decision Tree';
      case 'resources-research-based':
        return 'Resource Based';
      case 'resources-support':
        return 'Support';
      case 'resources-voter-agreement':
        return 'Voter Agreement';
      // state rules is external, but if ever routed here you can customize later
      default:
        break;
    }

    // Important Links page
    if (currentPage === 'important-links') {
      return 'Important Links';
    }

    // Fallback for dashboard and any other case
    return 'Dashboard';
  };

  return (
    <header className="border-b border-border bg-background px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1>{getPageTitle()}</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p>Volunteer User</p>
            <p className="text-muted-foreground text-sm">Volunteer</p>
          </div>
          <div className="bg-[#0D80FF] text-white rounded-full size-10 flex items-center justify-center">
            <span>VU</span>
          </div>
          <ChevronDown className="size-4 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
}
