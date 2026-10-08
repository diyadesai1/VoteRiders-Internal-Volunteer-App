import keyElectionDetailsData from '../data/keyElectionDetails.json';

export interface DeadlineItem {
  label: string;
  display: string;
  date?: string;
  endDate?: string;
  deadline?: string;
}

export interface DeadlineGroup {
  title: string;
  items: DeadlineItem[];
}

export interface StateDeadlines {
  code: string;
  name: string;
  turboVoteUrl: string;
  deadlines: DeadlineGroup[];
}

export interface KeyElectionDetailsData {
  electionDate: string;
  electionName: string;
  lastUpdated: string;
  source: string;
  states: StateDeadlines[];
}

export const keyElectionDetails = keyElectionDetailsData as KeyElectionDetailsData;

const DAY_MS = 24 * 60 * 60 * 1000;

export function parseLocalDate(date: string) {
  const [y, m, d] = date.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function formatLongDate(date: string) {
  return parseLocalDate(date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function daysUntil(date: string, now: Date) {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((parseLocalDate(date).getTime() - today.getTime()) / DAY_MS);
}

export type DeadlineStatus = { label: string; tone: 'passed' | 'urgent' | 'soon' | 'open' | 'upcoming' };

export function getDeadlineStatus(item: DeadlineItem, now: Date): DeadlineStatus | null {
  if (!item.date) return null;

  if (item.endDate) {
    const start = daysUntil(item.date, now);
    const end = daysUntil(item.endDate, now);
    if (end < 0) return { label: 'Ended', tone: 'passed' };
    if (start <= 0) return { label: end === 0 ? 'Last day today' : `Open now · ${end} days left`, tone: 'open' };
    return { label: `Starts in ${start} day${start === 1 ? '' : 's'}`, tone: 'upcoming' };
  }

  if (item.deadline && now.getTime() > new Date(item.deadline).getTime()) {
    return { label: 'Passed', tone: 'passed' };
  }
  const days = daysUntil(item.date, now);
  if (days < 0) return { label: 'Passed', tone: 'passed' };
  if (days === 0) return { label: 'Today', tone: 'urgent' };
  if (days <= 7) return { label: `${days} day${days === 1 ? '' : 's'} left`, tone: 'soon' };
  return { label: `${days} days left`, tone: 'upcoming' };
}

export type RegistrationDeadlineInfo = {
  stateName: string;
  turboVoteUrl: string;
  // "open" when at least one way to register (online, mail, in person, same-day) is still available.
  status: 'open' | 'passed' | 'unknown';
  items: Array<{ label: string; display: string; passed: boolean }>;
};

export function getRegistrationDeadlineInfo(stateName: string, now: Date = new Date()): RegistrationDeadlineInfo | null {
  const state = keyElectionDetails.states.find((s) => s.name === stateName);
  if (!state) return null;

  const group = state.deadlines.find((g) => /registration/i.test(g.title));
  const dated = (group?.items ?? []).filter((item) => item.date);
  const items = dated.map((item) => ({
    label: item.label,
    display: item.display,
    passed: getDeadlineStatus(item, now)?.tone === 'passed',
  }));

  let status: RegistrationDeadlineInfo['status'] = 'unknown';
  if (items.length) status = items.some((i) => !i.passed) ? 'open' : 'passed';

  return { stateName: state.name, turboVoteUrl: state.turboVoteUrl, status, items };
}
