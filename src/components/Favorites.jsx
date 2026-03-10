import SongCard from "./SongCard"

export default function Favorites({ favoriteIds, songs, onToggleFavorite, onClearAll, ratings, onRate }) {
  const favoriteSongs = songs.filter((song) => favoriteIds.includes(song.id))

  if (favoriteSongs.length === 0) {
    return (
      <p style={{
        textAlign: "center",
        color: "rgba(240,238,255,0.45)",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.95rem",
      }}>
        No favorites yet. Tap the heart on a song to save it here.
      </p>
    )
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {favoriteSongs.map((song) => (
        <SongCard
          key={song.id}
          song={song}
          isFavorite={true}
          onToggleFavorite={onToggleFavorite}
          rating={ratings[song.id]}
          onRate={onRate}
        />
      ))}
      <button
        onClick={() => { if (window.confirm("Remove all favorites?")) onClearAll() }}
        style={{
          marginTop: "0.5rem",
          padding: "0.4rem 1rem",
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.15)",
          background: "rgba(255,255,255,0.06)",
          color: "rgba(240,238,255,0.6)",
          fontSize: "0.8rem",
          fontFamily: "'DM Sans', sans-serif",
          cursor: "pointer",
          alignSelf: "center",
        }}
      >
        Clear all
      </button>
    </div>
  )
}
