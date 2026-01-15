import { ExternalLink, Link as LinkIcon } from "lucide-react";

interface LinkItem {
  title: string;
  url: string;
  description: string;
  color: string;
}

const links: LinkItem[] = [
  {
    title: 'VoteRiders main website',
    url: 'https://voteriders.org',
    description: 'Official VoteRiders website with resources and information',
    color: '#4A90E2'
  },
  {
    title: 'Volunteer Intranet',
    url: 'https://sites.google.com/voteriders.org/volunteerintranet/home',
    description: 'Guides, documents, training materials, and team contact information.',
    color: '#1AC166'
  },
  {
    title: 'State Voter ID Requirements',
    url: 'https://www.voteriders.org/staterules/',
    description: 'Up-to-date information on voter ID laws by state',
    color: '#8B5CF6'
  },
  {
    title: 'Team Contact Information',
    url: 'https://sites.google.com/voteriders.org/volunteerintranet/vid-assist-team-leads',
    description: 'Voter ID Assistance Staff Leads, Organizers, and State Directors',
    color: '#F59E0B'
  },
];

export function ImportantLinks() {
  return (
    <main className="flex-1 overflow-auto">
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <div
            className="rounded-2xl p-4"
            style={{ backgroundColor: '#4A90E2' }}
          >
            <LinkIcon className="size-6 text-white" />
          </div>
          <div>
            <h1 className="mb-1">Important Links</h1>
            <p className="text-muted-foreground">
              Quick access to essential resources and documentation
            </p>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid gap-4">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-border bg-card rounded-xl p-6 transition-all hover:shadow-lg hover:scale-[1.02] hover:border-opacity-0"
              style={{
                '--hover-border': link.color,
              } as React.CSSProperties}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = link.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '';
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="mb-2 flex items-center gap-2">
                    {link.title}
                    <ExternalLink className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {link.description}
                  </p>
                </div>
                <div 
                  className="size-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: link.color }}
                >
                  <LinkIcon className="size-5 text-white" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}