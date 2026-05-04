'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { pChapters } from '@/lib/pData'
import { iChapters } from '@/lib/iData'

// ---- helpers ----
function getAllPhrases(chapters, type) {
  const result = []
  chapters.forEach(ch => {
    ch.sections?.forEach(sec => {
      if (type === 'p' && sec.phrases) {
        sec.phrases.forEach(p => result.push({ id: `${ch.id}__${p}`, text: p, chId: ch.id, code: ch.code }))
      }
      if (type === 'p' && sec.isCompare && sec.compare) {
        sec.compare.forEach(c => result.push({ id: `${ch.id}__${c.phrase}`, text: c.phrase, chId: ch.id, code: ch.code }))
      }
      if (type === 'i' && sec.rows) {
        sec.rows.forEach(r => result.push({ id: `${ch.id}__${r.example}`, text: r.example, chunk: r.chunk, meaning: r.meaning, chId: ch.id, code: ch.code }))
      }
    })
  })
  return result
}

// ---- FocusList storage key ----
const FOCUS_KEY = 'eng_focus_list'

function loadFocus() {
  if (typeof window === 'undefined') return {}
  try { return JSON.parse(localStorage.getItem(FOCUS_KEY) || '{}') } catch { return {} }
}
function saveFocus(obj) {
  if (typeof window === 'undefined') return
  localStorage.setItem(FOCUS_KEY, JSON.stringify(obj))
}

// ---- PhraseCard ----
function PhraseCard({ text, playing, onPlay, focused, onToggleFocus, highlight }) {
  const html = highlight
    ? text.replace(new RegExp(highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), m => `<mark style="background:rgba(124,131,255,.3);color:#B0B8FF;border-radius:2px">${m}</mark>`)
    : text

  return (
    <div
      onClick={() => onPlay(text)}
      style={{
        background: playing ? 'rgba(124,131,255,.07)' : 'var(--bg2)',
        border: '1px solid var(--border)',
        borderLeft: `3px solid ${playing ? 'var(--accent)' : 'var(--border2)'}`,
        borderRadius: '8px',
        padding: '10px 12px',
        marginBottom: '6px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '8px',
        transition: 'all .15s',
      }}
      onMouseEnter={e => { if (!playing) e.currentTarget.style.borderLeftColor = 'var(--accent)'; e.currentTarget.style.background = 'rgba(255,255,255,.03)' }}
      onMouseLeave={e => { if (!playing) e.currentTarget.style.borderLeftColor = 'var(--border2)'; e.currentTarget.style.background = playing ? 'rgba(124,131,255,.07)' : 'var(--bg2)' }}
    >
      <div style={{ fontSize: '14px', lineHeight: '1.6', flex: 1 }} dangerouslySetInnerHTML={{ __html: html }} />
      <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
        <button
          onClick={e => { e.stopPropagation(); navigator.clipboard?.writeText(text) }}
          title="コピー"
          style={{ background: 'var(--bg3)', border: '1px solid var(--border2)', borderRadius: '5px', padding: '3px 7px', fontSize: '11px', color: 'var(--text-hint)', cursor: 'pointer' }}
        >⎘</button>
        <button
          onClick={e => { e.stopPropagation(); onToggleFocus(text) }}
          title={focused ? 'フォーカスリストから外す' : 'フォーカスリストに追加'}
          style={{
            background: focused ? 'rgba(255,215,100,.12)' : 'var(--bg3)',
            border: `1px solid ${focused ? 'var(--accent4)' : 'var(--border2)'}`,
            borderRadius: '5px', padding: '3px 7px', fontSize: '12px',
            color: focused ? 'var(--accent4)' : 'var(--text-hint)', cursor: 'pointer'
          }}
        >★</button>
      </div>
    </div>
  )
}

// ---- ChunkCard (i-type) ----
function ChunkCard({ row, playing, onPlay, focused, onToggleFocus, highlight }) {
  const hl = (str) => highlight
    ? str.replace(new RegExp(highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), m => `<mark style="background:rgba(124,255,212,.2);color:#7CFFD4;border-radius:2px">${m}</mark>`)
    : str

  return (
    <div
      onClick={() => onPlay(row.example)}
      style={{
        background: playing ? 'rgba(124,255,212,.06)' : 'var(--bg2)',
        border: '1px solid var(--border)',
        borderLeft: `3px solid ${playing ? 'var(--accent3)' : 'var(--border2)'}`,
        borderRadius: '10px', padding: '14px 16px', cursor: 'pointer',
        display: 'flex', flexDirection: 'column', gap: '8px', transition: 'all .15s',
      }}
      onMouseEnter={e => { if (!playing) { e.currentTarget.style.borderLeftColor = 'var(--accent3)'; e.currentTarget.style.background = 'rgba(124,255,212,.03)' } }}
      onMouseLeave={e => { if (!playing) { e.currentTarget.style.borderLeftColor = 'var(--border2)'; e.currentTarget.style.background = 'var(--bg2)' } }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '15px', fontWeight: 500, color: 'var(--accent3)', flex: 1 }}
          dangerouslySetInnerHTML={{ __html: hl(row.chunk) }} />
        <div style={{ display: 'flex', gap: '5px', flexShrink: 0 }}>
          <button onClick={e => { e.stopPropagation(); onPlay(row.example) }}
            style={{ background: 'var(--bg3)', border: '1px solid var(--border2)', borderRadius: '5px', padding: '3px 8px', fontSize: '10px', color: 'var(--text-hint)', cursor: 'pointer' }}>▶</button>
          <button onClick={e => { e.stopPropagation(); navigator.clipboard?.writeText(row.example) }}
            style={{ background: 'var(--bg3)', border: '1px solid var(--border2)', borderRadius: '5px', padding: '3px 7px', fontSize: '11px', color: 'var(--text-hint)', cursor: 'pointer' }}>⎘</button>
          <button onClick={e => { e.stopPropagation(); onToggleFocus(row.example) }}
            style={{ background: focused ? 'rgba(255,215,100,.12)' : 'var(--bg3)', border: `1px solid ${focused ? 'var(--accent4)' : 'var(--border2)'}`, borderRadius: '5px', padding: '3px 7px', fontSize: '12px', color: focused ? 'var(--accent4)' : 'var(--text-hint)', cursor: 'pointer' }}>★</button>
        </div>
      </div>
      <div style={{ fontSize: '11px', color: 'var(--text-hint)', background: 'var(--bg3)', borderRadius: '4px', padding: '3px 8px', alignSelf: 'flex-start' }}>
        {row.meaning}
      </div>
      <div style={{ fontSize: '13px', color: playing ? 'var(--text)' : 'var(--text-sub)', lineHeight: '1.65', paddingTop: '6px', borderTop: '1px solid var(--border)' }}
        dangerouslySetInnerHTML={{ __html: hl(row.example) }} />
    </div>
  )
}

// ---- FocusListPanel ----
function FocusListPanel({ focusMap, onToggleFocus, playingText, onPlay }) {
  const allData = [
    ...getAllPhrases(pChapters, 'p'),
    ...getAllPhrases(iChapters, 'i')
  ]
  const focused = allData.filter(p => focusMap[p.text])

  return (
    <div>
      <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ fontFamily: 'var(--font-sora)', fontSize: '16px', fontWeight: 600, color: 'var(--accent4)' }}>
          ★ フォーカスリスト
        </h2>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: 'var(--text-hint)', background: 'var(--bg3)', borderRadius: '4px', padding: '2px 8px' }}>
          {focused.length} phrases
        </span>
      </div>
      {focused.length === 0 ? (
        <div style={{ padding: '48px 20px', textAlign: 'center', color: 'var(--text-hint)', fontSize: '13px', lineHeight: '2' }}>
          <div style={{ fontSize: '28px', marginBottom: '12px', opacity: .4 }}>★</div>
          フレーズの ★ をクリックして<br />フォーカスリストに追加してください
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {focused.map(p => (
            <div key={p.id} style={{
              background: 'var(--bg2)', border: '1px solid var(--border)',
              borderLeft: `3px solid ${playingText === p.text ? 'var(--accent4)' : 'rgba(255,215,100,.3)'}`,
              borderRadius: '8px', padding: '12px 14px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px'
            }}>
              <div style={{ flex: 1 }}>
                {p.chunk && (
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: 'var(--accent3)', marginBottom: '4px' }}>{p.chunk}</div>
                )}
                <div style={{ fontSize: '13px', color: 'var(--text)', lineHeight: '1.6', cursor: 'pointer' }} onClick={() => onPlay(p.text)}>
                  {p.text}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-hint)', marginTop: '4px', fontFamily: 'JetBrains Mono, monospace' }}>{p.code}</div>
              </div>
              <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                <button onClick={() => onPlay(p.text)} style={{ background: 'var(--bg3)', border: '1px solid var(--border2)', borderRadius: '5px', padding: '4px 8px', fontSize: '11px', color: 'var(--text-hint)', cursor: 'pointer' }}>▶</button>
                <button onClick={() => navigator.clipboard?.writeText(p.text)} style={{ background: 'var(--bg3)', border: '1px solid var(--border2)', borderRadius: '5px', padding: '4px 7px', fontSize: '11px', color: 'var(--text-hint)', cursor: 'pointer' }}>⎘</button>
                <button onClick={() => onToggleFocus(p.text)} title="リストから外す"
                  style={{ background: 'rgba(255,215,100,.12)', border: '1px solid var(--accent4)', borderRadius: '5px', padding: '4px 7px', fontSize: '12px', color: 'var(--accent4)', cursor: 'pointer' }}>★</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ---- PChapterView ----
function PChapterView({ chapters, activeChapter, searchQuery, playingText, onPlay, focusMap, onToggleFocus }) {
  const filtered = activeChapter === 'all' ? chapters : chapters.filter(ch => ch.id === activeChapter)
  const q = searchQuery.toLowerCase()

  function matchPhrase(text) {
    return !q || text.toLowerCase().includes(q)
  }

  return (
    <div>
      {filtered.map((ch, ci) => {
        const anyMatch = ch.sections?.some(sec =>
          (sec.phrases || []).some(matchPhrase) ||
          (sec.compare || []).some(c => matchPhrase(c.phrase))
        )
        if (q && !anyMatch) return null

        return (
          <div key={ch.id} style={{ marginBottom: '44px' }}>
            <div style={{ marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: 'var(--accent)', background: 'rgba(124,131,255,.08)', border: '1px solid rgba(124,131,255,.2)', borderRadius: '4px', padding: '2px 8px' }}>{ch.code}</span>
                <span style={{ fontSize: '11px', color: 'var(--text-hint)' }}>{ch.level}</span>
              </div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '16px', color: 'var(--accent)', marginBottom: '3px' }}>{ch.chunk}</div>
              <div style={{ fontSize: '13px', color: 'var(--text-sub)', marginBottom: '6px' }}>{ch.title}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-hint)', lineHeight: '1.7' }}>{ch.desc}</div>
            </div>

            {ch.sections?.map((sec, si) => {
              const visiblePhrases = (sec.phrases || []).filter(matchPhrase)
              const visibleCompare = (sec.compare || []).filter(c => matchPhrase(c.phrase))
              if (q && visiblePhrases.length === 0 && visibleCompare.length === 0) return null

              return (
                <div key={si} style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <span style={{ background: 'var(--bg3)', border: '1px solid var(--border2)', borderRadius: '4px', padding: '2px 9px', fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'var(--accent4)' }}>{sec.tag}</span>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-sub)' }}>{sec.title}</span>
                  </div>
                  {sec.pattern && (
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: 'var(--text-hint)', marginBottom: '10px', padding: '6px 12px', background: 'var(--bg3)', borderRadius: '6px' }}>
                      {'> '}{sec.pattern}
                    </div>
                  )}
                  {sec.isCompare ? (
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      {visibleCompare.map((c, ci2) => (
                        <div key={ci2} style={{ flex: '1 1 200px', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '8px', padding: '12px 14px' }}>
                          <div
                            onClick={() => onPlay(c.phrase)}
                            style={{ fontSize: '14px', color: 'var(--text)', marginBottom: '5px', cursor: 'pointer' }}
                          >{c.phrase}</div>
                          <div style={{ fontSize: '12px', color: 'var(--text-sub)' }}>{c.desc}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    visiblePhrases.map((phrase, pi) => (
                      <PhraseCard key={pi} text={phrase} playing={playingText === phrase}
                        onPlay={onPlay} focused={!!focusMap[phrase]} onToggleFocus={onToggleFocus}
                        highlight={q || ''} />
                    ))
                  )}
                  {sec.tip && (
                    <div style={{ borderLeft: '3px solid var(--accent)', background: 'rgba(124,131,255,.05)', borderRadius: '0 8px 8px 0', padding: '9px 14px', marginTop: '10px', fontSize: '12px', color: 'var(--text-sub)', lineHeight: '1.7' }}
                      dangerouslySetInnerHTML={{ __html: sec.tip.replace(/`([^`]+)`/g, '<code style="font-family:JetBrains Mono,monospace;font-size:11px;background:var(--bg3);padding:1px 5px;border-radius:3px;color:var(--accent3)">$1</code>') }} />
                  )}
                </div>
              )
            })}
            {ci < filtered.length - 1 && <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '36px 0' }} />}
          </div>
        )
      })}
    </div>
  )
}

// ---- IChapterView ----
function IChapterView({ chapters, activeChapter, searchQuery, playingText, onPlay, focusMap, onToggleFocus }) {
  const filtered = activeChapter === 'all' ? chapters : chapters.filter(ch => ch.id === activeChapter)
  const q = searchQuery.toLowerCase()

  function matchRow(row) {
    return !q || row.chunk.toLowerCase().includes(q) || row.example.toLowerCase().includes(q) || row.meaning.toLowerCase().includes(q)
  }

  return (
    <div>
      {filtered.map((ch, ci) => {
        const anyMatch = ch.sections?.some(sec => (sec.rows || []).some(matchRow))
        if (q && !anyMatch) return null

        return (
          <div key={ch.id} style={{ marginBottom: '44px' }}>
            <div style={{ marginBottom: '22px', paddingBottom: '14px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: 'var(--accent3)', background: 'rgba(124,255,212,.08)', border: '1px solid rgba(124,255,212,.2)', borderRadius: '4px', padding: '2px 8px' }}>{ch.code}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-sora)', fontSize: '17px', fontWeight: 700, color: 'var(--text)', marginBottom: '3px' }}>{ch.title}</div>
              <div style={{ fontSize: '13px', color: 'var(--text-sub)', marginBottom: '6px' }}>{ch.titleJa}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-hint)', lineHeight: '1.7' }}>{ch.desc}</div>
            </div>

            {ch.sections?.map((sec, si) => {
              if (sec.isNuance) {
                return (
                  <div key={si} style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <span style={{ background: 'var(--bg3)', border: '1px solid var(--border2)', borderRadius: '4px', padding: '2px 9px', fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'var(--accent4)' }}>{sec.tag}</span>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-hint)' }}>{sec.title}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {sec.nuanceRows.map((r, ri) => (
                        <div key={ri} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderLeft: '3px solid rgba(124,255,212,.3)', borderRadius: '8px', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: 'var(--accent3)', minWidth: '200px' }}>{r.chunk}</span>
                          <span style={{ color: 'var(--border2)' }}>→</span>
                          <span style={{ fontSize: '13px', color: 'var(--text-sub)' }}>{r.nuance}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              }
              const visibleRows = (sec.rows || []).filter(matchRow)
              if (q && visibleRows.length === 0) return null

              return (
                <div key={si} style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <span style={{ background: 'var(--bg3)', border: '1px solid var(--border2)', borderRadius: '4px', padding: '2px 9px', fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'var(--accent4)' }}>{sec.tag}</span>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-hint)' }}>{sec.title}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '10px' }}>
                    {visibleRows.map((row, ri) => (
                      <ChunkCard key={ri} row={row} playing={playingText === row.example}
                        onPlay={onPlay} focused={!!focusMap[row.example]} onToggleFocus={onToggleFocus}
                        highlight={q || ''} />
                    ))}
                  </div>
                  {sec.tip && (
                    <div style={{ borderLeft: '3px solid var(--accent3)', background: 'rgba(124,255,212,.04)', borderRadius: '0 8px 8px 0', padding: '9px 14px', marginTop: '10px', fontSize: '12px', color: 'var(--text-sub)', lineHeight: '1.7' }}
                      dangerouslySetInnerHTML={{ __html: sec.tip.replace(/`([^`]+)`/g, '<code style="font-family:JetBrains Mono,monospace;font-size:11px;background:var(--bg3);padding:1px 5px;border-radius:3px;color:var(--accent3)">$1</code>') }} />
                  )}
                </div>
              )
            })}
            {ci < filtered.length - 1 && <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '36px 0' }} />}
          </div>
        )
      })}
    </div>
  )
}

// ---- Main App ----
export default function App() {
  const [tab, setTab] = useState('p')           // 'p' | 'i' | 'focus'
  const [activeChapter, setActiveChapter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [playingText, setPlayingText] = useState(null)
  const [isPlayingAll, setIsPlayingAll] = useState(false)
  const [isLoop, setIsLoop] = useState(false)
  const [speed, setSpeed] = useState(1.0)
  const [focusMap, setFocusMap] = useState({})
  const synthRef = useRef(null)
  const playAllRef = useRef(false)

  useEffect(() => {
    setFocusMap(loadFocus())
    synthRef.current = typeof window !== 'undefined' ? window.speechSynthesis : null
  }, [])

  // Reset chapter when tab changes
  useEffect(() => { setActiveChapter('all'); setSearchQuery('') }, [tab])

  const currentChapters = tab === 'p' ? pChapters : tab === 'i' ? iChapters : []
  const speeds = [0.7, 0.85, 1.0, 1.2, 1.5]

  const play = useCallback((text) => {
    const s = synthRef.current
    if (!s) return
    s.cancel()
    setPlayingText(text)
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'en-US'
    u.rate = speed
    u.onend = () => setPlayingText(null)
    s.speak(u)
  }, [speed])

  const stopAll = useCallback(() => {
    synthRef.current?.cancel()
    setPlayingText(null)
    setIsPlayingAll(false)
    playAllRef.current = false
  }, [])

  const togglePlayAll = useCallback(() => {
    if (isPlayingAll) { stopAll(); return }
    const allPhrases = tab === 'focus'
      ? [...getAllPhrases(pChapters, 'p'), ...getAllPhrases(iChapters, 'i')].filter(p => focusMap[p.text]).map(p => p.text)
      : tab === 'p'
        ? getAllPhrases(pChapters, 'p').filter(p => activeChapter === 'all' || p.chId === activeChapter).map(p => p.text)
        : getAllPhrases(iChapters, 'i').filter(p => activeChapter === 'all' || p.chId === activeChapter).map(p => p.text)

    if (allPhrases.length === 0) return
    setIsPlayingAll(true)
    playAllRef.current = true

    const playSeq = (list, idx) => {
      if (!playAllRef.current) return
      if (idx >= list.length) {
        if (isLoop) { playSeq(list, 0); return }
        setIsPlayingAll(false); setPlayingText(null); return
      }
      const text = list[idx]
      setPlayingText(text)
      const s = synthRef.current
      if (!s) return
      s.cancel()
      const u = new SpeechSynthesisUtterance(text)
      u.lang = 'en-US'; u.rate = speed
      u.onend = () => setTimeout(() => playSeq(list, idx + 1), 300)
      s.speak(u)
    }
    playSeq(allPhrases, 0)
  }, [isPlayingAll, tab, activeChapter, focusMap, isLoop, speed, stopAll])

  const toggleFocus = useCallback((text) => {
    setFocusMap(prev => {
      const next = { ...prev }
      if (next[text]) delete next[text]
      else next[text] = true
      saveFocus(next)
      return next
    })
  }, [])

  const focusCount = Object.keys(focusMap).length

  // Sidebar chapters
  const sidebarChapters = currentChapters

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* HEADER */}
      <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'var(--bg2)', borderBottom: '1px solid var(--border)', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ fontFamily: 'var(--font-sora)', fontWeight: 700, fontSize: '15px', color: tab === 'i' ? 'var(--accent3)' : tab === 'focus' ? 'var(--accent4)' : 'var(--accent)', whiteSpace: 'nowrap' }}>
          英語フレーズ<span style={{ color: 'var(--text-sub)', fontWeight: 400, fontSize: '12px', marginLeft: '6px' }}>04 Reference</span>
        </div>
        <div style={{ position: 'relative', flex: 1 }}>
          <span style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-hint)', fontSize: '14px', pointerEvents: 'none' }}>🔍</span>
          <input
            type="text"
            placeholder="フレーズを検索..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            disabled={tab === 'focus'}
            style={{ width: '100%', background: 'var(--bg3)', border: '1px solid var(--border2)', borderRadius: '8px', padding: '8px 14px 8px 36px', color: 'var(--text)', fontSize: '14px', outline: 'none', fontFamily: 'inherit', opacity: tab === 'focus' ? 0.5 : 1 }}
          />
        </div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: 'var(--text-sub)', background: 'var(--bg3)', border: '1px solid var(--border2)', borderRadius: '6px', padding: '4px 10px', whiteSpace: 'nowrap' }}>
          {focusCount > 0 && `★${focusCount} / `}{tab === 'p' ? `${pChapters.length * 4}+` : tab === 'i' ? `${iChapters.length * 4}+` : `★${focusCount}`} phrases
        </div>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: playingText ? 'var(--green)' : 'var(--text-hint)', flexShrink: 0, animation: playingText ? 'pulse 1s infinite' : 'none' }} />
      </div>

      {/* TAB BAR */}
      <div style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)', padding: '0 20px', display: 'flex', gap: '0', overflowX: 'auto' }}>
        {[
          { key: 'p', label: '構文パターン', sub: 'P01〜P15', accent: 'var(--accent)' },
          { key: 'i', label: 'イディオムチャンク', sub: 'I01〜I15', accent: 'var(--accent3)' },
          { key: 'focus', label: '★ フォーカスリスト', sub: `${focusCount} 件`, accent: 'var(--accent4)' }
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            style={{
              padding: '12px 20px', fontSize: '13px', fontFamily: 'var(--font-sora)', cursor: 'pointer',
              background: 'transparent', border: 'none', borderBottom: `2px solid ${tab === t.key ? t.accent : 'transparent'}`,
              color: tab === t.key ? t.accent : 'var(--text-hint)', whiteSpace: 'nowrap',
              transition: 'all .15s',
            }}>
            {t.label} <span style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', opacity: .7, marginLeft: '4px' }}>{t.sub}</span>
          </button>
        ))}
      </div>

      {/* CHAPTER NAV (not shown for focus tab) */}
      {tab !== 'focus' && (
        <div style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)', padding: '8px 20px', display: 'flex', gap: '6px', overflowX: 'auto' }}>
          <button onClick={() => setActiveChapter('all')}
            style={{ padding: '5px 13px', fontSize: '12px', background: activeChapter === 'all' ? (tab === 'i' ? 'var(--accent3)' : 'var(--accent)') : 'var(--bg3)', color: activeChapter === 'all' ? (tab === 'i' ? '#0F1117' : '#fff') : 'var(--text-sub)', border: `1px solid ${activeChapter === 'all' ? 'transparent' : 'var(--border2)'}`, borderRadius: '20px', cursor: 'pointer', fontFamily: 'var(--font-sora)', whiteSpace: 'nowrap' }}>
            ALL
          </button>
          {currentChapters.map(ch => (
            <button key={ch.id} onClick={() => setActiveChapter(ch.id)}
              style={{ padding: '5px 13px', fontSize: '12px', background: activeChapter === ch.id ? (tab === 'i' ? 'var(--accent3)' : 'var(--accent)') : 'transparent', color: activeChapter === ch.id ? (tab === 'i' ? '#0F1117' : '#fff') : 'var(--text-sub)', border: `1px solid ${activeChapter === ch.id ? 'transparent' : 'var(--border2)'}`, borderRadius: '20px', cursor: 'pointer', fontFamily: 'var(--font-sora)', whiteSpace: 'nowrap', transition: 'all .15s' }}>
              {ch.code} {tab === 'p' ? ch.chunk.substring(0, 12) : (ch.titleJa || ch.title).substring(0, 10)}
            </button>
          ))}
        </div>
      )}

      {/* LAYOUT */}
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 200px)' }}>
        {/* SIDEBAR */}
        {tab !== 'focus' && (
          <div style={{ width: '240px', flexShrink: 0, background: 'var(--bg2)', borderRight: '1px solid var(--border)', padding: '14px 10px', position: 'sticky', top: '200px', height: 'calc(100vh - 200px)', overflowY: 'auto' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-hint)', fontWeight: 600, letterSpacing: '.09em', textTransform: 'uppercase', marginBottom: '8px', padding: '0 6px' }}>Chapters</div>
            {[{ id: 'all', label: 'ALL', count: currentChapters.reduce((n, ch) => n + ch.sections?.reduce((m, s) => m + (s.phrases?.length || 0) + (s.rows?.length || 0), 0), 0) }]
              .concat(currentChapters.map(ch => ({
                id: ch.id,
                label: `${ch.code} ${(tab === 'p' ? ch.title : (ch.titleJa || ch.title)).substring(0, 12)}`,
                count: ch.sections?.reduce((m, s) => m + (s.phrases?.length || 0) + (s.rows?.length || 0), 0)
              }))).map(item => (
                <div key={item.id} onClick={() => setActiveChapter(item.id)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 10px', borderRadius: '7px', cursor: 'pointer', marginBottom: '1px', background: activeChapter === item.id ? (tab === 'i' ? 'rgba(124,255,212,.1)' : 'rgba(124,131,255,.12)') : 'transparent' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-sub)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.label}</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'var(--text-hint)', background: 'var(--bg3)', borderRadius: '4px', padding: '1px 5px', flexShrink: 0, marginLeft: '6px' }}>{item.count}</span>
                </div>
              ))
            }
          </div>
        )}

        {/* MAIN */}
        <div style={{ flex: 1, padding: tab === 'focus' ? '28px 32px' : '28px 32px', paddingBottom: '100px', minWidth: 0 }}>
          {tab === 'p' && (
            <PChapterView chapters={pChapters} activeChapter={activeChapter} searchQuery={searchQuery}
              playingText={playingText} onPlay={play} focusMap={focusMap} onToggleFocus={toggleFocus} />
          )}
          {tab === 'i' && (
            <IChapterView chapters={iChapters} activeChapter={activeChapter} searchQuery={searchQuery}
              playingText={playingText} onPlay={play} focusMap={focusMap} onToggleFocus={toggleFocus} />
          )}
          {tab === 'focus' && (
            <FocusListPanel focusMap={focusMap} onToggleFocus={toggleFocus} playingText={playingText} onPlay={play} />
          )}
        </div>
      </div>

      {/* AUDIO BAR */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200, background: 'var(--bg2)', borderTop: '1px solid var(--border)', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button onClick={togglePlayAll}
          style={{ background: isPlayingAll ? 'var(--accent)' : 'var(--bg3)', border: `1px solid ${isPlayingAll ? 'var(--accent)' : 'var(--border2)'}`, borderRadius: '7px', padding: '6px 14px', fontSize: '12px', color: isPlayingAll ? '#fff' : 'var(--text-sub)', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'var(--font-sora)' }}>
          {isPlayingAll ? '■ 停止' : '▶ 全再生'}
        </button>
        <button onClick={() => setIsLoop(v => !v)}
          style={{ background: isLoop ? 'rgba(124,131,255,.15)' : 'var(--bg3)', border: `1px solid ${isLoop ? 'var(--accent)' : 'var(--border2)'}`, borderRadius: '7px', padding: '6px 14px', fontSize: '12px', color: isLoop ? 'var(--accent)' : 'var(--text-sub)', cursor: 'pointer', fontFamily: 'var(--font-sora)' }}>
          ↩ ループ
        </button>
        <select value={speed} onChange={e => setSpeed(parseFloat(e.target.value))}
          style={{ background: 'var(--bg3)', border: '1px solid var(--border2)', borderRadius: '7px', padding: '6px 10px', fontSize: '11px', color: 'var(--text-sub)', cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace' }}>
          {speeds.map(s => <option key={s} value={s}>{s}×</option>)}
        </select>
        <div style={{ flex: 1, fontSize: '12px', color: playingText ? 'var(--text-sub)' : 'var(--text-hint)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'JetBrains Mono, monospace' }}>
          {playingText || '再生待機中...'}
        </div>
        {playingText && (
          <button onClick={stopAll}
            style={{ background: 'var(--bg3)', border: '1px solid var(--border2)', borderRadius: '7px', padding: '6px 14px', fontSize: '12px', color: 'var(--text-sub)', cursor: 'pointer' }}>
            ■ 停止
          </button>
        )}
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        input { outline: none; }
        input:focus { border-color: var(--accent) !important; }
        * { scrollbar-width: thin; scrollbar-color: var(--border2) transparent; }
        @media (max-width: 768px) {
          .sidebar { display: none; }
        }
      `}</style>
    </div>
  )
}
