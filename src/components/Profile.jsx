import { useState } from "react"

const colors = ["#7c3aed", "#0ea5e9", "#ec4899", "#10b981", "#f59e0b", "#ef4444"]

export default function Profile({ profile, onUpdate }) {
  const [editing, setEditing] = useState(false)
  const [draftName, setDraftName] = useState("")
  const [draftColor, setDraftColor] = useState("")

  const initial = (profile.display_name || "?")[0].toUpperCase()

  function handleEdit() {
    setDraftName(profile.display_name || "")
    setDraftColor(profile.avatar_color || colors[0])
    setEditing(true)
  }

  function handleCancel() {
    setEditing(false)
  }

  async function handleSave() {
    const ok = await onUpdate({ display_name: draftName.trim() || profile.display_name, avatar_color: draftColor })
    if (ok) setEditing(false)
  }

  if (editing) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        padding: "1rem",
        borderRadius: "12px",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}>
        <input
          type="text"
          value={draftName}
          onChange={(e) => setDraftName(e.target.value)}
          placeholder="Display name"
          maxLength={30}
          style={{
            padding: "0.6rem 0.75rem",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(255,255,255,0.06)",
            color: "#f0eeff",
            fontSize: "0.95rem",
            fontFamily: "'DM Sans', sans-serif",
            outline: "none",
          }}
        />
        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => setDraftColor(c)}
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: c,
                border: draftColor === c ? "2px solid #f0eeff" : "2px solid transparent",
                cursor: "pointer",
                padding: 0,
              }}
              aria-label={`Select color ${c}`}
            />
          ))}
        </div>
        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
          <button
            onClick={handleSave}
            style={{
              padding: "0.4rem 1.2rem",
              borderRadius: "999px",
              border: "none",
              background: "rgba(124,58,237,0.5)",
              color: "#e0d4ff",
              fontSize: "0.85rem",
              fontFamily: "'DM Sans', sans-serif",
              cursor: "pointer",
            }}
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            style={{
              padding: "0.4rem 1.2rem",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.06)",
              color: "rgba(240,238,255,0.6)",
              fontSize: "0.85rem",
              fontFamily: "'DM Sans', sans-serif",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.75rem",
    }}>
      <div style={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        background: profile.avatar_color || colors[0],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "0.95rem",
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 400,
        color: "#fff",
      }}>
        {initial}
      </div>
      <span style={{
        fontSize: "0.95rem",
        fontFamily: "'DM Sans', sans-serif",
        color: "#f0eeff",
      }}>
        {profile.display_name || "Anonymous"}
      </span>
      <button
        onClick={handleEdit}
        style={{
          padding: "0.3rem 0.75rem",
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.15)",
          background: "rgba(255,255,255,0.06)",
          color: "rgba(240,238,255,0.6)",
          fontSize: "0.75rem",
          fontFamily: "'DM Sans', sans-serif",
          cursor: "pointer",
        }}
      >
        Edit
      </button>
    </div>
  )
}
