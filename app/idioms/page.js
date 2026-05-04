'use client'
import { useState, useEffect } from 'react'
import NavBar from '@/components/NavBar'
import AudioBar from '@/components/AudioBar'
import { ChapterNav, Sidebar } from '@/components/ChapterNav'
import { iChapters } from '@/lib/iData'
import { useAudio } from '@/lib/useAudio'
import { loadFocus, toggleFocusItem } from '@/lib/focus'

const ACCENT = '#7CFFD4'

function hl(text, q) {
  if (!q) return text
  return text.replace(new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'),
    m => `<mark style="background:rgba(124,255,212,.2);color:#7CFFD4;border-radius:2px">${m}</mark>`)
}

function tipHtml(tip) {
  return tip.replace(/`([^`]+)`/g, '<code style="font-family:JetBrains Mono,monospace;font-size:11px;background:#1E2030;padding:1px 5px;border-radius:3px;color:#7CFFD4">$1</code>')
}

function StarBtn({ focused, onClick }) {
  return (
    <button onClick={onClick} title={focused ? 'リストから外す' : 'フォーカスリストに追加'} style={{
      background: focused ? 'rgba(255,215,100,.12)' : '#1E2030',
      border: `1px solid ${focused ? '#FFD97C' : '#363A50'}`,
      borderRadius: '5px', padding: '3px 7px', fontSize: '12px',
      color: focused ? '#FFD97C' : '#565B78', cursor: 'pointer',
    }}>★</button>
  )
}

function ChunkCard({ row, playing, onPlay, focused, onToggle, q }) {
  return (
    <div onClick={() => onPlay(row.example)} style={{
      background: playing ? 'rgba(124,255,212,.06)' : '#161820',
      border: '1px solid #2A2D3E',
      borderLeft: `3px solid ${playing ? ACCENT : '#363A50'}`,
      borderRadius: '10px', padding: '14px 16px', cursor: 'pointer',
      display: 'flex', flexDirection: 'column', gap: '8px', transition: 'all .15s',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderLeftColor = ACCENT; e.currentTarget.style.background = 'rgba(124,255,212,.03)' }}
      onMouseLeave={e => { e.currentTarget.style.borderLeftColor = playing ? ACCENT : '#363A50'; e.currentTarget.style.background = playing ? 'rgba(124,255,212,.06)' : '#161820' }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '15px', fontWeight: 500, color: ACCENT, flex: 1 }}
          dangerouslySetInnerHTML={{ __html: hl(row.chunk, q) }} />
        <div style={{ display: 'flex', gap: '5px', flexShrink: 0 }}>
          <button onClick={e => { e.stopPropagation(); onPlay(row.example) }}
            style={{ background: '#1E2030', border: '1px solid #363A50', borderRadius: '5px', padding: '3px 8px', fontSize: '10px', color: '#565B78', cursor: 'pointer' }}>▶</button>
          <button onClick={e => { e.stopPropagation(); navigator.clipboard?.writeText(row.example) }}
            style={{ background: '#1E2030', border: '1px solid #363A50', borderRadius: '5px', padding: '3px 7px', fontSize: '11px', color: '#565B78', cursor: 'pointer' }}>⎘</button>
          <StarBtn focused={focused} onClick={e => { e.stopPropagation(); onToggle(row.example) }} />
        </div>
      </div>
      <div style={{ fontSize: '11px', color: '#565B78', background: '#1E2030', borderRadius: '4px', padding: '3px 8px', alignSelf: 'flex-start' }}>
        {row.meaning}
      </div>
      <div style={{ fontSize: '13px', color: playing ? '#E8EAF6' : '#9098C0', lineHeight: '1.65', paddingTop: '6px', borderTop: '1px solid #2A2D3E' }}
        dangerouslySetInnerHTML={{ __html: hl(row.example, q) }} />
    </div>
  )
}

export default function IdiomsPage() {
  const [activeChapter, setActiveChapter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [focusMap, setFocusMap] = useState({})
  const { playingText, isPlayingAll, isLoop, speed, play, stop, playAll, setIsLoop, setSpeed } = useAudio()

  useEffect(() => { setFocusMap(loadFocus()) }, [])

  const q = searchQuery.toLowerCase()
  const filtered = activeChapter === 'all' ? iChapters : iChapters.filter(ch => ch.id === activeChapter)

  function handleToggleFocus(text) {
    setFocusMap(prev => toggleFocusItem(prev, text))
  }

  function handlePlayAll() {
    const phrases = filtered.flatMap(ch =>
      ch.sections?.flatMap(sec =>
        (sec.rows || []).filter(r => !q || r.chunk.toLowerCase().includes(q) || r.example.toLowerCase().includes(q) || r.meaning.toLowerCase().includes(q)).map(r => r.example)
      ) || []
    )
    playAll(phrases)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0F1117', color: '#E8EAF6', fontFamily: "'Noto Sans JP', sans-serif" }}>
      <NavBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <ChapterNav
        chapters={iChapters} activeChapter={activeChapter} onSelect={setActiveChapter}
        accent={ACCENT} labelFn={ch => `${ch.code} ${ch.titleJa.substring(0, 8)}`}
      />
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 200px)' }}>
        <Sidebar
          chapters={iChapters} activeChapter={activeChapter} onSelect={setActiveChapter}
          accent={ACCENT}
          labelFn={ch => `${ch.code} ${ch.titleJa}`}
          countFn={ch => ch.sections?.reduce((n, s) => n + (s.rows?.length || 0), 0) || 0}
        />
        <div style={{ flex: 1, padding: 'clamp(16px, 4vw, 32px)', paddingBottom: '100px', minWidth: 0 }}>
          {filtered.map((ch, ci) => {
            const anyMatch = ch.sections?.some(sec =>
              (sec.rows || []).some(r => !q || r.chunk.toLowerCase().includes(q) || r.example.toLowerCase().includes(q) || r.meaning.toLowerCase().includes(q))
            )
            if (q && !anyMatch) return null
            return (
              <div key={ch.id} style={{ marginBottom: '44px' }}>
                {/* Chapter header */}
                <div style={{ marginBottom: '22px', paddingBottom: '14px', borderBottom: '1px solid #2A2D3E' }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: ACCENT, background: 'rgba(124,255,212,.08)', border: '1px solid rgba(124,255,212,.2)', borderRadius: '4px', padding: '2px 8px' }}>{ch.code}</span>
                  </div>
                  <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '17px', fontWeight: 700, color: '#E8EAF6', marginBottom: '3px' }}>{ch.title}</div>
                  <div style={{ fontSize: '13px', color: '#9098C0', marginBottom: '6px' }}>{ch.titleJa}</div>
                  <div style={{ fontSize: '12px', color: '#565B78', lineHeight: '1.7' }}>{ch.desc}</div>
                </div>

                {ch.sections?.map((sec, si) => {
                  if (sec.isNuance) {
                    return (
                      <div key={si} style={{ marginBottom: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                          <span style={{ background: '#1E2030', border: '1px solid #363A50', borderRadius: '4px', padding: '2px 9px', fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#FFD97C' }}>{sec.tag}</span>
                          <span style={{ fontSize: '12px', fontWeight: 600, color: '#565B78' }}>{sec.title}</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {sec.nuanceRows.map((r, ri) => (
                            <div key={ri} style={{ background: '#161820', border: '1px solid #2A2D3E', borderLeft: '3px solid rgba(124,255,212,.3)', borderRadius: '8px', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: ACCENT, minWidth: '180px' }}>{r.chunk}</span>
                              <span style={{ color: '#363A50' }}>→</span>
                              <span style={{ fontSize: '13px', color: '#9098C0' }}>{r.nuance}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  }

                  const vr = (sec.rows || []).filter(r => !q || r.chunk.toLowerCase().includes(q) || r.example.toLowerCase().includes(q) || r.meaning.toLowerCase().includes(q))
                  if (q && vr.length === 0) return null
                  return (
                    <div key={si} style={{ marginBottom: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                        <span style={{ background: '#1E2030', border: '1px solid #363A50', borderRadius: '4px', padding: '2px 9px', fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#FFD97C' }}>{sec.tag}</span>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: '#565B78' }}>{sec.title}</span>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '10px' }}>
                        {vr.map((row, ri) => (
                          <ChunkCard key={ri} row={row} playing={playingText === row.example}
                            onPlay={play} focused={!!focusMap[row.example]} onToggle={handleToggleFocus} q={q} />
                        ))}
                      </div>
                      {sec.tip && <div style={{ borderLeft: `3px solid ${ACCENT}`, background: 'rgba(124,255,212,.04)', borderRadius: '0 8px 8px 0', padding: '9px 14px', marginTop: '10px', fontSize: '12px', color: '#9098C0', lineHeight: '1.7' }} dangerouslySetInnerHTML={{ __html: tipHtml(sec.tip) }} />}
                    </div>
                  )
                })}
                {ci < filtered.length - 1 && <hr style={{ border: 'none', borderTop: '1px solid #2A2D3E', margin: '36px 0' }} />}
              </div>
            )
          })}
        </div>
      </div>
      <AudioBar isPlayingAll={isPlayingAll} onTogglePlayAll={handlePlayAll} isLoop={isLoop}
        onToggleLoop={() => setIsLoop(v => !v)} speed={speed} onSpeedChange={setSpeed}
        playingText={playingText} onStop={stop} />
    </div>
  )
}
