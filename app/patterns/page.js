'use client'
import { useState, useEffect } from 'react'
import NavBar from '@/components/NavBar'
import AudioBar from '@/components/AudioBar'
import { ChapterNav, Sidebar } from '@/components/ChapterNav'
import { pChapters } from '@/lib/pData'
import { useAudio } from '@/lib/useAudio'
import { loadFocus, toggleFocusItem } from '@/lib/focus'

const ACCENT = '#7C83FF'

function hl(text, q, color = '#B0B8FF', bg = 'rgba(124,131,255,.3)') {
  if (!q) return text
  return text.replace(new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'),
    m => `<mark style="background:${bg};color:${color};border-radius:2px">${m}</mark>`)
}

function PhraseCard({ text, playing, onPlay, focused, onToggle, q }) {
  return (
    <div onClick={() => onPlay(text)} style={{
      background: playing ? 'rgba(124,131,255,.07)' : '#161820',
      border: '1px solid #2A2D3E',
      borderLeft: `3px solid ${playing ? ACCENT : '#363A50'}`,
      borderRadius: '8px', padding: '10px 12px', marginBottom: '6px',
      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', transition: 'all .15s',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderLeftColor = ACCENT; e.currentTarget.style.background = 'rgba(255,255,255,.03)' }}
      onMouseLeave={e => { e.currentTarget.style.borderLeftColor = playing ? ACCENT : '#363A50'; e.currentTarget.style.background = playing ? 'rgba(124,131,255,.07)' : '#161820' }}
    >
      <div style={{ fontSize: '14px', lineHeight: '1.6', flex: 1 }} dangerouslySetInnerHTML={{ __html: hl(text, q) }} />
      <div style={{ display: 'flex', gap: '5px', flexShrink: 0 }}>
        <Btn onClick={e => { e.stopPropagation(); navigator.clipboard?.writeText(text) }} title="コピー">⎘</Btn>
        <StarBtn focused={focused} onClick={e => { e.stopPropagation(); onToggle(text) }} />
      </div>
    </div>
  )
}

function Btn({ onClick, title, children, style = {} }) {
  return (
    <button onClick={onClick} title={title} style={{
      background: '#1E2030', border: '1px solid #363A50', borderRadius: '5px',
      padding: '3px 7px', fontSize: '11px', color: '#565B78', cursor: 'pointer', ...style,
    }}>{children}</button>
  )
}

function StarBtn({ focused, onClick }) {
  return (
    <button onClick={onClick} title={focused ? 'フォーカスリストから外す' : 'フォーカスリストに追加'} style={{
      background: focused ? 'rgba(255,215,100,.12)' : '#1E2030',
      border: `1px solid ${focused ? '#FFD97C' : '#363A50'}`,
      borderRadius: '5px', padding: '3px 7px', fontSize: '12px',
      color: focused ? '#FFD97C' : '#565B78', cursor: 'pointer',
    }}>★</button>
  )
}

function tipHtml(tip) {
  return tip.replace(/`([^`]+)`/g, '<code style="font-family:JetBrains Mono,monospace;font-size:11px;background:#1E2030;padding:1px 5px;border-radius:3px;color:#7CFFD4">$1</code>')
}

export default function PatternsPage() {
  const [activeChapter, setActiveChapter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [focusMap, setFocusMap] = useState({})
  const { playingText, isPlayingAll, isLoop, speed, play, stop, playAll, setIsLoop, setSpeed } = useAudio()

  useEffect(() => { setFocusMap(loadFocus()) }, [])

  const q = searchQuery.toLowerCase()
  const filtered = activeChapter === 'all' ? pChapters : pChapters.filter(ch => ch.id === activeChapter)

  function handleToggleFocus(text) {
    setFocusMap(prev => toggleFocusItem(prev, text))
  }

  function handlePlayAll() {
    const phrases = filtered.flatMap(ch =>
      ch.sections?.flatMap(sec => [
        ...(sec.phrases || []).filter(p => !q || p.toLowerCase().includes(q)),
        ...((sec.compare || []).filter(c => !q || c.phrase.toLowerCase().includes(q)).map(c => c.phrase)),
      ]) || []
    )
    playAll(phrases)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0F1117', color: '#E8EAF6', fontFamily: "'Noto Sans JP', sans-serif" }}>
      <NavBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <ChapterNav
        chapters={pChapters} activeChapter={activeChapter} onSelect={setActiveChapter}
        accent={ACCENT} labelFn={ch => `${ch.code} ${ch.chunk.substring(0, 10)}`}
      />
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 200px)' }}>
        <Sidebar
          chapters={pChapters} activeChapter={activeChapter} onSelect={setActiveChapter}
          accent={ACCENT}
          labelFn={ch => `${ch.code} ${ch.title}`}
          countFn={ch => ch.sections?.reduce((n, s) => n + (s.phrases?.length || 0), 0) || 0}
        />
        <div style={{ flex: 1, padding: '28px 32px', paddingBottom: '100px', minWidth: 0 }}>
          {filtered.map((ch, ci) => {
            const anyMatch = ch.sections?.some(sec =>
              (sec.phrases || []).some(p => !q || p.toLowerCase().includes(q)) ||
              (sec.compare || []).some(c => !q || c.phrase.toLowerCase().includes(q))
            )
            if (q && !anyMatch) return null
            return (
              <div key={ch.id} style={{ marginBottom: '44px' }}>
                {/* Chapter header */}
                <div style={{ marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid #2A2D3E' }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: ACCENT, background: 'rgba(124,131,255,.08)', border: '1px solid rgba(124,131,255,.2)', borderRadius: '4px', padding: '2px 8px' }}>{ch.code}</span>
                    <span style={{ fontSize: '11px', color: '#565B78' }}>{ch.level}</span>
                  </div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '16px', color: ACCENT, marginBottom: '3px' }}>{ch.chunk}</div>
                  <div style={{ fontSize: '13px', color: '#9098C0', marginBottom: '6px' }}>{ch.title}</div>
                  <div style={{ fontSize: '12px', color: '#565B78', lineHeight: '1.7' }}>{ch.desc}</div>
                </div>

                {ch.sections?.map((sec, si) => {
                  const vp = (sec.phrases || []).filter(p => !q || p.toLowerCase().includes(q))
                  const vc = (sec.compare || []).filter(c => !q || c.phrase.toLowerCase().includes(q))
                  if (q && vp.length === 0 && vc.length === 0) return null
                  return (
                    <div key={si} style={{ marginBottom: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                        <span style={{ background: '#1E2030', border: '1px solid #363A50', borderRadius: '4px', padding: '2px 9px', fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#FFD97C' }}>{sec.tag}</span>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: '#9098C0' }}>{sec.title}</span>
                      </div>
                      {sec.pattern && (
                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#565B78', marginBottom: '10px', padding: '6px 12px', background: '#1E2030', borderRadius: '6px' }}>
                          {'> '}{sec.pattern}
                        </div>
                      )}
                      {sec.isCompare ? (
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                          {vc.map((c, i) => (
                            <div key={i} style={{ flex: '1 1 200px', background: '#161820', border: '1px solid #2A2D3E', borderRadius: '8px', padding: '12px 14px' }}>
                              <div onClick={() => play(c.phrase)} style={{ fontSize: '14px', color: '#E8EAF6', marginBottom: '5px', cursor: 'pointer' }}
                                dangerouslySetInnerHTML={{ __html: hl(c.phrase, q) }} />
                              <div style={{ fontSize: '12px', color: '#9098C0' }}>{c.desc}</div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        vp.map((phrase, pi) => (
                          <PhraseCard key={pi} text={phrase} playing={playingText === phrase}
                            onPlay={play} focused={!!focusMap[phrase]} onToggle={handleToggleFocus} q={q} />
                        ))
                      )}
                      {sec.tip && <div style={{ borderLeft: `3px solid ${ACCENT}`, background: 'rgba(124,131,255,.05)', borderRadius: '0 8px 8px 0', padding: '9px 14px', marginTop: '10px', fontSize: '12px', color: '#9098C0', lineHeight: '1.7' }} dangerouslySetInnerHTML={{ __html: tipHtml(sec.tip) }} />}
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
