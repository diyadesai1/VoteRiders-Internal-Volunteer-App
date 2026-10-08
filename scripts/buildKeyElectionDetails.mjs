// Regenerates src/data/keyElectionDetails.json (key deadlines only) from the TurboVote election guides.
//
// Usage:
//   node scripts/buildKeyElectionDetails.mjs              # fetch live from TurboVote
//   node scripts/buildKeyElectionDetails.mjs --from-dir d # read saved guides (d/<code>.html)
//
// Each guide is the same content shown at
// https://voteriders.turbovote.org/elections/<code>/<date>, served as static HTML.

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ELECTION_DATE = '2026-11-03';
const ELECTION_NAME = '2026 General Election';
const OUTPUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../src/data/keyElectionDetails.json');

const STATES = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California', CO: 'Colorado',
  CT: 'Connecticut', DE: 'Delaware', DC: 'District of Columbia', FL: 'Florida', GA: 'Georgia',
  HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa', KS: 'Kansas',
  KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland', MA: 'Massachusetts',
  MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi', MO: 'Missouri', MT: 'Montana',
  NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey', NM: 'New Mexico',
  NY: 'New York', NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma',
  OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina',
  SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont', VA: 'Virginia',
  WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
};

const turboVoteUrl = (code) => `https://voteriders.turbovote.org/elections/${code.toLowerCase()}/${ELECTION_DATE}`;
const guideUrl = (code) =>
  `https://voteriders.turbovote.org/api/v0/translation/vdw/elections?ocd-id=ocd-division/country:us/state:${code.toLowerCase()}&date=${ELECTION_DATE}&lang=en`;

const decode = (s) =>
  s
    .replace(/&nbsp;/g, ' ')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&amp;/g, '&');

const toText = (html) =>
  decode(html.replace(/<br\s*\/?>/g, ' ').replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .replace(/\s+([.,;:!?)])/g, '$1')
    .replace(/\(\s+/g, '(')
    .trim();

function parseDeadlines(html) {
  const start = html.indexOf('id="dates-and-deadlines"');
  if (start < 0) return [];
  const end = html.indexOf('</section>', start);
  const sec = html.slice(start, end < 0 ? undefined : end);
  const groups = sec.split('<div class="subsection"').slice(1);
  return groups.map((group) => {
    const title = toText(group.match(/<h4[^>]*>([\s\S]*?)<\/h4>/)?.[1] ?? '');
    const items = (group.match(/<li itemprop="subEvent"[\s\S]*?<\/li>/g) ?? []).map((li) => {
      const label = toText(li.match(/itemprop="name">([\s\S]*?)<\/span>/)?.[1] ?? '');
      const keyword = li.match(/itemprop="keywords.name">([\s\S]*?)<\/span>/)?.[1];
      const startMatch = li.match(/<span content="([^"]+)" itemprop="startDate">([\s\S]*?)<span itemprop="location"/);
      const display = keyword ? toText(keyword) : toText(startMatch?.[2] ?? '').replace(/\s*-\s*/, ' - ');
      const item = { label };

      // "varies by location" / "No Deadline" rows carry a placeholder startDate that isn't a real deadline.
      if (/^[A-Z][a-z]{2} \d/.test(display)) {
        const startIso = startMatch?.[1];
        const endIso = li.match(/<span content="([^"]+)" itemprop="endDate">/)?.[1];
        item.date = startIso?.slice(0, 10);
        if (endIso && endIso.slice(0, 10) !== item.date) item.endDate = endIso.slice(0, 10);
        if (startIso?.includes('T')) item.deadline = startIso;
      }
      item.display = display;
      return item;
    });
    return { title, items };
  });
}

async function loadGuide(code, fromDir) {
  if (fromDir) return readFile(path.join(fromDir, `${code.toLowerCase()}.html`), 'utf8');
  const res = await fetch(guideUrl(code));
  if (!res.ok) throw new Error(`${code}: TurboVote returned ${res.status}`);
  return res.text();
}

const fromDirIndex = process.argv.indexOf('--from-dir');
const fromDir = fromDirIndex > -1 ? process.argv[fromDirIndex + 1] : null;

const states = [];
for (const code of Object.keys(STATES)) {
  const deadlines = parseDeadlines(await loadGuide(code, fromDir));
  if (!deadlines.length) throw new Error(`${code}: no deadlines found in guide`);
  states.push({ code, name: STATES[code], turboVoteUrl: turboVoteUrl(code), deadlines });
}

const output = {
  electionDate: ELECTION_DATE,
  electionName: ELECTION_NAME,
  lastUpdated: new Date().toISOString().slice(0, 10),
  source: 'TurboVote (voteriders.turbovote.org)',
  states,
};

await writeFile(OUTPUT, `${JSON.stringify(output, null, 2)}\n`);
console.log(`Wrote ${states.length} states to ${path.relative(process.cwd(), OUTPUT)}`);
