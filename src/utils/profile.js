import { supabase } from "../lib/supabase"

export async function loadProfile(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("display_name, avatar_color")
    .eq("id", userId)
    .single()

  if (error) {
    console.error("Failed to load profile:", error.message)
    return null
  }
  return data
}

export async function updateProfile(userId, updates) {
  const { error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId)

  if (error) {
    console.error("Failed to update profile:", error.message)
    return false
  }
  return true
}
