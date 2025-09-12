import React, { useState } from "react";
import GlobalLayout from "./global";
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
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Support({ onLogout }) {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState(["resources"]);
  const [completedSections, setCompletedSections] = useState([]);

  const toggleSection = (id) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const markSectionComplete = (id) => {
    setCompletedSections((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const supportData = [
    {
      id: "resources",
      title: "Quick Resources & Support",
      icon: BookOpen,
      description: "Essential links and contact information for volunteers",
      content: (
        <div className="space-y-4">
          <div className="bg-blue-500/10 border border-blue-400/20 rounded-lg p-6">
            <h4 className="text-white font-medium mb-4 text-left">Essential Resources:</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Globe className="w-5 h-5 text-blue-300 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium text-left">Volunteer Intranet</p>
                  <p className="text-blue-200 text-sm mb-2">Access detailed guides, documents, and training materials</p>
                  <a
                    href="https://sites.google.com/voteriders.org/volunteerintranet/home"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-300 hover:text-white transition-colors text-sm text-left"
                  >
                    Visit Volunteer Intranet
                    <ExternalLink className="w-4 h-4 ml-2 inline" />
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-green-300 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium text-left">Technical Support</p>
                  <p className="text-green-200 text-sm mb-2">For website issues or technical problems</p>
                  <a
                    href="mailto:diya@voteriders.org"
                    className="block text-green-300 hover:text-white transition-colors text-sm text-left"
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
      id: "response-times",
      title: "Response Time Guidelines",
      icon: Clock,
      description: "When and how quickly to respond to different types of communication",
      content: (
        <div className="space-y-4">
          <div className="bg-orange-500/10 border border-orange-400/20 rounded-lg p-6">
            <div className="space-y-6">
              <div>
                <h4 className="text-white font-medium mb-3 flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-orange-300" />
                  Phone & Text Messages
                </h4>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Clock className="w-4 h-4 text-orange-300 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-white text-sm font-medium text-left">Standard Hours: 8am - 8pm</p>
                        <p className="text-orange-200 text-sm">Return calls/texts during the <strong>voter's local time zone</strong></p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-4 h-4 text-yellow-300 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-white text-sm font-medium text-left">Exceptions - Respond Immediately:</p>
                        <ul className="text-yellow-200 text-sm mt-1 space-y-1 text-left">
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
                <h4 className="text-white font-medium mb-3 flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2 text-blue-300" />
                  Email & Chat Messages
                </h4>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Zap className="w-4 h-4 text-blue-300 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white text-sm font-medium text-left">Priority Response</p>
                      <p className="text-blue-200 text-sm">Return as quickly as possible, any time of day or night</p>
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
      id: "communication-tone",
      title: "Communication Best Practices",
      icon: Heart,
      description: "How to communicate effectively and maintain a friendly, professional tone",
      content: (
        <div className="space-y-4">
          <div className="bg-pink-500/10 border border-pink-400/20 rounded-lg p-6">
            <div className="space-y-6">
              <div>
                <h4 className="text-white font-medium mb-3">Tone & Approach</h4>
                <div className="space-y-3">
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Heart className="w-5 h-5 text-pink-300 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-white font-medium text-sm text-left">Be Extra Human & Personal</p>
                        <p className="text-pink-200 text-sm text-left">Since voters can't see you, make an extra effort to be warm and personal. Tone and intention can easily be miscommunicated in text/voice.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Users className="w-5 h-5 text-blue-300 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-white font-medium text-sm text-left">Always Include Your Name</p>
                        <p className="text-blue-200 text-sm">Especially important for chat messages to help voters feel connected and for team coordination.</p>
                        <div className="mt-3 space-y-2">
                          <div className="bg-green-500/20 border border-green-400/30 rounded p-3">
                            <p className="text-green-200 text-sm font-medium text-left">Good Examples:</p>
                            <p className="text-green-100 text-sm mt-1 text-left">"Hi! This is Jane with VoteRiders. How can we help?"</p>
                            <p className="text-green-100 text-sm text-left">"Hi! This is Joe with VoteRiders. You can check your registration here..."</p>
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
      id: "nonpartisanship",
      title: "Maintaining Nonpartisanship",
      icon: Shield,
      description: "How to handle political discussions and maintain our nonpartisan mission",
      content: (
        <div className="space-y-4">
          <div className="bg-purple-500/10 border border-purple-400/20 rounded-lg p-6">
            <div className="space-y-4">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-purple-300 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium text-sm text-left">Always Maintain Nonpartisanship</p>
                    <p className="text-purple-200 text-sm">We are here to help all voters regardless of their political views.</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-lg p-4">
                <h5 className="text-white font-medium text-sm mb-2 text-left">When Voters Share Political Views:</h5>
                <div className="bg-white/10 rounded p-3">
                  <p className="text-yellow-100 text-sm italic text-left">"We are a nonpartisan nonprofit organization and here to help all voters. Let me focus on how we can assist you with your voting needs."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "research-escalation",
      title: "Research & Escalation Process",
      icon: Search,
      description: "When and how to research answers or escalate complex questions",
      content: (
        <div className="space-y-4">
          <div className="bg-green-500/10 border border-green-400/20 rounded-lg p-6">
            <div className="space-y-4">
              <div className="bg-white/10 rounded-lg p-4">
                <h5 className="text-white font-medium text-sm mb-3 text-left">Before Responding:</h5>
                <div className="flex items-start space-x-3">
                  <Search className="w-4 h-4 text-green-300 mt-1 flex-shrink-0" />
                  <p className="text-green-200 text-sm">If the voter clearly states their question, look up the information before responding.</p>
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-4">
                <h5 className="text-white font-medium text-sm mb-3 text-left">When You Don't Know:</h5>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Clock className="w-4 h-4 text-yellow-300 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white text-sm font-medium text-left">It's OK to say you need time</p>
                      <p className="text-yellow-200 text-sm">"Let me confirm this information for you" - but don't make promises about timing.</p>
                    </div>
                  </div>

                  <div className="bg-red-500/20 border border-red-400/30 rounded p-3">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="w-4 h-4 text-red-300 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-red-200 text-sm font-medium text-left">Important:</p>
                        <p className="text-red-100 text-sm text-left">We get many messages near Election Day and may not be able to return all of them, especially if the issue is outside our core voter ID work.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-4">
                <h5 className="text-white font-medium text-sm mb-3 text-left">Research Resources (in order):</h5>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">1</span>
                    </div>
                    <p className="text-green-200 text-sm">VoteRiders team members</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">2</span>
                    </div>
                    <p className="text-green-200 text-sm">County election office</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">3</span>
                    </div>
                    <p className="text-green-200 text-sm">State election office</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "phone-procedures",
      title: "Phone Call Procedures",
      icon: Phone,
      description: "How to handle phone calls and voicemail messages effectively",
      content: (
        <div className="space-y-4">
          <div className="bg-indigo-500/10 border border-indigo-400/20 rounded-lg p-6">
            <div className="space-y-4">
              <div className="bg-white/10 rounded-lg p-4">
                <h5 className="text-white font-medium text-sm mb-3 flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-indigo-300" />
                  Most Calls Go to Voicemail
                </h5>
                <p className="text-indigo-200 text-sm mb-3 text-left">The majority of return calls will reach voicemail. Here's how to handle them:</p>

                <div className="space-y-3">
                  <div className="bg-green-500/20 border border-green-400/30 rounded p-3">
                    <p className="text-green-200 text-sm font-medium mb-1 text-left">Voicemail Template:</p>
                    <p className="text-green-100 text-sm italic text-left">"Hi, this is [Your Name] returning your call to VoteRiders at [your Google/personal phone number]. [Include answer if you have it based on their message]."</p>
                  </div>

                  <div className="bg-yellow-500/20 border border-yellow-400/30 rounded p-3">
                    <p className="text-yellow-200 text-sm font-medium mb-1 text-left">No Voicemail Setup?</p>
                    <p className="text-yellow-100 text-sm text-left">Try calling back later and/or send a text message instead.</p>
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
    <GlobalLayout onLogout={onLogout}>
      <div className="max-w-3xl md:max-w-4xl mx-auto mt-6 md:mt-10">
        {/* Header */}
        <div className="text-center space-y-6 mb-8">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <Headphones className="w-8 h-8 text-blue-300" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">VOLUNTEER SUPPORT</h1>
          </div>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Essential guidelines, resources, and best practices for effective volunteer communication and support.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-white font-medium text-sm text-left">Quick Actions</h3>
              <p className="text-blue-200 text-sm">Access all sections or find what you need</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setExpandedSections(supportData.map((s) => s.id))}
                className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm"
              >
                Expand All
              </button>
              <button
                onClick={() => setExpandedSections([])}
                className="px-4 py-2 rounded-md border border-white/30 text-white hover:bg-white/10 text-sm"
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
            const isCompleted = completedSections.includes(section.id);

            return (
              <div key={section.id} className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden">
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-6 text-left hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isCompleted ? 'bg-green-600' : 'bg-blue-600'}`}>
                        {isCompleted ? (
                          <CheckCircle className="w-6 h-6 text-white" />
                        ) : (
                          <Icon className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white">{section.title}</h3>
                        <p className="text-blue-200 mt-1">{section.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {isCompleted && (
                        <span className="px-2 py-1 rounded-md bg-green-500/20 text-green-200 border border-green-400/30 text-xs">Reviewed</span>
                      )}
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-blue-300" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-blue-300" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Section Content */}
                {isExpanded && (
                  <div className="px-6 pb-6 border-t border-white/10">
                    <div className="mt-6 space-y-4">
                      {/* Content */}
                      {section.content}

                      {/* Mark Complete Button */}
                      <div className="flex justify-end">
                        <button
                          onClick={() => markSectionComplete(section.id)}
                          disabled={isCompleted}
                          className={`${isCompleted ? 'bg-green-600 text-white cursor-default' : 'bg-blue-600 hover:bg-blue-700 text-white'} px-4 py-2 rounded-md text-sm inline-flex items-center`}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          {isCompleted ? 'Reviewed' : 'Mark as Reviewed'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Summary */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-lg rounded-2xl border border-white/20 p-6 mb-8">
          <div className="text-center space-y-4">
            <h3 className="text-white font-medium">Remember the Key Principles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-pink-300" />
                <span className="text-blue-200">Be friendly & human</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-purple-300" />
                <span className="text-blue-200">Stay nonpartisan</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-orange-300" />
                <span className="text-blue-200">Respond appropriately</span>
              </div>
            </div>
            <p className="text-blue-200 text-sm">Reviewed {completedSections.length} of {supportData.length} sections</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/home")}
            className="px-4 py-2 rounded-md border border-white/30 text-white hover:bg-white/10 backdrop-blur-sm hover:border-white/50 transition-all duration-300 inline-flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </button>
        </div>
      </div>
    </GlobalLayout>
  );
}
