export const FOCUS_KEY = 'eng_focus_list'

export function loadFocus() {
  if (typeof window === 'undefined') return {}
  try { return JSON.parse(localStorage.getItem(FOCUS_KEY) || '{}') } catch { return {} }
}

export function saveFocus(obj) {
  if (typeof window === 'undefined') return
  localStorage.setItem(FOCUS_KEY, JSON.stringify(obj))
  window.dispatchEvent(new Event('focus-updated'))
}

export function toggleFocusItem(focusMap, text) {
  const next = { ...focusMap }
  if (next[text]) delete next[text]
  else next[text] = true
  saveFocus(next)
  return next
}
