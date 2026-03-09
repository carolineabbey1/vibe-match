import { moods } from "../data/songs"

export default function MoodSelector({ selected, onSelect }) {
  return (
    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
      {moods.map((mood) => (
        <button
          key={mood}
          onClick={() => onSelect(mood)}
          style={{
            padding: "0.6rem 1.4rem",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.15)",
            background: selected === mood ? "rgba(124,58,237,0.45)" : "rgba(255,255,255,0.06)",
            color: selected === mood ? "#e0d4ff" : "rgba(240,238,255,0.6)",
            fontSize: "0.95rem",
            fontFamily: "'DM Sans', sans-serif",
            cursor: "pointer",
            transition: "all 0.2s ease",
            textTransform: "capitalize",
          }}
        >
          {mood}
        </button>
      ))}
    </div>
  )
}
