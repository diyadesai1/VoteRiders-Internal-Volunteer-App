import { Home } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ThankYouProps {
  onReturnToDashboard: () => void;
}

interface Confetti {
  x: number;
  y: number;
  rotation: number;
  speed: number;
  color: string;
  size: number;
  drift: number;
}

function FlipDigit({ value, isFlipping }: { value: number; isFlipping: boolean }) {
  const prevValue = value === 0 ? 9 : value - 1;

  return (
    <div className="relative inline-block" style={{ width: '0.65em', height: '1.2em', perspective: '1000px' }}>
      {/* Static top half */}
      <div 
        className="absolute top-0 left-0 w-full overflow-hidden bg-card"
        style={{ 
          height: '50%',
          borderRadius: '6px 6px 0 0',
          border: '1px solid rgba(0,0,0,0.15)',
          borderBottom: '0.5px solid rgba(0,0,0,0.2)',
        }}
      >
        <div 
          className="flex items-center justify-center" 
          style={{ 
            height: '200%',
            fontSize: '1em',
            lineHeight: '1.2em',
            marginTop: '0.05em',
          }}
        >
          {isFlipping ? value : prevValue}
        </div>
      </div>

      {/* Flipping top half */}
      {isFlipping && (
        <div 
          className="absolute top-0 left-0 w-full overflow-hidden origin-bottom bg-card"
          style={{ 
            height: '50%',
            animation: 'flipTop 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)',
            transformStyle: 'preserve-3d',
            borderRadius: '6px 6px 0 0',
            border: '1px solid rgba(0,0,0,0.15)',
            borderBottom: '0.5px solid rgba(0,0,0,0.2)',
            backfaceVisibility: 'hidden',
            zIndex: 2,
          }}
        >
          <div 
            className="flex items-center justify-center" 
            style={{ 
              height: '200%',
              fontSize: '1em',
              lineHeight: '1.2em',
              marginTop: '0.05em',
            }}
          >
            {prevValue}
          </div>
        </div>
      )}

      {/* Static bottom half */}
      <div 
        className="absolute bottom-0 left-0 w-full overflow-hidden bg-card"
        style={{ 
          height: '50%',
          borderRadius: '0 0 6px 6px',
          border: '1px solid rgba(0,0,0,0.15)',
          borderTop: 'none',
        }}
      >
        <div 
          className="flex items-center justify-center" 
          style={{ 
            height: '200%',
            fontSize: '1em',
            lineHeight: '1.2em',
            marginTop: '-100%',
            paddingTop: '0.05em',
          }}
        >
          {isFlipping ? value : prevValue}
        </div>
      </div>

      {/* Flipping bottom half */}
      {isFlipping && (
        <div 
          className="absolute bottom-0 left-0 w-full overflow-hidden origin-top bg-card"
          style={{ 
            height: '50%',
            animation: 'flipBottom 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)',
            transformStyle: 'preserve-3d',
            borderRadius: '0 0 6px 6px',
            border: '1px solid rgba(0,0,0,0.15)',
            borderTop: 'none',
            backfaceVisibility: 'hidden',
            zIndex: 1,
          }}
        >
          <div 
            className="flex items-center justify-center" 
            style={{ 
              height: '200%',
              fontSize: '1em',
              lineHeight: '1.2em',
              marginTop: '-100%',
              paddingTop: '0.05em',
            }}
          >
            {value}
          </div>
        </div>
      )}
    </div>
  );
}

export function ThankYou({ onReturnToDashboard }: ThankYouProps) {
  const [digits, setDigits] = useState([4, 2, 8, 4, 7]);
  const [flippingIndex, setFlippingIndex] = useState<number | null>(null);
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showElements, setShowElements] = useState(false);

  useEffect(() => {
    // Add flip animation styles
    const style = document.createElement('style');
    style.textContent = `
      @keyframes flipTop {
        0% { transform: rotateX(0deg); }
        100% { transform: rotateX(-90deg); }
      }
      @keyframes flipBottom {
        0% { transform: rotateX(90deg); }
        100% { transform: rotateX(0deg); }
      }
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);

    // Fade in elements
    setTimeout(() => setShowElements(true), 100);

    // Start flip animation
    const timer = setTimeout(() => {
      setFlippingIndex(4);
      setTimeout(() => {
        setDigits([4, 2, 8, 4, 8]);
        setTimeout(() => {
          setFlippingIndex(null);
          // Trigger confetti
          setShowConfetti(true);
          const colors = ['#1AC166', '#F59E0B', '#8B5CF6', '#4A90E2'];
          const newConfetti: Confetti[] = [];
          for (let i = 0; i < 60; i++) {
            newConfetti.push({
              x: 50 + (Math.random() - 0.5) * 60,
              y: -10,
              rotation: Math.random() * 360,
              speed: 1.5 + Math.random() * 2.5,
              color: colors[Math.floor(Math.random() * colors.length)],
              size: 6 + Math.random() * 6,
              drift: (Math.random() - 0.5) * 1.5,
            });
          }
          setConfetti(newConfetti);
        }, 100);
      }, 600);
    }, 1000);

    return () => {
      clearTimeout(timer);
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    if (!showConfetti) return;

    let animationFrameId: number;
    
    const animate = () => {
      setConfetti(prev => 
        prev
          .map(c => ({
            ...c,
            y: c.y + c.speed * 0.5,
            rotation: c.rotation + 3,
            x: c.x + c.drift * 0.3,
          }))
          .filter(c => c.y < 200)
      );
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    const timeout = setTimeout(() => {
      setShowConfetti(false);
      cancelAnimationFrame(animationFrameId);
    }, 8000);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, [showConfetti]);

  return (
    <main className="flex-1 overflow-auto bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-2xl mx-auto px-8 py-16 text-center relative">
        {/* Confetti */}
        {showConfetti && (
          <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 50 }}>
            {confetti.map((c, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  left: `${c.x}%`,
                  top: `${c.y}%`,
                  width: `${c.size}px`,
                  height: `${c.size}px`,
                  backgroundColor: c.color,
                  transform: `rotate(${c.rotation}deg)`,
                  borderRadius: '2px',
                  opacity: c.y > 150 ? Math.max(0, 1 - (c.y - 150) / 50) : 1,
                }}
              />
            ))}
          </div>
        )}

        {/* Thank You Message */}
        <div
          style={{
            opacity: showElements ? 1 : 0,
            transform: showElements ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
          }}
        >
          <h1 className="mb-4">Thank You for Volunteering!</h1>
          <p className="text-muted-foreground mb-12">
            Your dedication is making democracy more accessible for everyone.
          </p>
        </div>

        {/* Counter Animation - Focal Point */}
        <div
          className="border-2 border-border bg-card rounded-2xl p-12 mb-6 shadow-lg"
          style={{
            opacity: showElements ? 1 : 0,
            transform: showElements ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease-out 0.2s, transform 0.6s ease-out 0.2s',
          }}
        >
          <p className="text-sm text-muted-foreground mb-6">VoteRiders Volunteers Have Helped</p>
          <div className="flex items-center justify-center mb-6">
            <div 
              className="flex items-center gap-1 text-6xl tabular-nums"
              style={{ 
                color: flippingIndex === null && digits[4] === 8 ? '#1AC166' : '#F59E0B',
                transition: 'color 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.6s',
              }}
            >
              <FlipDigit value={digits[0]} isFlipping={false} />
              <FlipDigit value={digits[1]} isFlipping={false} />
              <span className="mx-1">,</span>
              <FlipDigit value={digits[2]} isFlipping={false} />
              <FlipDigit value={digits[3]} isFlipping={false} />
              <FlipDigit value={digits[4]} isFlipping={flippingIndex === 4} />
            </div>
          </div>
          <p className="text-muted-foreground">Voters Nationwide</p>
        </div>

        {/* Impact Message */}
        <div
          className="border border-border bg-card rounded-xl p-6 mb-8"
          style={{
            opacity: showElements ? 1 : 0,
            transform: showElements ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease-out 0.4s, transform 0.6s ease-out 0.4s',
          }}
        >
          <p className="text-sm">
            <span className="text-muted-foreground">You just helped secure </span>
            <span style={{ color: '#1AC166' }}>one more voice</span>
            <span className="text-muted-foreground"> in our democracy. Every call matters.</span>
          </p>
        </div>

        {/* Return Button */}
        <div
          style={{
            opacity: showElements ? 1 : 0,
            transform: showElements ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease-out 0.6s, transform 0.6s ease-out 0.6s',
          }}
        >
          <button
            onClick={onReturnToDashboard}
            className="flex items-center gap-2 px-8 py-3 rounded-lg text-white transition-all hover:shadow-lg hover:scale-[1.02] mx-auto mb-6"
            style={{ backgroundColor: '#1AC166' }}
          >
            <Home className="size-5" />
            <span>Return to Dashboard</span>
          </button>

          {/* Footer Message */}
          <p className="text-xs text-muted-foreground">
            Ready to help another voter? Head back to the dashboard to start your next call.
          </p>
        </div>
      </div>
    </main>
  );
}