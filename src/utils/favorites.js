import { supabase } from "../lib/supabase"

export async function loadFavorites(userId) {
  const { data, error } = await supabase
    .from("favorites")
    .select("song_id")
    .eq("user_id", userId)

  if (error) {
    console.error("Failed to load favorites:", error.message)
    return []
  }
  return data.map((row) => row.song_id)
}

export async function addFavorite(userId, songId) {
  const { error } = await supabase
    .from("favorites")
    .insert({ user_id: userId, song_id: songId })

  if (error) {
    console.error("Failed to add favorite:", error.message)
    return false
  }
  return true
}

export async function removeFavorite(userId, songId) {
  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("user_id", userId)
    .eq("song_id", songId)

  if (error) {
    console.error("Failed to remove favorite:", error.message)
    return false
  }
  return true
}

export async function clearFavorites(userId) {
  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("user_id", userId)

  if (error) {
    console.error("Failed to clear favorites:", error.message)
    return false
  }
  return true
}
