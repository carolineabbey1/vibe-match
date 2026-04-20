# Vibe Match

A mood-based music recommendation web app built with React and Supabase.

**Live Demo:** [your-vercel-url-here]
**GitHub:** [https://github.com/your-username/vibe-match](https://github.com/your-username/vibe-match)

---

## What It Does

Vibe Match lets you pick how you're feeling and instantly get a curated playlist of song recommendations for that mood. You can favorite songs, rate them with stars, and generate an AI-written vibe description for your current playlist — all tied to your personal account so your data persists across sessions.

## Features

- **Mood-based recommendations** — choose from Happy, Sad, Chill, Energetic, or Romantic and get a shuffled playlist
- **Favorites** — heart any song to save it to your personal favorites list
- **Star ratings** — rate songs 1–5 stars; ratings are saved per user
- **AI Vibe Description** — generate a short AI-written description of your current playlist's vibe (requires local setup, see below)
- **User profiles** — set a display name and avatar color
- **Authentication** — email/password login and signup via Supabase Auth

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, JavaScript, CSS |
| Auth & Database | Supabase (Auth + PostgreSQL) |
| AI Feature | Ollama (local LLM), Llama 3.2 3B, Express |
| Deployment | Vercel |

## Database Schema

**profiles**

| Column | Type | Description |
|---|---|---|
| id | uuid | references auth.users |
| display_name | text | user's chosen display name |
| avatar_color | text | hex color for avatar |
| created_at | timestamp | |

**favorites**

| Column | Type | Description |
|---|---|---|
| id | uuid | primary key |
| user_id | uuid | references profiles.id |
| song_id | integer | ID from the song dataset |
| created_at | timestamp | |

**ratings**

| Column | Type | Description |
|---|---|---|
| id | uuid | primary key |
| user_id | uuid | references profiles.id |
| song_id | integer | ID from the song dataset |
| rating | smallint | 1–5 |
| created_at | timestamp | |

## Running Locally

### 1. Clone and install

```bash
git clone https://github.com/your-username/vibe-match.git
cd vibe-match
npm install
```

### 2. Set up environment variables

Create a `.env.local` file in the project root:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Start the app

```bash
npm run dev
```

The app runs at `http://localhost:5173`.

### 4. AI Vibe Description (optional — local only)

The AI feature requires Ollama and a local Express server. It is **not available on the deployed Vercel version** because it depends on a locally running language model.

To use it locally:

```bash
# Install Ollama from https://ollama.com, then pull the model
ollama pull llama3.2:3b

# In a separate terminal, start the backend server
node server.cjs
```

Once both are running, the "Generate Vibe Description" button will work in the app.

## Known Limitations

- The song list is static and curated locally — not pulled from an external music API
- The AI vibe feature is local-only and unavailable in the live deployment
- Ratings can be changed but not cleared once set
- Avatars are color-based rather than image uploads
