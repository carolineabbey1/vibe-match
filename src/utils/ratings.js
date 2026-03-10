import { supabase } from "../lib/supabase"

export async function loadRatings(userId) {
  const { data, error } = await supabase
    .from("ratings")
    .select("song_id, rating")
    .eq("user_id", userId)

  if (error) {
    console.error("Failed to load ratings:", error.message)
    return {}
  }
  const map = {}
  for (const row of data) {
    map[row.song_id] = row.rating
  }
  return map
}

export async function upsertRating(userId, songId, rating) {
  const { error } = await supabase
    .from("ratings")
    .upsert(
      { user_id: userId, song_id: songId, rating },
      { onConflict: "user_id,song_id" }
    )

  if (error) {
    console.error("Failed to upsert rating:", error.message)
    return false
  }
  return true
}
