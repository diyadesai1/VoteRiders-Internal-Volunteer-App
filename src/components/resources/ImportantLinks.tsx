import { ExternalLink } from "lucide-react";

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
    color: '#0362FF'
  },
  {
    title: 'Volunteer resources',
    url: '#',
    description: 'Access training materials and volunteer guides',
    color: '#1AC156'
  },
  {
    title: 'State voter ID requirements',
    url: '#',
    description: 'Up-to-date information on voter ID laws by state',
    color: '#7755FF'
  },
  {
    title: 'Support documentation',
    url: '#',
    description: 'Help documentation for volunteers',
    color: '#FFB503'
  },
];

export function ImportantLinks() {
  return (
    <main className="flex-1 overflow-auto" style={{ backgroundColor: '#F7F9F7' }}>
      <div className="max-w-5xl mx-auto p-8">
        <div className="space-y-6">
          <div>
            <h1 className="heading-primary mb-2" style={{ color: '#191919', fontSize: '2.5rem' }}>
              Important links
            </h1>
            <p style={{ color: '#6B6B6B', fontSize: '1.125rem' }}>Quick access to essential resources</p>
          </div>

          <div className="space-y-4 mt-8">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-3xl p-6 transition-all duration-300 glass-card hover:shadow-xl group"
                style={{
                  border: '2px solid rgba(25, 25, 25, 0.1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = link.color;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(25, 25, 25, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="heading-secondary mb-1" style={{ color: '#191919', fontSize: '1.25rem' }}>
                      {link.title}
                    </h3>
                    <p style={{ color: '#6B6B6B' }}>{link.description}</p>
                  </div>
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: link.color }}>
                    <ExternalLink className="w-5 h-5" style={{ color: '#F7F9F7' }} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
