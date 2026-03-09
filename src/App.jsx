import { useState, useEffect } from "react";
import { songs } from "./data/songs";
import { loadFavorites, addFavorite, removeFavorite } from "./utils/localStorage";
import MoodSelector from "./components/MoodSelector";
import SongCard from "./components/SongCard";
import Favorites from "./components/Favorites";

const floatingNotes = ["♪", "♫", "♩", "♬", "♭", "♮"];

function FloatingNote({ note, style }) {
  return (
    <span className="floating-note" style={style}>
      {note}
    </span>
  );
}

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getSongsForMood(mood) {
  return shuffle(songs.filter((s) => s.mood === mood));
}

export default function App() {
  const [notes, setNotes] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);

  useEffect(() => {
    setFavoriteIds(loadFavorites());
  }, []);

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

  function handleSelectMood(mood) {
    setSelectedMood(mood);
    setRecommended(getSongsForMood(mood));
  }

  function handleShuffle() {
    if (selectedMood) {
      setRecommended(getSongsForMood(selectedMood));
    }
  }

  function handleToggleFavorite(id) {
    if (favoriteIds.includes(id)) {
      setFavoriteIds(removeFavorite(favoriteIds, id));
    } else {
      setFavoriteIds(addFavorite(favoriteIds, id));
    }
  }

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
        }

        .scene {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem;
          overflow-x: hidden;
        }

        /* Aurora blobs */
        .blob {
          position: fixed;
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
          position: fixed;
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

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
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

        {/* Content */}
        <div style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 520,
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          paddingTop: "2rem",
        }}>
          {/* Header */}
          <div style={{ textAlign: "center", animation: "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both" }}>
            <p style={{
              fontSize: "0.7rem",
              fontWeight: 400,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: "0.75rem",
            }}>
              ✦ Music for every mood
            </p>
            <h1 style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 300,
              fontSize: "clamp(2.4rem, 7vw, 3.4rem)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              background: "linear-gradient(135deg, #fff 30%, #c4b5fd 70%, #93c5fd)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Vibe <em style={{ fontStyle: "italic", fontWeight: 300 }}>Match</em>
            </h1>
          </div>

          {/* Mood selector */}
          <div style={{ animation: "fadeUp 0.9s 0.15s cubic-bezier(0.16,1,0.3,1) both" }}>
            <p style={{
              textAlign: "center",
              fontSize: "0.95rem",
              color: "var(--muted)",
              marginBottom: "1rem",
            }}>
              How are you feeling?
            </p>
            <MoodSelector selected={selectedMood} onSelect={handleSelectMood} />
          </div>

          {/* Recommendations */}
          {selectedMood && (
            <div style={{ animation: "fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) both" }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.75rem",
              }}>
                <h2 style={{
                  fontFamily: "'Fraunces', serif",
                  fontWeight: 300,
                  fontSize: "1.3rem",
                  textTransform: "capitalize",
                }}>
                  {selectedMood} vibes
                </h2>
                <button
                  onClick={handleShuffle}
                  style={{
                    padding: "0.4rem 1rem",
                    borderRadius: "999px",
                    border: "1px solid rgba(255,255,255,0.15)",
                    background: "rgba(255,255,255,0.06)",
                    color: "rgba(240,238,255,0.6)",
                    fontSize: "0.8rem",
                    fontFamily: "'DM Sans', sans-serif",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  Shuffle
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {recommended.map((song) => (
                  <SongCard
                    key={song.id}
                    song={song}
                    isFavorite={favoriteIds.includes(song.id)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Favorites */}
          <div style={{ animation: "fadeUp 0.9s 0.3s cubic-bezier(0.16,1,0.3,1) both" }}>
            <h2 style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 300,
              fontSize: "1.3rem",
              marginBottom: "0.75rem",
              textAlign: "center",
            }}>
              Your Favorites
            </h2>
            <Favorites
              favoriteIds={favoriteIds}
              songs={songs}
              onToggleFavorite={handleToggleFavorite}
            />
          </div>

          {/* Bottom spacer */}
          <div style={{ height: "2rem" }} />
        </div>
      </div>
    </>
  );
}
