import React, { useMemo, useState, useEffect } from "react";
import GlobalLayout from "../core/global";
import { ArrowLeft, ArrowRight, IdCard, MapPin, Users, AlertTriangle, CheckCircle, RotateCcw, Clipboard } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function DTree({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isFromChat = location?.state?.from === 'chat';
  const [selectedState, setSelectedState] = useState("");
  const [currentNode, setCurrentNode] = useState("");
  const [history, setHistory] = useState([]);
  const [isStarted, setIsStarted] = useState(false);
  const [navError, setNavError] = useState("");
  const [copied, setCopied] = useState(false); // feedback for copy

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
    const s = {
      B: {
        question: "Voter is 16+ years old and a US citizen?",
        answers: [
          { text: "Yes", next: "C" },
          { text: "No", next: "G" },
        ],
      },
      NV1: {
        question:
          "Has the voter registration deadline for an upcoming election already passed and the voter is not currently registered to vote in <a href='https://voteriders.turbovote.org/how-to-vote/nv' target='_blank' class='text-blue-300 hover:text-white underline'>NV</a>?",
        answers: [
          { text: "No", next: "I" },
          { text: "Yes", next: "B" },
        ],
      },
      C: {
        question:
          "Voter lacks an up-to-date, unexpired state-issued ID or driver's license in their state?",
        answers: [
          { text: "Yes", next: "D" },
          { text: "No", next: () => (selectedState === "Nevada" ? "I" : "H") },
        ],
      },
      D: {
        question:
          "Needs ID for an impending deadline (e.g., <a href='http://VoteRiders.org/Vote' target='_blank' class='text-blue-300 hover:text-white underline'>to vote</a>, job offer pending their ability to show ID by a certain date OR must complete a housing application by a given date)?",
        answers: [
          {
            text: "Yes",
            next: () => {
              const f = focusStateContacts[selectedState];
              return f ? f.code : "L";
            },
          },
          { text: "No", next: "F" },
        ],
      },
      F: {
        question:
          "Solved: Refer to VIDA as regular priority (do not tag in Slack). Go over the <a href='https://drive.google.com/file/d/1v9CCQor2FMF6XFPu_sgFjx3o99ttNT1H/view' target='_blank' class='text-blue-300 hover:text-white underline'>Voter Agreement</a> with the voter prior to sending the ticket to ID Assist and check the corresponding box in Zendesk.",
        isSolution: true,
        type: "regular",
      },
      G: {
        question: "Is minor child who needs birth certificate for housing?",
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
        answers: [
          { text: "Yes", next: "BC1" },
          { text: "No", next: "I" },
        ],
      },
      BC1: {
        question: () => {
          if (selectedState === "Arizona") {
            return "Needs BC for an impending deadline (<a href='https://www.voteriders.org/register/arizona/' target='_blank' class='text-blue-300 hover:text-white underline'>to register to vote in a state/local election</a>, job offer pending their ability to show ID by a certain date, OR must complete a housing application by a given date)?";
          } else if (selectedState === "New Hampshire") {
            return "Needs BC for an impending deadline (<a href='https://www.voteriders.org/register/new-hampshire/' target='_blank' class='text-blue-300 hover:text-white underline'>to register to vote in a state/local election</a>, job offer pending their ability to show ID by a certain date, OR must complete a housing application by a given date)?";
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
          "Solved: Mark as urgent. Use <a href='https://sites.google.com/voteriders.org/volunteerintranet/vid-assist-team-leads?authuser=3' target='_blank' class='text-blue-300 hover:text-white underline'>this document</a> to determine who you should tag in Slack. Go over the <a href='https://drive.google.com/file/d/1v9CCQor2FMF6XFPu_sgFjx3o99ttNT1H/view' target='_blank' class='text-blue-300 hover:text-white underline'>Voter Agreement</a> with the voter prior to sending the ticket to ID Assist and check the corresponding box in Zendesk.",
        isSolution: true,
        type: "urgent",
      },
      BC_REGULAR: {
        question:
          "Solved: Refer to VIDA as regular priority (do not tag in Slack). Go over the <a href='https://drive.google.com/file/d/1v9CCQor2FMF6XFPu_sgFjx3o99ttNT1H/view' target='_blank' class='text-blue-300 hover:text-white underline'>Voter Agreement</a> with the voter prior to sending the ticket to ID Assist and check the corresponding box in Zendesk.",
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
          "Solved: VR can help, mark as urgent. Use <a href='https://sites.google.com/voteriders.org/volunteerintranet/helpline-and-chat' target='_blank' class='text-blue-300 hover:text-white underline'>this document</a> to determine who you should tag in Slack.",
        isSolution: true,
        type: "urgent",
      },
      NVJ: {
        question:
          "Solved: Mark as urgent. Use <a href='https://sites.google.com/voteriders.org/volunteerintranet/helpline-and-chat' target='_blank' class='text-blue-300 hover:text-white underline'>this document</a> to determine who you should tag in Slack.",
        isSolution: true,
        type: "urgent",
      },
      L: {
        question:
          "Solved: Mark as urgent. Use <a href='https://sites.google.com/voteriders.org/volunteerintranet/helpline-and-chat' target='_blank' class='text-blue-300 hover:text-white underline'>this document</a> to determine who you should tag in Slack. Go over the <a href='https://drive.google.com/file/d/1v9CCQor2FMF6XFPu_sgFjx3o99ttNT1H/view' target='_blank' class='text-blue-300 hover:text-white underline'>Voter Agreement</a> with the voter prior to sending the ticket to ID Assist and check the corresponding box in Zendesk.",
        isSolution: true,
        type: "urgent",
      },
    };

    // Add focus state codes (K1..K8)
    Object.values(focusStateContacts).forEach(({ code }) => {
      s[code] = {
        question:
          "Solved: Mark as urgent. Use <a href='https://sites.google.com/voteriders.org/volunteerintranet/helpline-and-chat' target='_blank' class='text-blue-300 hover:text-white underline'>this document</a> to determine who you should tag in Slack. Go over the <a href='https://drive.google.com/file/d/1v9CCQor2FMF6XFPu_sgFjx3o99ttNT1H/view' target='_blank' class='text-blue-300 hover:text-white underline'>Voter Agreement</a> with the voter prior to sending the ticket to ID Assist and check the corresponding box in Zendesk.",
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
    const lines = [];
    // History[0] is state selection; skip it for numbering.
    history.slice(1).forEach((h, idx) => {
      const q = h.question.replace(/<[^>]+>/g, '').trim();
      lines.push(`${idx + 1}. ${q}`); // number and question on same line now
      lines.push(`Answer: ${h.answer}`);
    });
    return lines.join('\n');
  };

  const copyDecisionHistory = async () => {
    try {
      const text = buildDecisionHistoryText();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error('Copy failed', e);
      alert('Copy to clipboard failed. Please manually select and copy the decision history.');
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

  const handleAnswer = (answerText, nextNode) => {
    const node = steps[currentNode];
    if (!node) return;

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
  };

  const goBack = () => {
    if (history.length <= 1) {
      setIsStarted(false);
      setCurrentNode("");
      setHistory([]);
      return;
    }
    const newHistory = history.slice(0, -1);
    setHistory(newHistory);
    if (newHistory.length === 1) {
      const firstNode = noVoterIDStates.includes(selectedState) && selectedState !== "Nevada" ? "I" : selectedState === "Nevada" ? "NV1" : "B";
      setCurrentNode(firstNode);
    } else {
      const prevEntry = newHistory[newHistory.length - 1];
      setCurrentNode(prevEntry.id);
    }
  };

  const restart = () => {
    setSelectedState("");
    setCurrentNode("");
    setHistory([]);
    setIsStarted(false);
  };

  const handleNextClick = () => {
    if (!isSolutionCurrent) {
      setNavError("Decision Tree must be completed before moving on to next step");
      setTimeout(() => setNavError(""), 3000);
      return;
    }
    navigate("/agree", { state: { from: isFromChat ? 'chat' : 'helpline' } });
  };

  const getSolutionIcon = (type) => {
    switch (type) {
      case "urgent":
        return <AlertTriangle className="w-6 h-6 text-red-400" />;
      case "regular":
        return <CheckCircle className="w-6 h-6 text-green-400" />;
      case "no-assistance":
        return <Users className="w-6 h-6 text-blue-400" />;
      default:
        return <CheckCircle className="w-6 h-6 text-green-400" />;
    }
  };

  const getSolutionColor = (type) => {
    switch (type) {
      case "urgent":
        return "bg-red-500/10 border-red-400/20";
      case "regular":
        return "bg-green-500/10 border-green-400/20";
      case "no-assistance":
        return "bg-blue-500/10 border-blue-400/20";
      default:
        return "bg-green-500/10 border-green-400/20";
    }
  };

  // Smoothly scroll to the top when steps change or when starting/ending
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentNode, isStarted]);

  return (
    <GlobalLayout onLogout={onLogout}>
      {!isStarted ? (
        <div className="max-w-4xl mx-auto md:mt-22">
          {/* Header */}
          <div className="text-center space-y-6 mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">

              <h1 className="text-4xl md:text-5xl font-bold text-white">ID ASSISTANCE</h1>
            </div>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Decision tree to help determine the appropriate assistance for voter ID needs.
            </p>
          </div>

          {/* State Selection */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 mb-8">
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <MapPin className="w-6 h-6 text-blue-300" />
                <h2 className="text-2xl font-bold text-white">Select Voter's State</h2>
              </div>
              <p className="text-blue-200 text-lg">Choose the state where the voter needs assistance.</p>

              <div className="max-w-md mx-auto">
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="" className="text-black">Choose a state...</option>
                  {allStates.map((st) => (
                    <option key={st} value={st} className="text-black">
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              {selectedState && (
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-3 text-sm">
                    {focusStateContacts[selectedState] && (
                      <span className="px-2 py-1 rounded-md border bg-blue-500/20 text-blue-200 border-blue-400/30">Focus State</span>
                    )}
                  </div>

                  <button
                    onClick={begin}
                    className="inline-flex items-center justify-center bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Start Decision Tree
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => navigate(isFromChat ? "/chat" : "/helpline")}
              className="px-4 py-2 rounded-md border border-white/30 text-white hover:bg-white/10 backdrop-blur-sm hover:border-white/50 transition-all duration-300 inline-flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {isFromChat ? 'Back to Chat' : 'Back to Helpline'}
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto mt-12 md:mt-16">
          {/* Current Question or Solution */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 mb-8">
            {(() => {
              const node = steps[currentNode];
              if (!node) return <p className="text-white">Error: Step not found.</p>;
              const qText = typeof node.question === "function" ? node.question() : node.question;

              if (node.isSolution) {
                return (
                  <div className={`${getSolutionColor(node.type || "")} rounded-lg p-6`}>
                    <div className="flex items-start gap-4">
                      {getSolutionIcon(node.type || "")}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-4 text-left">Solution Found</h3>
                        <div className="text-white leading-relaxed text-left" dangerouslySetInnerHTML={{ __html: qText }} />
                        <p className="mt-4 text-yellow-200 text-sm italic text-left">
                          Please copy and paste the decision history into the internal notes in the voter's Zendesk ticket.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3 items-center">
                          <button
                            onClick={copyDecisionHistory}
                            className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white inline-flex items-center gap-2"
                          >
                            <Clipboard className="w-4 h-4" />
                            {copied ? 'Copied!' : 'Copy Decision'}
                          </button>
                          <button
                            onClick={restart}
                            className="px-4 py-2 rounded-md border border-white/30 text-white hover:bg-white/10 inline-flex items-center"
                          >
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Start Over
                          </button>
                          <button
                            onClick={handleNextClick}
                            aria-disabled={!isSolutionCurrent}
                            className={`px-4 py-2 rounded-md border border-white/30 text-white hover:bg-white/10 inline-flex items-center ${!isSolutionCurrent ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            Next Step
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </button>
                        </div>
                        {copied && (
                          <div className="text-green-300 text-xs mt-2">Decision history copied to clipboard.</div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">
                    <span dangerouslySetInnerHTML={{ __html: qText }} />
                  </h3>
                  {node.answers && (
                    <div className="space-y-3">
                      {node.answers.map((ans, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleAnswer(ans.text, ans.next)}
                          className="w-full text-left justify-start bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-white/40 transition-all duration-300 p-4 rounded-md"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-sm font-bold">{String.fromCharCode(65 + idx)}</span>
                            </div>
                            <span>{ans.text}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>

          {/* History */}
          {history.length > 1 && (
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/20 p-6 mb-8 text-left">
              <h4 className="text-white font-medium mb-4">Decision History:</h4>
              <div className="space-y-2">
                {history.slice(1).map((entry, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-left">
                    <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">{i + 1}</span>
                    </div>
                    <div className="text-left">
                      <div className="text-blue-200" dangerouslySetInnerHTML={{ __html: entry.question.replace(/<a[^>]*>/g, '').replace(/<\/a>/g, '') }} />
                      <div className="text-green-200 font-medium">Answer: {entry.answer}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <button
                onClick={goBack}
                className="px-4 py-2 rounded-md border border-white/30 text-white hover:bg-white/10 backdrop-blur-sm hover:border-white/50 transition-all duration-300 inline-flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>

              <div className="text-center">
                <p className="text-blue-200 text-sm">Step {history.length} - {selectedState}</p>
              </div>

              <button
                onClick={handleNextClick}
                aria-disabled={!isSolutionCurrent}
                className={`px-4 py-2 rounded-md border border-white/30 text-white hover:bg-white/10 backdrop-blur-sm hover:border-white/50 transition-all duration-300 inline-flex items-center ${!isSolutionCurrent ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Next Step
              </button>
            </div>
            {navError && (
              <div role="alert" aria-live="polite" className="text-red-300 text-sm text-center">
                {navError}
              </div>
            )}
          </div>
        </div>
      )}
    </GlobalLayout>
  );
}
