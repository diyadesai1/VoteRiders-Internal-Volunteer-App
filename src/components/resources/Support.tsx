import { useState } from 'react';
import { 
  Headphones,
  ExternalLink,
  Globe,
  Mail,
  Phone,
  MessageCircle,
  Clock,
  AlertCircle,
  BookOpen,
  Heart,
  Users,
  Shield,
  Search,
  Zap,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  ArrowLeft
} from 'lucide-react';

interface SupportProps {
  onBack: () => void;
}

export function Support({ onBack }: SupportProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['resources']);

  const toggleSection = (id: string) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const supportData = [
    {
      id: 'resources',
      title: 'Quick Resources & Support',
      icon: BookOpen,
      color: '#4A90E2',
      description: 'Essential links and contact information for volunteers',
      content: (
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-6" style={{ backgroundColor: '#4A90E2' + '10', borderColor: '#4A90E2' + '30' }}>
            <h4 className="font-medium mb-4 text-left">Essential Resources:</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Globe className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#4A90E2' }} />
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-left">VoteRiders Website</p>
                    <p className="text-sm text-muted-foreground mr-32 mb-2">Determine the ID requirements by state</p> 
                     <a
                      href="https://www.voteriders.org/staterules/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:underline transition-colors text-sm text-left"
                      style={{ color: '#4A90E2' }}
                    >
                      Visit VoteRiders Website
                      <ExternalLink className="w-4 h-4 ml-2 inline" />
                    </a>
                  </div>
                  <div>
                    <p className="font-medium text-left">Volunteer Intranet</p>
                    <p className="text-sm text-muted-foreground mb-2">Guides, documents, training materials, and <a href="https://sites.google.com/voteriders.org/volunteerintranet/vid-assist-team-leads?authuser=3" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: '#4A90E2' }}>team contact information</a>. </p>
                    <a
                      href="https://sites.google.com/voteriders.org/volunteerintranet/home"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:underline transition-colors text-sm text-left"
                      style={{ color: '#4A90E2' }}
                    >
                      Visit Volunteer Intranet
                      <ExternalLink className="w-4 h-4 ml-2 inline" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#1AC166' }} />
                <div>
                  <p className="font-medium text-left">Technical Support</p>
                  <p className="text-sm text-muted-foreground mb-2">For website issues or technical problems</p>
                  <a
                    href="mailto:diya@voteriders.org"
                    className="block hover:underline transition-colors text-sm text-left"
                    style={{ color: '#1AC166' }}
                  >
                    diya@voteriders.org
                    <Mail className="w-4 h-4 ml-2 inline" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'response-times',
      title: 'Response Time Guidelines',
      icon: Clock,
      color: '#F59E0B',
      description: 'When and how quickly to respond to different types of communication',
      content: (
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-6" style={{ backgroundColor: '#F59E0B' + '10', borderColor: '#F59E0B' + '30' }}>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3 flex items-center">
                  <Phone className="w-5 h-5 mr-2" style={{ color: '#F59E0B' }} />
                  Phone & Text Messages
                </h4>
                <div className="bg-muted rounded-lg p-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Clock className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: '#F59E0B' }} />
                      <div>
                        <p className="text-sm font-medium text-left">Standard Hours: 8am - 8pm</p>
                        <p className="text-sm text-muted-foreground">Return calls/texts during the <strong>voter's local time zone</strong></p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: '#F59E0B' }} />
                      <div>
                        <p className="text-sm font-medium text-left">Exceptions - Respond Immediately:</p>
                        <ul className="text-sm text-muted-foreground mt-1 space-y-1 text-left">
                          <li>• Voter contacted within the last 30 minutes</li>
                          <li>• Close to registration deadline</li>
                          <li>• Close to absentee/vote by mail deadline</li>
                          <li>• Election Day</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3 flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" style={{ color: '#4A90E2' }} />
                  Email & Chat Messages
                </h4>
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Zap className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: '#4A90E2' }} />
                    <div>
                      <p className="text-sm font-medium text-left">Priority Response</p>
                      <p className="text-sm text-muted-foreground">Return as quickly as possible, any time of day or night</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'communication-tone',
      title: 'Communication Best Practices',
      icon: Heart,
      color: '#1AC166',
      description: 'How to communicate effectively and maintain a friendly, professional tone',
      content: (
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-6" style={{ backgroundColor: '#EC4899' + '10', borderColor: '#EC4899' + '30' }}>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Tone & Approach</h4>
                <div className="space-y-3">
                  <div className="bg-muted rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Heart className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#EC4899' }} />
                      <div>
                        <p className="font-medium text-sm text-left">Be Extra Human & Personal</p>
                        <p className="text-sm text-muted-foreground text-left">Since voters can't see you, make an extra effort to be warm and personal. Tone and intention can easily be miscommunicated in text/voice.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Users className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#4A90E2' }} />
                      <div>
                        <p className="font-medium text-sm text-left">Always Include Your Name</p>
                        <p className="text-sm text-muted-foreground">Especially important for chat messages to help voters feel connected and for team coordination.</p>
                        <div className="mt-3 space-y-2">
                          <div className="border rounded p-3" style={{ backgroundColor: '#1AC166' + '20', borderColor: '#1AC166' + '30' }}>
                            <p className="text-sm font-medium text-left">Good Examples:</p>
                            <p className="text-sm mt-1 text-left">"Hi! This is Jane with VoteRiders. How can we help?"</p>
                            <p className="text-sm text-left">"Hi! This is Joe with VoteRiders. You can check your registration here..."</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'nonpartisanship',
      title: 'Maintaining Nonpartisanship',
      icon: Shield,
      color: '#8B5CF6',
      description: 'How to handle political discussions and maintain our nonpartisan mission',
      content: (
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-6" style={{ backgroundColor: '#8B5CF6' + '10', borderColor: '#8B5CF6' + '30' }}>
            <div className="space-y-4">
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#8B5CF6' }} />
                  <div>
                    <p className="font-medium text-sm text-left">Always Maintain Nonpartisanship</p>
                    <p className="text-sm text-muted-foreground">We are here to help all voters regardless of their political views.</p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4" style={{ backgroundColor: '#F59E0B' + '20', borderColor: '#F59E0B' + '30' }}>
                <h5 className="font-medium text-sm mb-2 text-left">When Voters Share Political Views:</h5>
                <div className="bg-muted rounded p-3">
                  <p className="text-sm italic text-left">"We are a nonpartisan nonprofit organization and here to help all voters. Let me focus on how we can assist you with your voting needs."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'research-escalation',
      title: 'Research & Escalation Process',
      icon: Search,
      color: '#1AC166',
      description: 'When and how to research answers or escalate complex questions',
      content: (
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-6" style={{ backgroundColor: '#1AC166' + '10', borderColor: '#1AC166' + '30' }}>
            <div className="space-y-4">
              <div className="bg-muted rounded-lg p-4">
                <h5 className="font-medium text-sm mb-3 text-left">Before Responding:</h5>
                <div className="flex items-start space-x-3">
                  <Search className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: '#1AC166' }} />
                  <p className="text-sm text-muted-foreground text-left">If the voter clearly states their question, look up the information using helpline & chat core resources before responding.</p>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-4">
                <h5 className="font-medium text-sm mb-3 text-left">When You Don't Know:</h5>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Clock className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: '#F59E0B' }} />
                    <div>
                      <p className="text-sm font-medium text-left">It's OK to say you need time</p>
                      <p className="text-sm text-muted-foreground">"Let me confirm this information for you" - but don't make promises about timing.</p>
                    </div>
                  </div>

                  <div className="border rounded p-3" style={{ backgroundColor: '#EF4444' + '20', borderColor: '#EF4444' + '30' }}>
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#EF4444' }} />
                      <div>
                        <p className="text-sm font-medium text-left">Important:</p>
                        <p className="text-sm text-muted-foreground text-left">We get many messages near Election Day and may not be able to return all of them, especially if the issue is outside our core voter ID work.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-4">
                <h5 className="font-medium text-sm mb-3 text-left">Research Resources (in order):</h5>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#4A90E2' }}>
                      <span className="text-white text-xs font-bold">1</span>
                    </div>
                    <a href="https://www.voteriders.org/staterules/" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline" style={{ color: '#1AC166' }}>VoteRiders State Rules Page</a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#4A90E2' }}>
                      <span className="text-white text-xs font-bold">2</span>
                    </div>
                    <a href="https://docs.google.com/document/d/1wKgPdH1n680K9bv9X9ZD4X48Ln7VnOxC-gFLeucqFb4/edit?tab=t.0" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline" style={{ color: '#1AC166' }}>Helpline &amp; Chat FAQs</a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#4A90E2' }}>
                      <span className="text-white text-xs font-bold">3</span>
                    </div>
                    <a href="https://voteriders.turbovote.org/" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline" style={{ color: '#1AC166' }}>VoteRiders Turbo Vote</a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#4A90E2' }}>
                      <span className="text-white text-xs font-bold">4</span>
                    </div>
                    <a href="https://voteriders.slack.com/archives/C01BGKCJ399" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline" style={{ color: '#1AC166' }}>Team Slack Support</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'phone-procedures',
      title: 'Phone Call Procedures',
      icon: Phone,
      color: '#6366F1',
      description: 'How to handle phone calls and voicemail messages effectively',
      content: (
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-6" style={{ backgroundColor: '#6366F1' + '10', borderColor: '#6366F1' + '30' }}>
            <div className="space-y-4">
              <div className="bg-muted rounded-lg p-4">
                <h5 className="font-medium text-sm mb-3 flex items-center">
                  <Phone className="w-4 h-4 mr-2" style={{ color: '#6366F1' }} />
                  Most Calls Go to Voicemail
                </h5>
                <p className="text-sm text-muted-foreground mb-3 text-left">The majority of return calls will reach voicemail. Here's how to handle them:</p>

                <div className="space-y-3">
                  <div className="border rounded p-3" style={{ backgroundColor: '#1AC166' + '20', borderColor: '#1AC166' + '30' }}>
                    <p className="text-sm font-medium mb-1 text-left">Voicemail Template:</p>
                    <p className="text-sm italic text-left">"Hi, this is [Your Name] returning your call to VoteRiders at [your Google/personal phone number]. [Include answer if you have it based on their message]."</p>
                  </div>

                  <div className="border rounded p-3" style={{ backgroundColor: '#F59E0B' + '20', borderColor: '#F59E0B' + '30' }}>
                    <p className="text-sm font-medium mb-1 text-left">No Voicemail Setup?</p>
                    <p className="text-sm text-muted-foreground text-left">Try calling back later and/or send a text message instead.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <main className="flex-1 overflow-auto">
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 group"
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Dashboard</span>
        </button>

        {/* Header */}
        <div className="text-center space-y-6 mb-8">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <Headphones className="w-8 h-8" style={{ color: '#4A90E2' }} />
            <h1 className="mb-0">Volunteer Support</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Essential guidelines, resources, and best practices for effective volunteer communication and support.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="font-medium text-sm text-left">Quick Actions</h3>
              <p className="text-muted-foreground text-sm">Access all sections or find what you need</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setExpandedSections(supportData.map((s) => s.id))}
                className="px-4 py-2 rounded-lg text-white text-sm transition-all hover:shadow-lg"
                style={{ backgroundColor: '#4A90E2' }}
              >
                Expand All
              </button>
              <button
                onClick={() => setExpandedSections([])}
                className="px-4 py-2 rounded-lg border border-border hover:bg-muted text-sm transition-colors"
              >
                Collapse All
              </button>
            </div>
          </div>
        </div>

        {/* Accordion Sections */}
        <div className="space-y-4 mb-8">
          {supportData.map((section) => {
            const Icon = section.icon;
            const isExpanded = expandedSections.includes(section.id);
            const sectionColor = section.color || '#4A90E2';

            return (
              <div key={section.id} className="bg-card border border-border rounded-xl overflow-hidden">
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-6 text-left hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center" 
                        style={{ backgroundColor: sectionColor }}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{section.title}</h3>
                        <p className="text-muted-foreground text-sm mt-1">{section.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5" style={{ color: sectionColor }} />
                      ) : (
                        <ChevronDown className="w-5 h-5" style={{ color: sectionColor }} />
                      )}
                    </div>
                  </div>
                </button>

                {/* Section Content */}
                {isExpanded && (
                  <div className="px-6 pb-6 border-t border-border">
                    <div className="mt-6 space-y-4">
                      {/* Content */}
                      {section.content}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Summary */}
        <div className="bg-card border border-border rounded-xl p-6 mb-8" style={{ background: 'linear-gradient(to right, #4A90E2' + '20, #8B5CF6' + '20)' }}>
          <div className="text-center space-y-4">
            <h3 className="font-medium">Remember the Key Principles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center justify-center space-x-2">
                <Heart className="w-4 h-4" style={{ color: '#EC4899' }} />
                <span className="text-muted-foreground">Be friendly & human</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Shield className="w-4 h-4" style={{ color: '#8B5CF6' }} />
                <span className="text-muted-foreground">Stay nonpartisan</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Clock className="w-4 h-4" style={{ color: '#F59E0B' }} />
                <span className="text-muted-foreground">Respond appropriately</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}