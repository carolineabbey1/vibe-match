export default function SongCard({ song, isFavorite, onToggleFavorite }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      padding: "0.75rem 1rem",
      borderRadius: "12px",
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.08)",
    }}>
      <img
        src={song.cover}
        alt={`${song.title} cover`}
        style={{ width: 56, height: 56, borderRadius: "8px", objectFit: "cover" }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          margin: 0,
          fontSize: "1rem",
          fontFamily: "'DM Sans', sans-serif",
          color: "#f0eeff",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}>
          {song.title}
        </p>
        <p style={{
          margin: "0.2rem 0 0",
          fontSize: "0.85rem",
          fontFamily: "'DM Sans', sans-serif",
          color: "rgba(240,238,255,0.45)",
        }}>
          {song.artist}
        </p>
      </div>
      <button
        onClick={() => onToggleFavorite(song.id)}
        style={{
          background: "none",
          border: "none",
          fontSize: "1.4rem",
          cursor: "pointer",
          padding: "0.25rem",
          lineHeight: 1,
        }}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorite ? "♥" : "♡"}
      </button>
    </div>
  )
}
