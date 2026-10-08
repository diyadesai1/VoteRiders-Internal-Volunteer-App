import { useMemo, useState } from 'react';
import { CalendarDays, ExternalLink, Info } from 'lucide-react';
import {
  daysUntil,
  formatLongDate,
  getDeadlineStatus,
  keyElectionDetails,
  type DeadlineStatus,
} from '../../utils/electionDeadlines';

const data = keyElectionDetails;
const states = [...data.states].sort((a, b) => a.name.localeCompare(b.name));

const TURBOVOTE_HOME = 'https://voteriders.turbovote.org/';

const statusStyles: Record<DeadlineStatus['tone'], { backgroundColor: string; color: string }> = {
  passed: { backgroundColor: '#F3F4F6', color: '#6B7280' },
  urgent: { backgroundColor: '#FEE2E2', color: '#B91C1C' },
  soon: { backgroundColor: '#FEF3C7', color: '#92400E' },
  open: { backgroundColor: '#DCFCE7', color: '#166534' },
  upcoming: { backgroundColor: '#E0EDFB', color: '#1D4F91' },
};

function TurboVoteNotice({ url, stateName }: { url: string; stateName?: string }) {
  return (
    <div
      className="rounded-xl border-2 p-5 flex items-start gap-4"
      style={{ borderColor: '#4A90E2', backgroundColor: 'rgba(74, 144, 226, 0.06)' }}
    >
      <Info className="size-5 flex-shrink-0 mt-0.5" style={{ color: '#4A90E2' }} />
      <div className="flex-1">
        <p className="font-medium mb-1">Check the TurboVote link for more detailed information</p>
        <p className="text-sm text-muted-foreground mb-3">
          This page only lists key deadlines. TurboVote has the most up-to-date information, including how to
          register, ID rules, voting by mail, where to vote, and election office contacts. Always confirm
          deadlines there before sharing them with a voter.
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#4A90E2' }}
        >
          {stateName ? `Open the ${stateName} TurboVote page` : 'Open TurboVote'}
          <ExternalLink className="size-4" />
        </a>
      </div>
    </div>
  );
}

export function KeyElectionDetails() {
  const [stateCode, setStateCode] = useState('');
  const now = useMemo(() => new Date(), []);
  const state = states.find((s) => s.code === stateCode);
  const daysToElection = daysUntil(data.electionDate, now);

  return (
    <main className="flex-1 overflow-auto">
      <div className="max-w-4xl mx-auto px-8 py-12 space-y-6">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl p-4" style={{ backgroundColor: '#1AC166' }}>
            <CalendarDays className="size-6 text-white" />
          </div>
          <div>
            <h1 className="mb-1">Key Election Details</h1>
            <p className="text-muted-foreground">
              {data.electionName} · {formatLongDate(data.electionDate)}
              {daysToElection >= 0 && ` · ${daysToElection === 0 ? 'Today' : `${daysToElection} days away`}`}
            </p>
          </div>
        </div>

        <div className="border border-border bg-card rounded-xl p-6">
          <label htmlFor="key-election-state" className="block mb-2 font-medium">
            Voter's state
          </label>
          <select
            id="key-election-state"
            value={stateCode}
            onChange={(e) => setStateCode(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
          >
            <option value="">Select a state…</option>
            {states.map((s) => (
              <option key={s.code} value={s.code}>
                {s.name}
              </option>
            ))}
          </select>
          <p className="text-xs text-muted-foreground mt-2">
            Deadlines from {data.source}, last pulled {data.lastUpdated}.
          </p>
        </div>

        <TurboVoteNotice url={state?.turboVoteUrl ?? TURBOVOTE_HOME} stateName={state?.name} />

        {state && (
          <section className="border border-border bg-card rounded-xl p-6">
            <h3 className="mb-4 flex items-center gap-2">
              <span className="rounded-lg p-1.5" style={{ backgroundColor: '#1AC166' }}>
                <CalendarDays className="size-4 text-white" />
              </span>
              {state.name} Key Deadlines
            </h3>
            <div className="space-y-6">
              {state.deadlines.map((group) => (
                <div key={group.title}>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">{group.title}</p>
                  <div className="divide-y divide-border border border-border rounded-lg">
                    {group.items.map((item) => {
                      const status = getDeadlineStatus(item, now);
                      return (
                        <div key={`${item.label}-${item.display}`} className="flex items-center gap-4 px-4 py-3">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium">{item.display}</p>
                            <p className="text-sm text-muted-foreground">{item.label}</p>
                          </div>
                          {status && (
                            <span
                              className="text-xs font-medium rounded-full px-2.5 py-1 whitespace-nowrap"
                              style={statusStyles[status.tone]}
                            >
                              {status.label}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
