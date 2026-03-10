export default function StarRating({ value, onChange }) {
  return (
    <div style={{ display: "flex", gap: "0.15rem" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onChange(star)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "0.95rem",
            padding: "0.1rem",
            lineHeight: 1,
            color: star <= (value || 0) ? "#f59e0b" : "rgba(240,238,255,0.2)",
          }}
          aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
        >
          ★
        </button>
      ))}
    </div>
  )
}
