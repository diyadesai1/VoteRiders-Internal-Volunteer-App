import { Home, Link, Phone, MessageSquare, Network, BookOpen, LifeBuoy, HelpCircle } from 'lucide-react';

type Page =
  | 'dashboard'
  | 'helpline-step1'
  | 'helpline-step2-id'
  | 'helpline-step2-research'
  | 'helpline-step3'
  | 'helpline-step4-zendesk'
  | 'helpline-thank-you'
  | 'resources-important-links'
  | 'resources-research-based';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const mainMenuItems = [
    { icon: Home, label: 'Dashboard', page: 'dashboard' as Page, enabled: true },
    { icon: Link, label: 'Important Links', page: 'resources-important-links' as Page, enabled: true },
    { icon: Phone, label: 'Helpline Flow', page: 'helpline-step1' as Page, enabled: true },
    { icon: MessageSquare, label: 'Chat Flow', page: 'dashboard' as Page, enabled: false },
  ];

  const resourceItems = [
    { icon: Network, label: 'Decision Tree' },
    { icon: BookOpen, label: 'State Rules', href: 'https://www.voteriders.org/staterules' },
    { icon: LifeBuoy, label: 'Support' },
    { icon: HelpCircle, label: 'FAQs', page: 'resources-research-based' as Page }
  ];

  const isActive = (item: typeof mainMenuItems[0]) => {
    // Only mark as active if it's an enabled navigation item
    if (!item.enabled) return false;
    
    if (item.page === 'dashboard') {
      return currentPage === 'dashboard';
    }
    if (item.page === 'helpline-step1') {
      return currentPage.startsWith('helpline');
    }
    if (item.page === 'resources-important-links') {
      return currentPage === 'resources-important-links';
    }
    return false;
  };

  return (
    <aside className="w-60 border-r flex flex-col" style={{ backgroundColor: '#191919', borderColor: '#2a2a2a', color: '#F7F9F7' }}>
      <div className="p-6">
        <h2 className="mb-1" style={{ color: '#F7F9F7' }}>VoteRiders</h2>
        <p className="text-sm" style={{ color: 'rgba(247, 249, 247, 0.7)' }}>Volunteer Dashboard</p>
      </div>
      
      <nav className="flex-1 px-4 space-y-6">
        <div>
          <p className="px-4 mb-2 text-xs tracking-wide uppercase" style={{ color: 'rgba(247, 249, 247, 0.5)' }}>Main</p>
          <div className="space-y-1">
            {mainMenuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item);
              return (
                <button
                  key={item.label}
                  onClick={() => onNavigate(item.page)}
                  className="flex w-full items-center gap-3 px-4 py-2.5 rounded-lg transition-colors"
                  style={{
                    backgroundColor: active ? '#F7F9F7' : 'transparent',
                    color: active ? '#191919' : '#F7F9F7',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.backgroundColor = '#2a2a2a';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <Icon className="size-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="px-4 mb-2 text-xs tracking-wide uppercase" style={{ color: 'rgba(247, 249, 247, 0.5)' }}>Resources</p>
          <div className="space-y-1">
            {resourceItems.map((item) => {
              const Icon = item.icon;
              const handleClick = () => {
                if (item.href) {
                  window.open(item.href, '_blank', 'noopener,noreferrer');
                } else if (item.page) {
                  onNavigate(item.page);
                }
              };
              return (
                <button
                  key={item.label}
                  className="flex w-full items-center gap-3 px-4 py-2.5 rounded-lg transition-colors"
                  style={{ color: '#F7F9F7' }}
                  onClick={handleClick}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#2a2a2a';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <Icon className="size-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <div className="p-6 border-t" style={{ borderColor: '#2a2a2a' }}>
        <p className="text-xs" style={{ color: 'rgba(247, 249, 247, 0.5)' }}>Version 1.0.0</p>
        <p className="text-xs mt-1" style={{ color: 'rgba(247, 249, 247, 0.5)' }}>VoteRiders © 2025</p>
      </div>
    </aside>
  );
}