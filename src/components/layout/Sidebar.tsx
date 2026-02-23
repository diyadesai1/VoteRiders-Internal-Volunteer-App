import { Home, Link, Phone, MessageSquare, Network, BookOpen, LifeBuoy, HelpCircle, FileText, MessageCircle, MessagesSquare, PhoneCall, MessageCircleMore, ArrowUpRight } from 'lucide-react';
import type { Page } from '../../App';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const navigateWithUrl = (page: Page) => {
    // keep internal state navigation
    onNavigate(page);
    // map page to URL path
    let path = '/home';
    if (page === 'important-links') path = '/important-links';
    else if (page === 'helpline-step1') path = '/helpline';
    else if (page === 'chat-step1') path = '/chat';
    else if (page === 'resources-support') path = '/support';
    else if (page === 'resources-decision-tree') path = '/resources-decision-tree';
    else if (page === 'resources-research-based') path = '/resource-based';
    else if (page === 'resources-voter-agreement') path = '/resources-voter-agreement';

    window.history.pushState({}, '', path);
  };

  const mainMenuItems = [
    { icon: Home, label: 'Dashboard', page: 'dashboard' as Page, enabled: true },
    { icon: Link, label: 'Important Links', page: 'important-links' as Page, enabled: true },
    { icon: Phone, label: 'Helpline Flow', page: 'helpline-step1' as Page, enabled: true },
    { icon: MessageSquare, label: 'Chat Flow', page: 'chat-step1' as Page, enabled: true },
  ];

  const resourceItems = [
    { icon: Network, label: 'Decision Tree', page: 'resources-decision-tree' as Page },
    {
      icon: BookOpen,
      label: 'State Rules',
      page: 'resources-state-rules' as Page,
      href: 'https://www.voteriders.org/staterules/'
    },
    { icon: LifeBuoy, label: 'Support', page: 'resources-support' as Page },
    { icon: HelpCircle, label: 'Resource-Based', page: 'resources-research-based' as Page },
    { icon: FileText, label: 'Voter Agreement', page: 'resources-voter-agreement' as Page },
    {
      icon: PhoneCall,
      label: 'Helpline Guide',
      page: 'resources-helpline-guide' as Page,
      href: 'https://scribehow.com/viewer/Helpline_Guide__ScfEFDdKRsWE6KXslygI5A'
    },
    {
      icon: MessageCircleMore,
      label: 'Chat Guide',
      page: 'resources-chat-guide' as Page,
      href: 'https://scribehow.com/viewer/Chat_Guide__yupGjKBkRW6IoZ_egps3gQ'
    },
    {
      icon: ArrowUpRight,
      label: 'Escalate Ticket',
      page: 'resources-escalate-ticket' as Page,
      href: 'https://scribehow.com/viewer/Helpline_to_ID_Tutorial_Updated_42525__HR9I79GfTj-4cB6bwsozgA'
    },
  ];

  const toolsItems = [
    { icon: MessageCircle, label: 'Zendesk', href: 'https://voteridershelp.zendesk.com/agent' },
    { icon: MessagesSquare, label: 'Slack', href: 'https://voteriders.slack.com/' },
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
    if (item.page === 'chat-step1') {
      return currentPage.startsWith('chat');
    }
    if (item.page === 'important-links') {
      return currentPage === 'important-links';
    }
    return false;
  };

  
  return (
    <aside
      className="w-60 border-r flex flex-col"
      style={{ backgroundColor: '#191919', borderColor: '#2a2a2a', color: '#F7F9F7' }}
    >
      <div className="p-6">
        <h2 className="mb-1" style={{ color: '#F7F7F7' }}>
          VoteRiders
        </h2>
        <p className="text-sm" style={{ color: 'rgba(247, 249, 247, 0.7)' }}>
          Volunteer Dashboard
        </p>
      </div>
  
      <nav className="flex-1 px-4 space-y-4 overflow-y-auto">
        {/* Main */}
        <div>
          <p
            className="px-4 mb-1 text-[10px] tracking-wide uppercase"
            style={{ color: 'rgba(247, 249, 247, 0.5)' }}
          >
            Main
          </p>
          <div className="space-y-1">
            {mainMenuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item);
              return (
                <button
                  key={item.label}
                  onClick={() => navigateWithUrl(item.page)}
                  className="flex w-full items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors"
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
  
        {/* Tools */}
        <div>
          <p
            className="px-4 mb-1 text-[10px] tracking-wide uppercase"
            style={{ color: 'rgba(247, 249, 247, 0.5)' }}
          >
            Tools
          </p>
          <div className="space-y-1">
            {toolsItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => window.open(item.href, '_blank', 'noopener,noreferrer')}
                  className="flex w-full items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#F7F9F7',
                  }}
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
  
        {/* Resources */}
        <div>
          <p
            className="px-4 mb-1 mt-1 text-[10px] tracking-wide uppercase"
            style={{ color: 'rgba(247, 249, 247, 0.5)' }}
          >
            Resources
          </p>
          <div className="space-y-1">
            {resourceItems.map((item) => {
              const Icon = item.icon;
              const active = currentPage === item.page;
              const handleClick = () => {
                if ('href' in item && item.href) {
                  window.open(item.href, '_blank', 'noopener,noreferrer');
                } else {
                  navigateWithUrl(item.page);
                }
              };
              return (
                <button
                  key={item.label}
                  onClick={handleClick}
                  className="flex w-full items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors text-left"
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
                  <Icon className="size-4 shrink-0" />
                  <span className="leading-snug">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
  
      <div className="p-4 border-t mt-2" style={{ borderColor: '#2a2a2a' }}>
        <p className="text-xs" style={{ color: 'rgba(247, 249, 247, 0.5)' }}>
          Version 2.1.0
        </p>
        <p className="text-xs mt-1" style={{ color: 'rgba(247, 249, 247, 0.5)' }}>
          VoteRiders © 2026
        </p>
      </div>
    </aside>
  );

}
