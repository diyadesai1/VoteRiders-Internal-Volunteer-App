import { ArrowLeft, CreditCard, MapPin, AlertTriangle, CheckCircle, Users, RotateCcw, Clipboard, ChevronRight, Copy, Check } from 'lucide-react';
import { useMemo, useState, useEffect } from 'react';

interface Step2IDAssistanceProps {
  onBack: () => void;
  onContinue: () => void;
}

export function Step2IDAssistance({ onBack, onContinue }: Step2IDAssistanceProps) {
  const [selectedState, setSelectedState] = useState("");
  const [currentNode, setCurrentNode] = useState("");
  const [history, setHistory] = useState<Array<{ id: string; question: string; answer: string }>>([]);
  const [isStarted, setIsStarted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scriptCopied, setScriptCopied] = useState(false);
  const [scriptType, setScriptType] = useState<'email' | 'text'>('email');
  const [initialScriptCopied, setInitialScriptCopied] = useState(false);

  const initialScript = "Hi [VOTER NAME (if available)]!  I'm [YOUR NAME], a volunteer with VoteRiders.  Thanks so much for reaching out to VoteRiders for help with getting your ID.  Before I'm able to get you to the right team members for assistance, I just need to collect a bit of information from you.  Could you please share your first and last name & your zip code please?";

  const emailScript = "[Introduce self if this is first reply].  Thanks so much for reaching out. Because [STATE] doesn't require voters to show ID at the polls, you're outside of our current scope of work. VoteRiders focuses on helping people obtain the ID they need to vote in states that require it.\nIf I've misunderstood your location or the reason you contacted us, please feel free to write back and let me know — I'd be happy to take another look and help however I can.\nLet me know if you'd like me to see if we have a referral organization in your area that may be able to help.";

  const textScript = "The mission of VoteRiders is to help people get the ID they need in order to vote.  Because [STATE]  does not require voters to show ID at the polls, you are geographically outside our scope of work.\nIf I'm wrong about where you live or the reason that you've contacted us, please write back and let me know.";

  const focusStateContacts = useMemo(() => ({
    Arizona: { code: "K1", person: "Valerie El Ghouti" },
    Florida: { code: "K2", person: "Kristen Rodriguez" },
    Georgia: { code: "K3", person: "Monica Spencer and Laura Kaufmann" },
    "North Carolina": { code: "K4", person: "Kobie Wright" },
    Ohio: { code: "K5", person: "Shelly Jarrett Bromberg" },
    Pennsylvania: { code: "K6", person: "Krystle Knight" },
    Texas: { code: "K7", person: "Zuanny Ibarguen and Cecile Blumm" },
    Wisconsin: { code: "K8", person: "Devonte Yates" },
  }), []);

  const noVoterIDStates = useMemo(() => [
    "California", "Oregon", "Nevada", "New Mexico", "Minnesota",
    "Illinois", "Maryland", "New York", "Vermont", "New Jersey",
    "Massachusetts", "Maine",
  ], []);

  const allStates = useMemo(() => [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
    "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
    "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
    "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
    "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina",
    "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island",
    "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
    "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
  ], []);

  const steps = useMemo(() => {
    const s: Record<string, any> = {
      B: {
        question: "Voter is 16+ years old and a US citizen?",
        script: [
          {
            guide: "This question should determine US citizenship and age",
            text: "I am going to ask you some questions to see how VoteRiders can best assist you. First, what state were you born in, and what is your date of birth?"
          },
          {
            guide: "If the voter says they were born outside of a US state or territory",
            text: "Do you have your naturalization certificate or other proof of US citizenship?"
          }
        ],
        answers: [
          { text: "Yes", next: "C" },
          { text: "No", next: "G" },
        ],
      },
      NV1: {
        question:
          "Has the voter registration deadline for an upcoming election already passed and the voter is not currently registered to vote in <a href='https://voteriders.turbovote.org/how-to-vote/nv' target='_blank' class='text-[#4A90E2] hover:text-[#1AC166] underline'>NV</a>?",
        answers: [
          { text: "No", next: "I" },
          { text: "Yes", next: "B" },
        ],
      },
      C: {
        question:
          "Voter lacks an up-to-date, unexpired state-issued ID or driver's license in their state?",
        script: [
          {
            guide: "",
            text: "Do you have a current state ID or Driver's License?"
          }
        ],
        answers: [
          { text: "Yes", next: "D" },
          { text: "No", next: () => (selectedState === "Nevada" ? "I" : "H") },
        ],
      },
      D: {
        question:
          "Needs ID for an impending deadline (e.g., <a href='http://VoteRiders.org/Vote' target='_blank' class='text-[#4A90E2] hover:text-[#1AC166] underline'>to vote</a>, job offer pending their ability to show ID by a certain date OR must complete a housing application by a given date)?",
        script: [
          {
            guide: "",
            text: "Is there a specific reason you need your ID or underlying documents?"
          }
        ],
        answers: [
          {
            text: "Yes",
            next: () => {
              const f = focusStateContacts[selectedState as keyof typeof focusStateContacts];
              return f ? f.code : "L";
            },
          },
          { text: "No", next: "F" },
        ],
      },
      F: {
        question:
          "Solved: Refer to VIDA as regular priority (do not tag in Slack). Go over the <a href='https://drive.google.com/file/d/1v9CCQor2FMF6XFPu_sgFjx3o99ttNT1H/view' target='_blank' class='text-[#4A90E2] hover:text-[#1AC166] underline'>Voter Agreement</a> with the voter prior to sending the ticket to ID Assist and check the corresponding box in Zendesk.",
        isSolution: true,
        type: "regular",
      },
      G: {
        question: "Is minor child who needs birth certificate for housing?",
        script: [
          {
            guide: "If the person is under 16 years old",
            text: "Is there a particular reason this person needs a birth certificate?"
          },
          {
            guide: "If not for housing purposes. Please use community resources to refer them to another organization",
            text: "I am sorry. VoteRiders is a voting rights organization that helps eligible voters get IDs and underlying documents so that they can cast their ballot. We are unable to assist in this circumstance."
          }
        ],
        answers: [
          { text: "Yes", next: "J" },
          { text: "No", next: "I" },
        ],
      },
      H: {
        question: () => {
          if (selectedState === "Arizona") {
            return "Needs just birth certificate for voter registration, housing, or employment?";
          } else if (selectedState === "New Hampshire") {
            return "Needs just birth certificate for voter registration, housing, or employment?";
          } else {
            return "Needs just birth certificate for housing or employment?";
          }
        },
        script: [
          {
            guide: "If the voter has a current ID/DL",
            text: "Do you need this documentation for a particular reason?"
          },
          {
            guide: "If BC is needed for something other than housing/employment. Use Community Resources to refer them to another organization.",
            text: "I am sorry. VoteRiders is a voting rights organization that helps eligible voters get IDs and underlying documents so that they can cast their ballot. Since you have an ID you can use to cast your ballot, we are unable to assist in this circumstance."
          }
        ],
        answers: [
          { text: "Yes", next: "BC1" },
          { text: "No", next: "I" },
        ],
      },
      BC1: {
        question: () => {
          if (selectedState === "Arizona") {
            return "Needs BC for an impending deadline (<a href='https://www.voteriders.org/register/arizona/' target='_blank' class='text-[#4A90E2] hover:text-[#1AC166] underline'>to register to vote in a state/local election</a>, job offer pending their ability to show ID by a certain date, OR must complete a housing application by a given date)?";
          } else if (selectedState === "New Hampshire") {
            return "Needs BC for an impending deadline (<a href='https://www.voteriders.org/register/new-hampshire/' target='_blank' class='text-[#4A90E2] hover:text-[#1AC166] underline'>to register to vote in a state/local election</a>, job offer pending their ability to show ID by a certain date, OR must complete a housing application by a given date)?";
          } else {
            return "Needs BC for an impending deadline (job offer pending their ability to show ID by a certain date OR must complete a housing application by a given date)?";
          }
        },
        answers: [
          { text: "Yes", next: "BC_URGENT" },
          { text: "No", next: "BC_REGULAR" },
        ],
      },
      BC_URGENT: {
        question:
          "Solved: Mark as urgent. Use <a href='https://sites.google.com/voteriders.org/volunteerintranet/vid-assist-team-leads?authuser=3' target='_blank' class='text-[#4A90E2] hover:text-[#1AC166] underline'>this document</a> to determine who you should tag in Slack. Go over the <a href='https://drive.google.com/file/d/1v9CCQor2FMF6XFPu_sgFjx3o99ttNT1H/view' target='_blank' class='text-[#4A90E2] hover:text-[#1AC166] underline'>Voter Agreement</a> with the voter prior to sending the ticket to ID Assist and check the corresponding box in Zendesk.",
        isSolution: true,
        type: "urgent",
      },
      BC_REGULAR: {
        question:
          "Solved: Refer to VIDA as regular priority (do not tag in Slack). Go over the <a href='https://drive.google.com/file/d/1v9CCQor2FMF6XFPu_sgFjx3o99ttNT1H/view' target='_blank' class='text-[#4A90E2] hover:text-[#1AC166] underline'>Voter Agreement</a> with the voter prior to sending the ticket to ID Assist and check the corresponding box in Zendesk.",
        isSolution: true,
        type: "regular",
      },
      I: {
        question:
          "VR is unable to provide assistance. Reference community resource guide for alternative organizations.",
        isSolution: true,
        type: "no-assistance",
      },
      J: {
        question:
          "Solved: VR can help, mark as urgent. Use <a href='https://sites.google.com/voteriders.org/volunteerintranet/helpline-and-chat' target='_blank' class='text-[#4A90E2] hover:text-[#1AC166] underline'>this document</a> to determine who you should tag in Slack.",
        isSolution: true,
        type: "urgent",
      },
      NVJ: {
        question:
          "Solved: Mark as urgent. Use <a href='https://sites.google.com/voteriders.org/volunteerintranet/helpline-and-chat' target='_blank' class='text-[#4A90E2] hover:text-[#1AC166] underline'>this document</a> to determine who you should tag in Slack.",
        isSolution: true,
        type: "urgent",
      },
      L: {
        question:
          "Solved: Mark as urgent. Use <a href='https://sites.google.com/voteriders.org/volunteerintranet/helpline-and-chat' target='_blank' class='text-[#4A90E2] hover:text-[#1AC166] underline'>this document</a> to determine who you should tag in Slack. Go over the <a href='https://drive.google.com/file/d/1v9CCQor2FMF6XFPu_sgFjx3o99ttNT1H/view' target='_blank' class='text-[#4A90E2] hover:text-[#1AC166] underline'>Voter Agreement</a> with the voter prior to sending the ticket to ID Assist and check the corresponding box in Zendesk.",
        isSolution: true,
        type: "urgent",
      },
    };

    // Add focus state codes (K1..K8)
    Object.values(focusStateContacts).forEach(({ code }) => {
      s[code] = {
        question:
          "Solved: Mark as urgent. Use <a href='https://sites.google.com/voteriders.org/volunteerintranet/helpline-and-chat' target='_blank' class='text-[#4A90E2] hover:text-[#1AC166] underline'>this document</a> to determine who you should tag in Slack. Go over the <a href='https://drive.google.com/file/d/1v9CCQor2FMF6XFPu_sgFjx3o99ttNT1H/view' target='_blank' class='text-[#4A90E2] hover:text-[#1AC166] underline'>Voter Agreement</a> with the voter prior to sending the ticket to ID Assist and check the corresponding box in Zendesk.",
        isSolution: true,
        type: "urgent",
      };
    });

    return s;
  }, [focusStateContacts, selectedState]);

  const isSolutionCurrent = useMemo(() => {
    const node = steps[currentNode];
    return !!(node && node.isSolution);
  }, [steps, currentNode]);

  const buildDecisionHistoryText = () => {
    const lines: string[] = [];
    history.slice(1).forEach((h, idx) => {
      const q = h.question.replace(/<[^>]+>/g, '').trim();
      lines.push(`${idx + 1}. ${q}`);
      lines.push(`Answer: ${h.answer}`);
    });
    return lines.join('\n');
  };

  const copyDecisionHistory = async () => {
    const text = buildDecisionHistoryText();
    
    // Try modern clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
        return;
      } catch (e) {
        console.warn('Clipboard API failed, trying fallback', e);
      }
    }
    
    // Fallback: use textarea method
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error('Copy failed', e);
      alert('Copy to clipboard failed. Please manually select and copy the decision history.');
    }
  };

  const copyScript = async () => {
    const script = scriptType === 'email' ? emailScript : textScript;
    const finalScript = script.replace(/\[STATE\]/g, selectedState);
    // Try modern clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(finalScript);
        setScriptCopied(true);
        setTimeout(() => setScriptCopied(false), 2500);
        return;
      } catch (e) {
        console.warn('Clipboard API failed, trying fallback', e);
      }
    }
    
    // Fallback: use textarea method
    try {
      const textarea = document.createElement('textarea');
      textarea.value = finalScript;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setScriptCopied(true);
      setTimeout(() => setScriptCopied(false), 2500);
    } catch (e) {
      console.error('Copy failed', e);
      alert('Copy to clipboard failed. Please manually select and copy the script.');
    }
  };

  const copyInitialScript = async () => {
    const finalScript = initialScript;
    // Try modern clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(finalScript);
        setInitialScriptCopied(true);
        setTimeout(() => setInitialScriptCopied(false), 2500);
        return;
      } catch (e) {
        console.warn('Clipboard API failed, trying fallback', e);
      }
    }
    
    // Fallback: use textarea method
    try {
      const textarea = document.createElement('textarea');
      textarea.value = finalScript;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setInitialScriptCopied(true);
      setTimeout(() => setInitialScriptCopied(false), 2500);
    } catch (e) {
      console.error('Copy failed', e);
      alert('Copy to clipboard failed. Please manually select and copy the script.');
    }
  };

  const begin = () => {
    if (!selectedState) {
      alert("Please select a state first.");
      return;
    }
    setIsStarted(true);
    setHistory([{ id: "STATE_SELECT", question: "State selection", answer: selectedState }]);
    const firstNode = noVoterIDStates.includes(selectedState) && selectedState !== "Nevada" ? "I" : selectedState === "Nevada" ? "NV1" : "B";
    setCurrentNode(firstNode);
  };

  const handleAnswer = (answerText: string, nextNode: any) => {
    const node = steps[currentNode];
    if (!node) return;

    setIsTransitioning(true);
    
    setTimeout(() => {
      const newEntry = {
        id: currentNode,
        question: typeof node.question === "function" ? node.question() : node.question,
        answer: answerText,
      };
      setHistory((prev) => [...prev, newEntry]);

      if (selectedState === "Nevada" && currentNode === "C" && answerText === "Yes") {
        setCurrentNode("NVJ");
      } else {
        const next = typeof nextNode === "function" ? nextNode() : nextNode;
        setCurrentNode(next);
      }
      
      setIsTransitioning(false);
    }, 200);
  };

  const goBack = () => {
    if (history.length <= 1) {
      setIsStarted(false);
      setCurrentNode("");
      setHistory([]);
      return;
    }
    
    setIsTransitioning(true);
    setTimeout(() => {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      if (newHistory.length === 1) {
        const firstNode = noVoterIDStates.includes(selectedState) && selectedState !== "Nevada" ? "I" : selectedState === "Nevada" ? "NV1" : "B";
        setCurrentNode(firstNode);
      } else {
        const prevEntry = newHistory[newHistory.length - 1];
        setCurrentNode(prevEntry.id);
      }
      setIsTransitioning(false);
    }, 200);
  };

  const restart = () => {
    setSelectedState("");
    setCurrentNode("");
    setHistory([]);
    setIsStarted(false);
  };

  const getSolutionIcon = (type: string) => {
    switch (type) {
      case "urgent":
        return <AlertTriangle className="size-8" style={{ color: '#EF4444' }} />;
      case "regular":
        return <CheckCircle className="size-8" style={{ color: '#1AC166' }} />;
      case "no-assistance":
        return <Users className="size-8" style={{ color: '#4A90E2' }} />;
      default:
        return <CheckCircle className="size-8" style={{ color: '#1AC166' }} />;
    }
  };

  const getSolutionColor = (type: string) => {
    switch (type) {
      case "urgent":
        return "bg-[#EF4444]/10 border-[#EF4444]/30";
      case "regular":
        return "bg-[#1AC166]/10 border-[#1AC166]/30";
      case "no-assistance":
        return "bg-[#4A90E2]/10 border-[#4A90E2]/30";
      default:
        return "bg-[#1AC166]/10 border-[#1AC166]/30";
    }
  };

  useEffect(() => {
    if (isStarted) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentNode, isStarted]);

  return (
    <main className="flex-1 overflow-auto">
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Step 1</span>
        </button>

        {/* Page Header - Always visible */}
        <div className="mb-8 flex items-center gap-4">
          <div
            className="rounded-2xl p-4"
            style={{ backgroundColor: '#1AC166' }}
          >
            <CreditCard className="size-6 text-white" />
          </div>
          <div>
            <h1 className="mb-1">Helpline: Step 2 - ID Assistance</h1>
            <p className="text-muted-foreground">
              Decision tree to determine the appropriate assistance for voter ID needs
            </p>
          </div>
        </div>

        {!isStarted ? (
          <>
            {/* Initial Script Card */}
            <div className="border border-border bg-card rounded-xl p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="mb-1">ID Assistance Script</h3>
                  <p className="text-sm text-muted-foreground">
                    Use this script when the voter needs ID assistance
                  </p>
                </div>
                <button
                  onClick={copyInitialScript}
                  className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  {initialScriptCopied ? (
                    <>
                      <Check className="size-4" style={{ color: '#1AC166' }} />
                      <span className="text-sm">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-4" />
                      <span className="text-sm">Copy</span>
                    </>
                  )}
                </button>
              </div>
              
              <div className="bg-script-box rounded-lg p-4 border border-border">
                <p className="leading-relaxed">{initialScript}</p>
              </div>
            </div>

            {/* State Selection */}
            <div className="border border-border bg-card rounded-xl p-8 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="size-5" style={{ color: '#4A90E2' }} />
                <h2>Select Voter's State</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Choose the state where the voter needs assistance.
              </p>

              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full bg-background border border-border rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
              >
                <option value="">Choose a state...</option>
                {allStates.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>

              {selectedState && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  {focusStateContacts[selectedState as keyof typeof focusStateContacts] && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm" style={{ backgroundColor: '#4A90E2' + '20', borderColor: '#4A90E2' + '40', color: '#4A90E2' }}>
                      Focus State
                    </div>
                  )}

                  <button
                    onClick={begin}
                    className="w-full px-6 py-3 rounded-lg text-white transition-all hover:shadow-lg hover:scale-[1.02]"
                    style={{ backgroundColor: '#1AC166' }}
                  >
                    Start Decision Tree
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">Progress</span>
                <span className="text-sm" style={{ color: '#1AC166' }}>
                  Question {history.length}
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-500 rounded-full"
                  style={{ 
                    backgroundColor: '#1AC166',
                    width: isSolutionCurrent ? '100%' : `${Math.min((history.length / 8) * 100, 90)}%`
                  }}
                />
              </div>
            </div>

            {/* State Badge */}
            <div className="mb-6 flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card">
                <MapPin className="size-4" style={{ color: '#4A90E2' }} />
                <span className="text-sm">{selectedState}</span>
              </div>
              {focusStateContacts[selectedState as keyof typeof focusStateContacts] && (
                <div className="px-3 py-1.5 rounded-lg border text-sm" style={{ backgroundColor: '#4A90E2' + '20', borderColor: '#4A90E2' + '40', color: '#4A90E2' }}>
                  Focus State
                </div>
              )}
            </div>

            {/* Script Display - if available (separate block) */}
            {(() => {
              const node = steps[currentNode];
              if (node && !node.isSolution && node.script) {
                return (
                  <div className="border border-border bg-card rounded-xl p-6 mb-6">
                    <h3 className="mb-4">Scripts for this question:</h3>
                    <div className="space-y-4">
                      {node.script.map((item: any, idx: number) => (
                        <div key={idx}>
                          {item.guide && (
                            <div className="flex items-center gap-2 mb-2">
                              <div className="size-5 rounded-full flex items-center justify-center text-xs text-white" style={{ backgroundColor: '#8B5CF6' }}>
                                {idx + 1}
                              </div>
                              <p className="text-sm text-muted-foreground italic">{item.guide}</p>
                            </div>
                          )}
                           <div className={`bg-script-box rounded-lg p-4 border border-border ${item.guide ? 'ml-7' : ''}`}>
                            <p className="leading-relaxed">{item.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
              return null;
            })()}

            {/* Current Question or Solution */}
            <div 
              className={`border border-border bg-card rounded-xl p-8 mb-6 transition-all duration-300 ${
                isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
              }`}
            >
              {(() => {
                const node = steps[currentNode];
                if (!node) return <p>Error: Step not found.</p>;
                const qText = typeof node.question === "function" ? node.question() : node.question;

                if (node.isSolution) {
                  return (
                    <div className="space-y-6">
                      {/* Email/Text Script - shown above "Unable to Assist" */}
                      {node.type === 'no-assistance' && (
                        <div className="border border-border bg-card rounded-xl p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="mb-1">Unable to Assist Script</h3>
                              <p className="text-sm text-muted-foreground">
                                Use this script to inform the voter that VoteRiders cannot assist
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setScriptType('email')}
                                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                                  scriptType === 'email'
                                    ? 'text-white'
                                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                }`}
                                style={scriptType === 'email' ? { backgroundColor: '#4A90E2' } : {}}
                              >
                                Email
                              </button>
                              <button
                                onClick={() => setScriptType('text')}
                                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                                  scriptType === 'text'
                                    ? 'text-white'
                                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                }`}
                                style={scriptType === 'text' ? { backgroundColor: '#4A90E2' } : {}}
                              >
                                Text
                              </button>
                            </div>
                          </div>
                          
                           <div className="bg-script-box rounded-lg p-4 border border-border">
                            <p className="leading-relaxed whitespace-pre-line">
                              {scriptType === 'email' 
                                ? emailScript.replace(/\[STATE\]/g, selectedState)
                                : textScript.replace(/\[STATE\]/g, selectedState)
                              }
                            </p>
                          </div>
                        </div>
                      )}

                      <div className={`${getSolutionColor(node.type || "")} rounded-xl p-8 border-2 animate-in fade-in zoom-in duration-500`}>
                        <div className="flex flex-col items-center text-center mb-6">
                          <div className="mb-4">
                            {getSolutionIcon(node.type || "")}
                          </div>
                          <h2 className="mb-2">
                            {node.type === 'urgent' && 'Urgent Action Required'}
                            {node.type === 'regular' && 'Regular Priority'}
                            {node.type === 'no-assistance' && 'Unable to Assist'}
                          </h2>
                        </div>
                        <div className="leading-relaxed mb-6 text-left bg-background/50 rounded-lg p-6 border border-border" dangerouslySetInnerHTML={{ __html: qText }} />
                        
                        <div className="rounded-lg p-5 mb-6 border-l-4 border-[#F59E0B]" style={{ backgroundColor: '#F59E0B' + '15' }}>
                          <p className="text-sm">
                            <strong>Important:</strong> Copy and paste the decision history below into the internal notes in the voter's Zendesk ticket.
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-3 justify-center">
                          <button
                            onClick={copyDecisionHistory}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white transition-all hover:shadow-lg"
                            style={{ backgroundColor: '#4A90E2' }}
                          >
                            <Clipboard className="size-4" />
                            {copied ? 'Copied!' : 'Copy Decision History'}
                          </button>
                          {node.type === 'no-assistance' && (
                            <>
                              <button
                                onClick={copyScript}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white transition-all hover:shadow-lg"
                                style={{ backgroundColor: '#4A90E2' }}
                              >
                                <Clipboard className="size-4" />
                                {scriptCopied ? 'Copied!' : 'Copy Script'}
                              </button>
                            </>
                          )}
                          <button
                            onClick={restart}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border hover:bg-muted transition-all"
                          >
                            <RotateCcw className="size-4" />
                            Start Over
                          </button>
                        </div>
                        {copied && (
                          <div className="text-center text-sm mt-4 animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ color: '#1AC166' }}>
                            ✓ Decision history copied to clipboard
                          </div>
                        )}
                        {scriptCopied && (
                          <div className="text-center text-sm mt-4 animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ color: '#1AC166' }}>
                            ✓ Script copied to clipboard
                          </div>
                        )}
                      </div>

                      {/* Decision History - Always visible on solution screen */}
                      {history.length > 1 && (
                        <div className="border border-border bg-card rounded-xl p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3>Decision History</h3>
                            <span className="text-sm text-muted-foreground">{history.length - 1} {history.length === 2 ? 'step' : 'steps'}</span>
                          </div>
                          <div className="space-y-4">
                            {history.slice(1).map((entry, i) => (
                              <div key={i} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                                <div 
                                  className="size-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-white text-xs"
                                  style={{ backgroundColor: '#1AC166' }}
                                >
                                  {i + 1}
                                </div>
                                <div className="flex-1">
                                  <div className="text-sm text-muted-foreground mb-1" dangerouslySetInnerHTML={{ __html: entry.question.replace(/<a[^>]*>/g, '').replace(/<\/a>/g, '') }} />
                                  <div className="text-sm" style={{ color: '#1AC166' }}>→ {entry.answer}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="mb-8">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-sm" style={{ backgroundColor: '#8B5CF6' + '20', color: '#8B5CF6' }}>
                        Question {history.length}
                      </div>
                      <h2 className="mb-2">
                        <span dangerouslySetInnerHTML={{ __html: qText }} />
                      </h2>
                      <p className="text-sm text-muted-foreground">Select the option that best describes the voter's situation</p>
                    </div>

                    {node.answers && (
                      <div className="space-y-3">
                        {node.answers.map((ans: any, idx: number) => (
                          <button
                            key={idx}
                            onClick={() => handleAnswer(ans.text, ans.next)}
                            className="group w-full text-left flex items-center gap-4 border-2 border-border bg-background hover:border-[#1AC166] hover:bg-[#1AC166]/5 transition-all p-5 rounded-xl hover:shadow-md hover:scale-[1.02]"
                          >
                            <div 
                              className="size-10 rounded-full flex items-center justify-center flex-shrink-0 text-white transition-all group-hover:scale-110"
                              style={{ backgroundColor: '#4A90E2' }}
                            >
                              {String.fromCharCode(65 + idx)}
                            </div>
                            <span className="flex-1">{ans.text}</span>
                            <ChevronRight className="size-5 text-muted-foreground group-hover:text-[#1AC166] transition-all group-hover:translate-x-1" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center gap-4">
              <button
                onClick={goBack}
                className="flex items-center gap-2 px-5 py-2.5 border border-border rounded-lg hover:bg-muted transition-all"
              >
                <ArrowLeft className="size-4" />
                {history.length <= 1 ? 'Back to State Selection' : 'Previous Question'}
              </button>

              <button
                onClick={onContinue}
                disabled={!isSolutionCurrent}
                className={`px-6 py-3 rounded-lg text-white transition-all ${
                  isSolutionCurrent ? 'hover:shadow-lg hover:scale-[1.02]' : 'opacity-50 cursor-not-allowed'
                }`}
                style={{ backgroundColor: isSolutionCurrent ? '#1AC166' : '#6B7280' }}
              >
                Continue to Step 3
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}