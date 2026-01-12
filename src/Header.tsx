import { ChevronDown } from 'lucide-react';
import type { Page } from './App';

interface HeaderProps {
  currentPage: Page;
}

export function Header({ currentPage }: HeaderProps) {
  const getPageTitle = () => {
    if (currentPage.startsWith('helpline')) {
      return 'Helpline';
    }
    return 'Dashboard';
  };

  return (
    <header className="bg-background px-8 py-4 border-b border-border">
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