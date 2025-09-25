import React from "react";
import { Bell, User, ChevronDown, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { signOut } from 'firebase/auth';
import { auth } from './firebase';

export default function GlobalLayout({ children, onLogout }) {
  async function handleSignOut() {
    if (onLogout) {
      return onLogout();
    }
    try {
      await signOut(auth);
    } catch (e) {
      console.error('Sign out failed', e);
    }
  }
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <a
              href="https://www.voteriders.org/staterules/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3"
              aria-label="Go to Voteriders State Rules"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-red-500 to-blue-500 text-white font-extrabold text-lg">
                V
              </div>
              <div className="font-bold text-white text-xl tracking-tight">VOTERIDERS</div>
            </a>

            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-8 ml-auto">
              <Link 
                to="/home"
                className="text-white font-bold no-underline hover:bg-blue-500/50 hover:rounded-md px-3 py-1 transition-colors"
              >
                HOME
              </Link>
              <Link 
                to="/helpline"
                className="text-white font-bold no-underline hover:bg-blue-500/50 hover:rounded-md px-3 py-1 transition-colors"
              >
                HELPLINE
              </Link>
              <Link 
                to="/chat"
                className="text-white font-bold no-underline hover:bg-blue-500/50 hover:rounded-md px-3 py-1 transition-colors"
              >
                CHAT
              </Link>
              <Link 
                to="/support"
                className="text-white font-bold no-underline hover:bg-blue-500/50 hover:rounded-md px-3 py-1 transition-colors"
              >
                SUPPORT
              </Link>
            </nav>

            {/* Right side - Notifications and Profile */}
            <div className="flex items-center space-x-2 ml-auto">
              {/* Notifications */}
              <button className="relative p-2 text-white hover:text-blue-300 transition-colors">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile Dropdown */}
              <div className="relative group">
                <button className="flex items-center space-x-2 text-white hover:text-blue-300 transition-colors">
                  {auth.currentUser?.photoURL ? (
                    <img
                      src={auth.currentUser.photoURL}
                      alt={auth.currentUser.displayName || 'Profile'}
                      className="w-8 h-8 rounded-full object-cover border border-white/20"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                  <span className="hidden sm:block">{auth.currentUser?.displayName?.split(' ')[0] || 'Volunteer'}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-md rounded-lg shadow-lg border border-white/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-1">
                    <button 
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile menu button */}
              <button className="md:hidden p-2 text-white hover:text-blue-300 transition-colors">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center text-white text-sm">
            <p className="mb-2 sm:mb-0">
              Copyright © 2025. VoteRiders is a 501(c)(3) nonpartisan nonprofit organization registered in the US under EIN 45-5081831.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.voteriders.org/privacy-policy/" className="hover:text-blue-300 transition-colors" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
              <span>|</span>
              <a href="https://www.voteriders.org/terms-of-use/" className="hover:text-blue-300 transition-colors" target="_blank" rel="noopener noreferrer">Terms of Use</a>
              <span>|</span>
              <a href="https://www.voteriders.org/contact-us/" className="hover:text-blue-300 transition-colors" target="_blank" rel="noopener noreferrer">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
