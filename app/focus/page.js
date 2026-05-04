'use client'
import { useState, useEffect } from 'react'
import NavBar from '@/components/NavBar'
import AudioBar from '@/components/AudioBar'
import { pChapters } from '@/lib/pData'
import { iChapters } from '@/lib/iData'
import { useAudio } from '@/lib/useAudio'
import { loadFocus, toggleFocusItem } from '@/lib/focus'

function getAllEntries() {
  const result = []
  pChapters.forEach(ch => {
    ch.sections?.forEach(sec => {
      ;(sec.phrases || []).forEach(p => result.push({ text: p, code: ch.code, type: 'p', chunk: null, meaning: null }))
      ;(sec.compare || []).forEach(c => result.push({ text: c.phrase, code: ch.code, type: 'p', chunk: null, meaning: c.desc }))
    })
  })
  iChapters.forEach(ch => {
    ch.sections?.forEach(sec => {
      ;(sec.rows || []).forEach(r => result.push({ text: r.example, code: ch.code, type: 'i', chunk: r.chunk, meaning: r.meaning }))
    })
  })
  return result
}

export default function FocusPage() {
  const [focusMap, setFocusMap] = useState({})
  const { playingText, isPlayingAll, isLoop, speed, play, stop, playAll, setIsLoop, setSpeed } = useAudio()

  useEffect(() => { setFocusMap(loadFocus()) }, [])

  function handleToggle(text) {
    setFocusMap(prev => toggleFocusItem(prev, text))
  }

  const allEntries = getAllEntries()
  const focused = allEntries.filter(e => focusMap[e.text])

  function handlePlayAll() {
    playAll(focused.map(e => e.text))
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0F1117', color: '#E8EAF6', fontFamily: "'Noto Sans JP', sans-serif" }}>
      <NavBar searchDisabled />

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 28px', paddingBottom: '100px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: '20px', fontWeight: 700, color: '#FFD97C', marginBottom: '4px' }}>
              ★ フォーカスリスト
            </h1>
            <p style={{ fontSize: '12px', color: '#565B78', lineHeight: '1.6' }}>
              フレーズの ★ をクリックして追加。ここで集中的に練習できます。
            </p>
          </div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: '#9098C0', background: '#1E2030', border: '1px solid #363A50', borderRadius: '6px', padding: '6px 12px' }}>
            {focused.length} phrases
          </div>
        </div>

        {focused.length === 0 ? (
          <div style={{ padding: '80px 20px', textAlign: 'center', color: '#565B78', fontSize: '13px', lineHeight: '2.2' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px', opacity: .3 }}>★</div>
            <div>構文パターン・イディオムチャンクページで<br />フレーズの ★ をクリックして追加してください</div>
          </div>
        ) : (
          <>
            {/* Group by code */}
            {Array.from(new Set(focused.map(e => e.code))).map(code => {
              const items = focused.filter(e => e.code === code)
              const type = items[0].type
              const accent = type === 'i' ? '#7CFFD4' : '#7C83FF'
              return (
                <div key={code} style={{ marginBottom: '28px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: accent, background: type === 'i' ? 'rgba(124,255,212,.08)' : 'rgba(124,131,255,.08)', border: `1px solid ${type === 'i' ? 'rgba(124,255,212,.2)' : 'rgba(124,131,255,.2)'}`, borderRadius: '4px', padding: '2px 8px' }}>{code}</span>
                    <span style={{ fontSize: '11px', color: '#565B78' }}>{type === 'i' ? 'Idiom' : 'Pattern'}</span>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#565B78', marginLeft: 'auto' }}>{items.length} phrases</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {items.map((entry, i) => (
                      <div key={i} style={{
                        background: playingText === entry.text ? (type === 'i' ? 'rgba(124,255,212,.06)' : 'rgba(124,131,255,.07)') : '#161820',
                        border: '1px solid #2A2D3E',
                        borderLeft: `3px solid ${playingText === entry.text ? accent : 'rgba(255,215,100,.3)'}`,
                        borderRadius: '8px', padding: '12px 14px',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px',
                      }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          {entry.chunk && (
                            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: accent, marginBottom: '4px' }}>{entry.chunk}</div>
                          )}
                          <div onClick={() => play(entry.text)} style={{ fontSize: '13px', color: '#E8EAF6', lineHeight: '1.6', cursor: 'pointer' }}>
                            {entry.text}
                          </div>
                          {entry.meaning && (
                            <div style={{ fontSize: '11px', color: '#565B78', marginTop: '4px' }}>{entry.meaning}</div>
                          )}
                        </div>
                        <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                          <button onClick={() => play(entry.text)} style={{ background: '#1E2030', border: '1px solid #363A50', borderRadius: '5px', padding: '4px 8px', fontSize: '11px', color: '#565B78', cursor: 'pointer' }}>▶</button>
                          <button onClick={() => navigator.clipboard?.writeText(entry.text)} style={{ background: '#1E2030', border: '1px solid #363A50', borderRadius: '5px', padding: '4px 7px', fontSize: '11px', color: '#565B78', cursor: 'pointer' }}>⎘</button>
                          <button onClick={() => handleToggle(entry.text)} title="リストから外す"
                            style={{ background: 'rgba(255,215,100,.12)', border: '1px solid #FFD97C', borderRadius: '5px', padding: '4px 7px', fontSize: '12px', color: '#FFD97C', cursor: 'pointer' }}>★</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </>
        )}
      </div>

      <AudioBar isPlayingAll={isPlayingAll} onTogglePlayAll={handlePlayAll} isLoop={isLoop}
        onToggleLoop={() => setIsLoop(v => !v)} speed={speed} onSpeedChange={setSpeed}
        playingText={playingText} onStop={stop} />
    </div>
  )
}
