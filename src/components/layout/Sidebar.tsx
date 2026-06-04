import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Home,
  Link,
  Phone,
  MessageSquare,
  Network,
  BookOpen,
  LifeBuoy,
  HelpCircle,
  FileText,
  MessageCircle,
  MessagesSquare,
  PhoneCall,
  MessageCircleMore,
  ArrowUpRight,
  PhoneOff,
  ChevronDown,
  type LucideIcon,
} from 'lucide-react';
import type { Page } from '../../App';

type ResourceItem = {
  icon: LucideIcon;
  label: string;
  page: Page;
  href?: string;
};

const primaryResourceItems: ResourceItem[] = [
  { icon: Network, label: 'Decision Tree', page: 'resources-decision-tree' },
  { icon: FileText, label: 'Voter Agreement', page: 'resources-voter-agreement' },
  { icon: HelpCircle, label: 'FAQs', page: 'resources-research-based' },
  { icon: PhoneOff, label: 'CMs & No Phone', page: 'resources-case-managers-no-phone' },
];

const moreResourceItems: ResourceItem[] = [
  {
    icon: BookOpen,
    label: 'State Rules',
    page: 'resources-state-rules',
    href: 'https://www.voteriders.org/staterules/',
  },
  { icon: LifeBuoy, label: 'Support', page: 'resources-support' },
  {
    icon: PhoneCall,
    label: 'Helpline Guide',
    page: 'resources-helpline-guide' as Page,
    href: 'https://scribehow.com/viewer/Helpline_Guide__ScfEFDdKRsWE6KXslygI5A',
  },
  {
    icon: MessageCircleMore,
    label: 'Chat Guide',
    page: 'resources-chat-guide' as Page,
    href: 'https://scribehow.com/viewer/Chat_Guide__yupGjKBkRW6IoZ_egps3gQ',
  },
  {
    icon: ArrowUpRight,
    label: 'Escalate Ticket',
    page: 'resources-escalate-ticket' as Page,
    href: 'https://scribehow.com/viewer/Helpline_to_ID_Tutorial_Updated_42525__HR9I79GfTj-4cB6bwsozgA',
  },
];

const MORE_MENU_HEIGHT = 240;
const SCROLL_HINT_KEY = 'vr-sidebar-scroll-hint-seen';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const navigateWithUrl = (page: Page) => {
    onNavigate(page);
    let path = '/home';
    if (page === 'important-links') path = '/important-links';
    else if (page === 'helpline-step1') path = '/helpline';
    else if (page === 'chat-step1') path = '/chat';
    else if (page === 'resources-support') path = '/support';
    else if (page === 'resources-decision-tree') path = '/resources-decision-tree';
    else if (page === 'resources-research-based') path = '/resource-based';
    else if (page === 'resources-voter-agreement') path = '/resources-voter-agreement';
    else if (page === 'resources-case-managers-no-phone') path = '/resources-case-managers-no-phone';

    window.history.pushState({}, '', path);
  };

  const mainMenuItems = [
    { icon: Home, label: 'Dashboard', page: 'dashboard' as Page, enabled: true },
    { icon: Link, label: 'Important Links', page: 'important-links' as Page, enabled: true },
    { icon: Phone, label: 'Helpline Flow', page: 'helpline-step1' as Page, enabled: true },
    { icon: MessageSquare, label: 'Chat Flow', page: 'chat-step1' as Page, enabled: true },
  ];

  const navRef = useRef<HTMLElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [flyoutTop, setFlyoutTop] = useState(0);
  const [showScrollFade, setShowScrollFade] = useState(false);
  const [chevronHint, setChevronHint] = useState(true);

  const updateScrollHint = useCallback(() => {
    const nav = navRef.current;
    const moreBtn = moreButtonRef.current;
    if (!nav || !moreBtn) return;

    const navRect = nav.getBoundingClientRect();
    const btnRect = moreBtn.getBoundingClientRect();
    const moreBelowFold = btnRect.bottom > navRect.bottom - 12;
    const canScrollFurther = nav.scrollHeight > nav.clientHeight + nav.scrollTop + 8;

    setShowScrollFade(!moreMenuOpen && (moreBelowFold || canScrollFurther));
  }, [moreMenuOpen]);

  useEffect(() => {
    updateScrollHint();
    const nav = navRef.current;
    if (!nav) return;

    nav.addEventListener('scroll', updateScrollHint);
    window.addEventListener('resize', updateScrollHint);
    return () => {
      nav.removeEventListener('scroll', updateScrollHint);
      window.removeEventListener('resize', updateScrollHint);
    };
  }, [updateScrollHint]);

  useEffect(() => {
    if (sessionStorage.getItem(SCROLL_HINT_KEY)) {
      setChevronHint(false);
      return;
    }

    const nav = navRef.current;
    const moreBtn = moreButtonRef.current;
    if (!nav || !moreBtn) return;

    const navRect = nav.getBoundingClientRect();
    const btnRect = moreBtn.getBoundingClientRect();

    if (btnRect.bottom <= navRect.bottom - 12) {
      setChevronHint(false);
      return;
    }

    sessionStorage.setItem(SCROLL_HINT_KEY, '1');
    const scrollDown = Math.min(
      btnRect.bottom - navRect.bottom + 28,
      nav.scrollHeight - nav.clientHeight - nav.scrollTop
    );

    if (scrollDown <= 0) return;

    const startTop = nav.scrollTop;
    window.setTimeout(() => {
      nav.scrollTo({ top: startTop + scrollDown, behavior: 'smooth' });
    }, 400);

    window.setTimeout(() => {
      nav.scrollTo({ top: startTop + scrollDown * 0.35, behavior: 'smooth' });
    }, 1100);

    window.setTimeout(() => setChevronHint(false), 3200);
  }, []);

  const openMoreMenu = () => {
    const btn = moreButtonRef.current;
    if (btn) {
      const rect = btn.getBoundingClientRect();
      const maxTop = window.innerHeight - MORE_MENU_HEIGHT - 16;
      setFlyoutTop(Math.min(Math.max(rect.top, 16), maxTop));
    }
    setMoreMenuOpen(true);
    setChevronHint(false);
  };

  const closeMoreMenu = () => setMoreMenuOpen(false);

  const toggleMoreMenu = () => {
    if (moreMenuOpen) closeMoreMenu();
    else openMoreMenu();
  };

  const toolsItems = [
    { icon: MessageCircle, label: 'Zendesk', href: 'https://voteridershelp.zendesk.com/agent' },
    { icon: MessagesSquare, label: 'Slack', href: 'https://voteriders.slack.com/' },
  ];

  const handleMoreResourceClick = (item: ResourceItem) => {
    closeMoreMenu();
    if (item.href) {
      window.open(item.href, '_blank', 'noopener,noreferrer');
    } else {
      navigateWithUrl(item.page);
    }
  };

  const renderResourceButton = (item: ResourceItem, inFlyout = false) => {
    const Icon = item.icon;
    const active = currentPage === item.page;

    return (
      <button
        key={item.label}
        onClick={() => {
          if (inFlyout) {
            handleMoreResourceClick(item);
          } else if (item.href) {
            window.open(item.href, '_blank', 'noopener,noreferrer');
          } else {
            navigateWithUrl(item.page);
          }
        }}
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
  };

  const isActive = (item: typeof mainMenuItems[0]) => {
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

  const moreMenuActive = moreResourceItems.some((item) => item.page === currentPage);

  return (
    <aside
      className="relative w-60 border-r flex flex-col"
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

      <div className="relative flex-1 min-h-0 flex flex-col">
        <div className="relative flex-1 min-h-0">
        <nav ref={navRef} className="h-full px-4 space-y-4 overflow-y-auto pb-2">
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

          <div>
            <p
              className="px-4 mb-1 mt-1 text-[10px] tracking-wide uppercase"
              style={{ color: 'rgba(247, 249, 247, 0.5)' }}
            >
              Resources
            </p>
            <div className="space-y-1">
              {primaryResourceItems.map((item) => renderResourceButton(item))}
            </div>
          </div>
        </nav>

        {showScrollFade && (
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-14"
            style={{
              background:
                'linear-gradient(to top, #191919 30%, rgba(25, 25, 25, 0.85) 55%, transparent)',
            }}
            aria-hidden
          />
        )}
        </div>

        <div className="px-4 pb-2 pt-1 shrink-0">
          <button
            ref={moreButtonRef}
            type="button"
            onClick={toggleMoreMenu}
            className="flex w-full items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors text-left"
            style={{
              backgroundColor:
                moreMenuOpen || moreMenuActive ? '#F7F9F7' : 'transparent',
              color: moreMenuOpen || moreMenuActive ? '#191919' : '#F7F9F7',
            }}
            onMouseEnter={(e) => {
              if (!moreMenuOpen && !moreMenuActive) {
                e.currentTarget.style.backgroundColor = '#2a2a2a';
              }
            }}
            onMouseLeave={(e) => {
              if (!moreMenuOpen && !moreMenuActive) {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            <span className="size-4 shrink-0" aria-hidden />
            <span className="leading-snug flex-1">More</span>
            <ChevronDown
              className={`size-4 shrink-0 transition-transform duration-200 ${
                moreMenuOpen ? 'rotate-180' : ''
              } ${!moreMenuOpen && chevronHint ? 'sidebar-more-chevron-hint' : ''}`}
            />
          </button>
        </div>
      </div>

      {moreMenuOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-default"
            aria-label="Close more resources menu"
            onClick={closeMoreMenu}
          />
          <div
            className="fixed z-50 w-56 rounded-xl border py-2 shadow-2xl animate-in fade-in slide-in-from-left-2 duration-200"
            style={{
              left: '15rem',
              top: flyoutTop,
              backgroundColor: '#191919',
              borderColor: '#2a2a2a',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.45)',
            }}
            role="menu"
          >
            <p
              className="px-4 py-2 text-[10px] tracking-wide uppercase"
              style={{ color: 'rgba(247, 249, 247, 0.5)' }}
            >
              More resources
            </p>
            <div className="space-y-0.5 px-1">
              {moreResourceItems.map((item) => renderResourceButton(item, true))}
            </div>
          </div>
        </>
      )}

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
