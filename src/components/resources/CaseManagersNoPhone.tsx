import { useState, type ReactNode } from 'react';
import {
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  Phone,
  PhoneOff,
  RotateCcw,
  Slack,
  UserRound,
  Users,
} from 'lucide-react';

interface CaseManagersNoPhoneProps {
  onBack: () => void;
}

type Step = 'start' | 'yes' | 'no-choice' | 'case-manager' | 'individual-voter';

function ChoiceButton({
  label,
  letter,
  onClick,
}: {
  label: string;
  letter: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full text-left flex items-center gap-4 border-2 border-border bg-background hover:border-[#1AC166] hover:bg-[#1AC166]/5 transition-all p-5 rounded-xl hover:shadow-md hover:scale-[1.02]"
    >
      <div
        className="size-10 rounded-full flex items-center justify-center flex-shrink-0 text-white font-medium transition-all group-hover:scale-110"
        style={{ backgroundColor: '#4A90E2' }}
      >
        {letter}
      </div>
      <span className="flex-1 font-medium">{label}</span>
      <ChevronRight className="size-5 text-muted-foreground group-hover:text-[#1AC166] transition-all group-hover:translate-x-1" />
    </button>
  );
}

function ResultCard({
  title,
  icon: Icon,
  iconColor,
  borderColor,
  bgTint,
  children,
}: {
  title: string;
  icon: typeof Phone;
  iconColor: string;
  borderColor: string;
  bgTint: string;
  children: ReactNode;
}) {
  return (
    <div
      className="bg-card border border-border rounded-xl p-6 animate-in fade-in duration-300"
      style={{ backgroundColor: bgTint, borderColor }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Icon className="size-5" style={{ color: iconColor }} />
        <h3 className="mb-0 text-left">{title}</h3>
      </div>
      <div className="bg-muted rounded-lg p-4">{children}</div>
    </div>
  );
}

export function CaseManagersNoPhone({ onBack }: CaseManagersNoPhoneProps) {
  const [step, setStep] = useState<Step>('start');

  const restart = () => setStep('start');

  return (
    <main className="flex-1 overflow-auto">
      <div className="max-w-4xl mx-auto px-8 py-12">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 group"
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Dashboard</span>
        </button>

        <div className="mb-8 flex items-center gap-4">
          <div className="rounded-2xl p-4" style={{ backgroundColor: '#4A90E2' }}>
            <PhoneOff className="size-6 text-white" />
          </div>
          <div>
            <h1 className="mb-1">Working with Case Managers or Voters without Phones</h1>
            <p className="text-muted-foreground">
              What to do when a case manager contacts you on behalf of a client, or when a voter
              does not have their own phone number
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {step === 'start' && (
            <div
              className="bg-card border border-border rounded-xl p-6"
              style={{ backgroundColor: '#4A90E2' + '10', borderColor: '#4A90E2' + '30' }}
            >
              <h3 className="mb-3 text-left">Does the client have a personal phone number?</h3>
              <div className="bg-muted rounded-lg p-4 mb-5">
                <p className="text-sm text-left leading-relaxed">
                  When you receive a call or message from a case manager on behalf of their client
                  or a voter without a phone number, first, confirm if the client has a personal
                  phone number.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <ChoiceButton label="Yes" letter="Y" onClick={() => setStep('yes')} />
                <ChoiceButton label="No" letter="N" onClick={() => setStep('no-choice')} />
              </div>
            </div>
          )}

          {step === 'yes' && (
            <ResultCard
              title="If yes"
              icon={Phone}
              iconColor="#1AC166"
              borderColor="#1AC16630"
              bgTint="#1AC16610"
            >
              <p className="text-sm text-left leading-relaxed">
                Collect their phone number and give them a call to complete intake, go over the
                voter agreement, create a new profile and ticket, etc.
              </p>
            </ResultCard>
          )}

          {step === 'no-choice' && (
            <div
              className="bg-card border border-border rounded-xl p-6"
              style={{ backgroundColor: '#F59E0B' + '10', borderColor: '#F59E0B' + '30' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <PhoneOff className="size-5" style={{ color: '#F59E0B' }} />
                <h3 className="mb-0 text-left">If no — who contacted you?</h3>
              </div>
              <p className="text-sm text-muted-foreground text-left mb-5">
                Choose the path that matches your situation.
              </p>
              <div className="space-y-3">
                <ChoiceButton
                  label="Case manager"
                  letter="A"
                  onClick={() => setStep('case-manager')}
                />
                <ChoiceButton
                  label="Individual voter"
                  letter="B"
                  onClick={() => setStep('individual-voter')}
                />
              </div>
            </div>
          )}

          {step === 'case-manager' && (
            <ResultCard
              title="Case managers"
              icon={Users}
              iconColor="#8B5CF6"
              borderColor="#8B5CF630"
              bgTint="#8B5CF608"
            >
              <p className="text-sm text-left leading-relaxed">
                For case managers, provide them with their state organizer&apos;s email address and
                let them know they need to reach out to their organizer to coordinate a
                partnership.
              </p>
              <a
                href="https://voteriders.slack.com/archives/C01BGKCJ399/p1773426423514979"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-sm font-medium hover:underline transition-colors"
                style={{ color: '#4A90E2' }}
              >
                State organizer contact info
                <ExternalLink className="size-4" />
              </a>
            </ResultCard>
          )}

          {step === 'individual-voter' && (
            <ResultCard
              title="Individual voters"
              icon={UserRound}
              iconColor="#4A90E2"
              borderColor="#4A90E230"
              bgTint="#4A90E208"
            >
              <p className="text-sm text-left leading-relaxed">
                For individual voters, tag the state organizer in Slack to see if there is a local
                in-person clinic we can refer them to.
              </p>
              <a
                href="https://voteriders.slack.com/archives/C01BGKCJ399/p1773426423514979"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-sm font-medium hover:underline transition-colors"
                style={{ color: '#1AC166' }}
              >
                Open Slack
                <Slack className="size-4" />
              </a>
            </ResultCard>
          )}

          {step !== 'start' && (
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  if (step === 'case-manager' || step === 'individual-voter') {
                    setStep('no-choice');
                  } else {
                    setStep('start');
                  }
                }}
                className="px-5 py-2.5 rounded-lg border border-border hover:bg-muted text-sm transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={restart}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border hover:bg-muted text-sm transition-colors"
              >
                <RotateCcw className="size-4" />
                Start over
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
