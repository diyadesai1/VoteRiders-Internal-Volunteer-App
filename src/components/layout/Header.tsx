import { ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import type { Page } from '../../App';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

interface HeaderProps {
  currentPage: Page;
}

export function Header({ currentPage }: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setIsDropdownOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

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
      case 'important-links':
        return 'Important Links';
      default:
        return 'Dashboard';
    }
  };

  const user = auth.currentUser;
  const display = user?.displayName || user?.email || 'Volunteer User';
  const [first, last = ''] = display.split(' ');
  const fullName = `${first}${last ? ' ' + last : ''}`;

  const initials = (() => {
    if (user?.displayName) {
      const parts = user.displayName.trim().split(' ');
      return parts.slice(0, 2).map(p => p[0]?.toUpperCase()).join('') || 'VU';
    }
    if (user?.email) {
      const local = user.email.split('@')[0] || '';
      if (!local) return 'VU';
      return local[0].toUpperCase();
    }
    return 'VU';
  })();

  const photoURL = user?.photoURL;

  return (
    <header className="border-b border-border bg-background px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1>{getPageTitle()}</h1>
        </div>
        <div className="flex items-center gap-3 relative" ref={dropdownRef}>
          <div className="text-right">
            <p>{fullName}</p>
            <p className="text-muted-foreground text-sm">Volunteer</p>
          </div>
          {photoURL ? (
            <div className="w-10 h-10 rounded-full overflow-hidden border border-border flex items-center justify-center">
              <img
                src={photoURL}
                alt={fullName || 'Volunteer profile'}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : (
            <div className="w-10 h-10 bg-[#0D80FF] text-white rounded-full flex items-center justify-center">
              <span>{initials}</span>
            </div>
          )}
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            aria-label="User menu"
          >
            <ChevronDown className="size-4 text-muted-foreground" />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-1 bg-white border border-border rounded-md shadow-lg py-1 min-w-[120px] z-50">
              <button
                onClick={handleSignOut}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
