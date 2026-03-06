import { useState, useEffect } from "react";

const floatingNotes = ["♪", "♫", "♩", "♬", "♭", "♮"];

function FloatingNote({ note, style }) {
  return (
    <span className="floating-note" style={style}>
      {note}
    </span>
  );
}

export default function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      note: floatingNotes[i % floatingNotes.length],
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 6}s`,
        animationDuration: `${6 + Math.random() * 6}s`,
        fontSize: `${1 + Math.random() * 1.5}rem`,
        opacity: 0.08 + Math.random() * 0.12,
      },
    }));
    setNotes(generated);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;1,300&family=DM+Sans:wght@300;400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #080b14;
          --surface: rgba(255,255,255,0.04);
          --border: rgba(255,255,255,0.08);
          --glow-a: #7c3aed;
          --glow-b: #0ea5e9;
          --glow-c: #ec4899;
          --text: #f0eeff;
          --muted: rgba(240,238,255,0.45);
        }

        html, body, #root {
          height: 100%;
          background: var(--bg);
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
        }

        .scene {
          position: relative;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 2rem;
          overflow: hidden;
        }

        /* Aurora blobs */
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.35;
          animation: drift 12s ease-in-out infinite alternate;
          pointer-events: none;
        }
        .blob-a {
          width: 520px; height: 520px;
          background: var(--glow-a);
          top: -10%; left: -10%;
          animation-duration: 14s;
        }
        .blob-b {
          width: 420px; height: 420px;
          background: var(--glow-b);
          bottom: -5%; right: -5%;
          animation-duration: 10s;
          animation-delay: -4s;
        }
        .blob-c {
          width: 300px; height: 300px;
          background: var(--glow-c);
          top: 40%; left: 55%;
          animation-duration: 16s;
          animation-delay: -8s;
        }

        @keyframes drift {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(40px, 30px) scale(1.08); }
        }

        /* Floating music notes */
        .floating-note {
          position: absolute;
          color: var(--text);
          animation: floatUp linear infinite;
          pointer-events: none;
          user-select: none;
        }
        @keyframes floatUp {
          0%   { transform: translateY(20px); opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: translateY(-80px); opacity: 0; }
        }

        /* Card */
        .card {
          position: relative;
          z-index: 1;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 3.5rem 4rem;
          max-width: 560px;
          width: 100%;
          backdrop-filter: blur(20px);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.05) inset,
            0 32px 80px rgba(0,0,0,0.5);
          animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          font-weight: 400;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 1.25rem;
          animation: fadeUp 0.9s 0.15s cubic-bezier(0.16,1,0.3,1) both;
        }

        .title {
          font-family: 'Fraunces', serif;
          font-weight: 300;
          font-size: clamp(2.8rem, 8vw, 4.2rem);
          line-height: 1;
          letter-spacing: -0.02em;
          margin-bottom: 0.2rem;
          background: linear-gradient(135deg, #fff 30%, #c4b5fd 70%, #93c5fd);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: fadeUp 0.9s 0.25s cubic-bezier(0.16,1,0.3,1) both;
        }

        .title em {
          font-style: italic;
          font-weight: 300;
        }

        .divider {
          width: 40px;
          height: 1px;
          background: linear-gradient(90deg, var(--glow-b), var(--glow-c));
          margin: 1.5rem auto;
          animation: fadeUp 0.9s 0.35s cubic-bezier(0.16,1,0.3,1) both;
        }

        .description {
          font-size: 1rem;
          line-height: 1.7;
          color: var(--muted);
          font-weight: 300;
          animation: fadeUp 0.9s 0.45s cubic-bezier(0.16,1,0.3,1) both;
        }

        .badge {
          display: inline-block;
          margin-top: 2rem;
          padding: 0.4rem 1rem;
          border-radius: 999px;
          border: 1px solid var(--border);
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          background: rgba(255,255,255,0.03);
          animation: fadeUp 0.9s 0.55s cubic-bezier(0.16,1,0.3,1) both;
        }
      `}</style>

      <div className="scene">
        {/* Aurora background */}
        <div className="blob blob-a" />
        <div className="blob blob-b" />
        <div className="blob blob-c" />

        {/* Floating notes */}
        {notes.map(({ id, note, style }) => (
          <FloatingNote key={id} note={note} style={style} />
        ))}

        {/* Main card */}
        <div className="card">
          <p className="eyebrow">✦ Music for every mood</p>
          <h1 className="title">
            Vibe <em>Match</em>
          </h1>
          <div className="divider" />
          <p className="description">
            Tell us how you're feeling — we'll find the soundtrack that fits.
            Discover music that moves with your mood, moment by moment.
          </p>
          <span className="badge">Coming soon</span>
        </div>
      </div>
    </>
  );
}