import { useState } from "react"
import { supabase } from "../lib/supabase"

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [checkEmail, setCheckEmail] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
    } else {
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (error) {
        setError(error.message)
      } else if (!data.session) {
        setCheckEmail(true)
      }
    }
    setLoading(false)
  }

  if (checkEmail) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        width: "100%",
        maxWidth: 360,
        textAlign: "center",
      }}>
        <h2 style={{
          fontFamily: "'Fraunces', serif",
          fontWeight: 300,
          fontSize: "1.5rem",
        }}>
          Check your email
        </h2>
        <p style={{
          color: "var(--muted)",
          fontSize: "0.95rem",
          fontFamily: "'DM Sans', sans-serif",
          lineHeight: 1.6,
        }}>
          We sent a confirmation link to <strong style={{ color: "#f0eeff" }}>{email}</strong>. Click the link to activate your account, then come back here to log in.
        </p>
        <button
          onClick={() => { setCheckEmail(false); setIsLogin(true) }}
          style={{
            marginTop: "0.5rem",
            padding: "0.7rem 1.5rem",
            borderRadius: "10px",
            border: "none",
            background: "rgba(124,58,237,0.5)",
            color: "#e0d4ff",
            fontSize: "0.95rem",
            fontFamily: "'DM Sans', sans-serif",
            cursor: "pointer",
          }}
        >
          Back to log in
        </button>
      </div>
    )
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "1.5rem",
      width: "100%",
      maxWidth: 360,
    }}>
      <h2 style={{
        fontFamily: "'Fraunces', serif",
        fontWeight: 300,
        fontSize: "1.5rem",
      }}>
        {isLogin ? "Welcome back" : "Create account"}
      </h2>

      <form onSubmit={handleSubmit} style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        width: "100%",
      }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: "0.7rem 1rem",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(255,255,255,0.06)",
            color: "#f0eeff",
            fontSize: "0.95rem",
            fontFamily: "'DM Sans', sans-serif",
            outline: "none",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          style={{
            padding: "0.7rem 1rem",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(255,255,255,0.06)",
            color: "#f0eeff",
            fontSize: "0.95rem",
            fontFamily: "'DM Sans', sans-serif",
            outline: "none",
          }}
        />

        {error && (
          <p style={{
            color: "#f87171",
            fontSize: "0.85rem",
            fontFamily: "'DM Sans', sans-serif",
            textAlign: "center",
            margin: 0,
          }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "0.7rem",
            borderRadius: "10px",
            border: "none",
            background: "rgba(124,58,237,0.5)",
            color: "#e0d4ff",
            fontSize: "0.95rem",
            fontFamily: "'DM Sans', sans-serif",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1,
            transition: "all 0.2s ease",
          }}
        >
          {loading ? "..." : isLogin ? "Log in" : "Sign up"}
        </button>
      </form>

      <button
        onClick={() => { setIsLogin(!isLogin); setError(null); setCheckEmail(false) }}
        style={{
          background: "none",
          border: "none",
          color: "var(--muted)",
          fontSize: "0.85rem",
          fontFamily: "'DM Sans', sans-serif",
          cursor: "pointer",
        }}
      >
        {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
      </button>
    </div>
  )
}
