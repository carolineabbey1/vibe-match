# Vibe Match

## Project Description
Vibe Match is a React web application that recommends songs based on the user’s current mood. Users can select a mood, browse recommended songs, save favorites, rate songs with a 1–5 star system, and personalize their profile. The application uses Supabase for authentication and cloud database storage so each user’s data (favorites, ratings, and profile information) is stored securely and persists across sessions. The goal of this project was to build a complete full-stack application while working collaboratively with an AI assistant to plan architecture, debug issues, and incrementally implement features.

## Technology Used
### Frontend
- React (Vite)
- JavaScript
- CSS
- React Hooks (useState, useEffect)
### Backend and Cloud Services
- Supabase Auth (email/ password authentication)
- Supabase PostgreSQL database
- Row Level Security (RLS) policies
### Deployment
- Vercel

## Setup Instructions
1. Clone the repository
2. Install dependencies
3. Create environment variables (create file called .env.local in the project and add the supabase URL and anon key)
4. Start the development server
5. The application will run at the local URL provided

## Architecture Overview
### Frontend
The frontend is a React application built with Vite. The main application state is managed in App.jsx, which coordinates authentication state, user profile data, favorites, and ratings.

Key components:
- App.jsx – Main application state and authentication gating
- Auth.jsx – Login and signup form
- MoodSelector.jsx – Allows users to select a mood
- SongCard.jsx – Displays song information and interactions
- Favorites.jsx – Displays saved songs
- Profile.jsx – Allows editing display name and avatar color
- StarRating.jsx – Handles the 1–5 star rating UI

Helper utilities handle communication with Supabase:
- utils/favorites.js
- utils/ratings.js
- utils/profile.js

### Backend
The backend is powered by Supabase, which provides both authentication and a PostgreSQL database. Authentication is handled with Supabase Auth using email and password login. Session persistence is automatically managed by the Supabase client, allowing users to remain logged in after refreshing the page. Database queries are performed through the Supabase JavaScript client and wrapped in small helper functions to keep UI components simple.

## Database Structure
The app uses 3 main tables.
### profiles - stores user profile info
| Column | Type | Description |
|------|------|-------------|
| id | uuid | references auth.users |
| display_name | text | user display name |
| avatar_color | text | selected avatar color |
| created_at | timestamp | profile creation time |

### favorites - stores songs that a user favorited
| Column | Type | Description |
|------|------|-------------|
| id | uuid | primary key |
| user_id | uuid | references profiles.id |
| song_id | integer | ID from song dataset |
| created_at | timestamp | when favorite was added |

### ratings - stores user song ratings
| Column | Type | Description |
|------|------|-------------|
| id | uuid | primary key |
| user_id | uuid | references profiles.id |
| song_id | integer | ID from songs dataset |
| rating | smallint | value from 1-5 |
| created_at | timestamp | when rating was saved |

## Known Bugs or Limitations
- The song list is static and stored locally rather than pulled from an external API.
- Ratings do not currently support clearing a rating once it is set (only changing the value).
- Profile avatars are color based instead of image uploads to keep the implementation simple.
- The application does not currently calculate average ratings across users.

## What I Learned
This project helped me learn how to use AI as a development partner rather than simply generating code all at once. I used Claude to plan the architecture of the application, break features into manageable steps, and debug issues such as authentication behavior and session loading. Working incrementally with AI made it easier to understand each part of the system and avoid large, hard to fix code changes. I also gained experience integrating a React frontend with Supabase authentication and database services.