const KEY = "vibe-match-favorites"

export function loadFavorites() {
  const data = localStorage.getItem(KEY)
  return data ? JSON.parse(data) : []
}

export function saveFavorites(ids) {
  localStorage.setItem(KEY, JSON.stringify(ids))
}

export function addFavorite(ids, id) {
  if (ids.includes(id)) return ids
  const next = [...ids, id]
  saveFavorites(next)
  return next
}

export function removeFavorite(ids, id) {
  const next = ids.filter((i) => i !== id)
  saveFavorites(next)
  return next
}
