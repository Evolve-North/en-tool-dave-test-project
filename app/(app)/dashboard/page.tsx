export default function DashboardPage() {
  return (
    <>
      <style>{`
        @keyframes glitch-skew {
          0%   { transform: skewX(0deg) scale(1); }
          4%   { transform: skewX(-4deg) scale(1.02); }
          8%   { transform: skewX(3deg) scale(0.98); }
          12%  { transform: skewX(0deg) scale(1); }
          88%  { transform: skewX(0deg) scale(1); }
          92%  { transform: skewX(2deg) scale(1.01); }
          96%  { transform: skewX(-3deg) scale(0.99); }
          100% { transform: skewX(0deg) scale(1); }
        }

        @keyframes chromatic {
          0%   { text-shadow: 4px 0 0 rgba(255,0,80,0.7), -4px 0 0 rgba(0,255,200,0.7); }
          20%  { text-shadow: -6px 0 0 rgba(255,0,80,0.7), 6px 0 0 rgba(0,255,200,0.7); }
          40%  { text-shadow: 4px 0 0 rgba(0,80,255,0.7), -4px 0 0 rgba(255,200,0,0.7); }
          60%  { text-shadow: -4px 0 0 rgba(0,80,255,0.7), 4px 0 0 rgba(255,200,0,0.7); }
          80%  { text-shadow: 6px 0 0 rgba(255,0,80,0.7), -6px 0 0 rgba(0,255,200,0.7); }
          100% { text-shadow: 4px 0 0 rgba(255,0,80,0.7), -4px 0 0 rgba(0,255,200,0.7); }
        }

        @keyframes bg-pulse {
          0%, 100% { background-color: #7e22ce; }
          33%       { background-color: #6d28d9; }
          66%       { background-color: #9333ea; }
        }

        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .glitch-text {
          animation:
            glitch-skew 4s infinite ease-in-out,
            chromatic   3s infinite linear;
        }

        .glitch-bg {
          animation: bg-pulse 6s infinite ease-in-out;
        }

        .ticker-track {
          display: flex;
          width: max-content;
          animation: ticker 28s linear infinite;
        }
      `}</style>
      <div className="glitch-bg fixed inset-0 flex flex-col items-center justify-center gap-12">
        <h1
          className="glitch-text text-[12vw] font-black uppercase leading-none tracking-tighter text-white"
          style={{ fontFamily: "Arial Black, Impact, sans-serif" }}
        >
          hello world
        </h1>

        <div className="w-full overflow-hidden border-y-2 border-white/30 py-3 bg-black/20">
          <div className="ticker-track">
            {Array.from({ length: 2 }).map((_, i) => (
              <span
                key={i}
                className="text-white/90 text-lg font-semibold uppercase tracking-widest whitespace-nowrap px-12"
                style={{ fontFamily: "Arial Black, Impact, sans-serif" }}
              >
                ☕ Coffee is proof that good things come from roasted beans &nbsp;★&nbsp; Every great idea started with a brew &nbsp;★&nbsp; Life is too short for bad coffee &nbsp;★&nbsp; Freshly roasted, infinitely better &nbsp;★&nbsp; The world runs on coffee and good people &nbsp;★&nbsp; Dark roast, bright future &nbsp;★&nbsp; One more cup never hurt anyone &nbsp;★&nbsp;
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
