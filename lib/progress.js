const LAST_KEY = 'eng_last_chapter'      // { p: 'p03', i: 'i05' }
const VISITS_KEY = 'eng_chapter_visits'  // { p03: 1721440000000, ... }

function load(key) {
  if (typeof window === 'undefined') return {}
  try { return JSON.parse(localStorage.getItem(key) || '{}') } catch { return {} }
}

export function loadLast() {
  return load(LAST_KEY)
}

export function loadVisits() {
  return load(VISITS_KEY)
}

export function recordVisit(type, chapterId) {
  if (typeof window === 'undefined') return
  const last = load(LAST_KEY)
  last[type] = chapterId
  localStorage.setItem(LAST_KEY, JSON.stringify(last))
  const visits = load(VISITS_KEY)
  visits[chapterId] = Date.now()
  localStorage.setItem(VISITS_KEY, JSON.stringify(visits))
}

export function timeAgoLabel(ts) {
  if (!ts) return null
  const days = Math.floor((Date.now() - ts) / 86400000)
  if (days <= 0) return '今日'
  if (days === 1) return '昨日'
  return `${days}日前`
}
