import { Phone, MessageSquare, ArrowRight, HelpCircle, Users, Award, TrendingUp, Lightbulb, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import type { User } from 'firebase/auth';

const actionCards = [
  {
    icon: Phone,
    title: 'Helpline',
    description: 'Provide phone support to voters with questions about voter ID requirements.',
    iconBg: '#1AC166',
  },
  {
    icon: MessageSquare,
    title: 'Chat',
    description: 'Answer voter questions in real-time through our chat platform.',
    iconBg: '#0D80FF',
  },
];

const stats = [
  { label: 'Voters Helped', value: '127', icon: Users, color: '#1AC166' },
  { label: 'Weekly Streak', value: '4', icon: TrendingUp, color: '#8B5CF6' },
  { label: 'Hours Volunteered', value: '23', icon: Award, color: '#F59E0B' },
];

const tips = [
  "Phone & Text Messages: Standard hours are 8am - 8pm. Return calls/texts during the voter's local time zone.",
  "Respond immediately if: Voter contacted within last 30 minutes, close to registration deadline, close to absentee/vote by mail deadline, or on Election Day.",
  "Email & Chat: Return as quickly as possible, any time of day or night - these are priority responses.",
  "Be Extra Human & Personal: Since voters can't see you, make an extra effort to be warm and personal. Tone and intention can easily be miscommunicated in text/voice.",
  "Always Include Your Name: Start with 'Hi! This is [Name] with VoteRiders.' This helps voters feel connected and aids team coordination.",
  "Maintain Nonpartisanship: We help all voters regardless of political views. If voters share political views, remind them we're a nonpartisan nonprofit here to assist all voters.",
  "Before Responding: If the voter clearly states their question, look up the information using helpline & chat core resources before responding.",
  "When You Don't Know: It's OK to say 'Let me confirm this information for you' - but don't make promises about timing.",
  "Near Election Day: We get many messages and may not be able to return all of them, especially if the issue is outside our core voter ID work.",
];

// Get random tip of the day (in a real app, this would be based on date or user preferences)
const getTipOfTheDay = () => tips[Math.floor(Math.random() * tips.length)];

interface MainContentProps {
  onNavigateToHelpline: () => void;
  onNavigateToChat: () => void;
}

export function MainContent({ onNavigateToHelpline, onNavigateToChat }: MainContentProps) {
  const [volunteerName, setVolunteerName] = useState<string>('');
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  useEffect(() => {
    const user: User | null = auth.currentUser;
    if (user) {
      const raw = user.displayName || user.email || 'Volunteer';
      // Take just the first word before a space or '@'
      const firstSegment = raw.split(' ')[0];
      const firstName = firstSegment.split('@')[0];
      setVolunteerName(firstName);
    } else {
      setVolunteerName('Volunteer');
    }
  }, []);

  // Auto-rotate tips every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % tips.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handlePrevTip = () => {
    setCurrentTipIndex((prev) => (prev - 1 + tips.length) % tips.length);
  };

  const handleNextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % tips.length);
  };

  return (
    <main className="flex-1 overflow-auto relative">
      <div className="max-w-5xl mx-auto px-8 py-12">
        {/* Welcome Section with Stats */}
        <div className="mb-12">
          <h1 className="mb-2">Welcome Back, {volunteerName}!</h1>
          
        </div>

        {/* Tip of the Day */}
        <div className="mb-8 border border-border bg-card rounded-xl p-6">
          <div className="flex gap-4 items-start mb-3">
            <div 
              className="rounded-lg p-3 flex-shrink-0"
              style={{ backgroundColor: '#F59E0B' + '15' }}
            >
              <Lightbulb className="size-5" style={{ color: '#F59E0B' }} />
            </div>
            <div className="flex-1">
              <h3 className="mb-1">Quick Tip</h3>
              <p className="text-muted-foreground">{tips[currentTipIndex]}</p>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <button 
                onClick={handlePrevTip}
                className="p-1 hover:bg-muted rounded transition-colors"
                aria-label="Previous tip"
              >
                <ChevronLeft className="size-5 text-muted-foreground" />
              </button>
              <button 
                onClick={handleNextTip}
                className="p-1 hover:bg-muted rounded transition-colors"
                aria-label="Next tip"
              >
                <ChevronRight className="size-5 text-muted-foreground" />
              </button>
            </div>
          </div>
          
          {/* Carousel Dots */}
          <div className="flex justify-center gap-1.5 mt-4">
            {tips.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTipIndex(index)}
                className="transition-all"
                aria-label={`Go to tip ${index + 1}`}
              >
                <div 
                  className={`rounded-full transition-all ${
                    index === currentTipIndex 
                      ? 'w-6 h-1.5' 
                      : 'w-1.5 h-1.5'
                  }`}
                  style={{ 
                    backgroundColor: index === currentTipIndex ? '#F59E0B' : '#D1D5DB'
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {actionCards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.title}
                className="group border border-border bg-card p-8 rounded-2xl hover:shadow-lg transition-all text-left"
                onClick={card.title === 'Helpline' ? onNavigateToHelpline : card.title === 'Chat' ? onNavigateToChat : undefined}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="rounded-2xl p-4"
                    style={{ backgroundColor: card.iconBg }}
                  >
                    <Icon className="size-6 text-white" />
                  </div>
                  <ArrowRight className="size-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="mb-2">{card.title}</h3>
                <p className="text-muted-foreground">{card.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Help Button */}
      <button className="fixed bottom-6 right-6 bg-primary text-primary-foreground rounded-full p-4 shadow-lg hover:shadow-xl transition-shadow">
        <HelpCircle className="size-6" />
      </button>
    </main>
  );
}
