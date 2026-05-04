'use client'
import { useState, useEffect } from 'react'

export default function AudioBar({ isPlayingAll, onTogglePlayAll, isLoop, onToggleLoop, speed, onSpeedChange, playingText, onStop }) {
  const speeds = [0.7, 0.85, 1.0, 1.2, 1.5]
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200,
      background: '#161820', borderTop: '1px solid #2A2D3E',
      padding: isMobile ? '8px 12px' : '10px 20px',
      display: 'flex', alignItems: 'center', gap: isMobile ? '6px' : '10px',
    }}>
      <button onClick={onTogglePlayAll} style={{
        background: isPlayingAll ? '#7C83FF' : '#1E2030',
        border: `1px solid ${isPlayingAll ? '#7C83FF' : '#363A50'}`,
        borderRadius: '7px',
        padding: isMobile ? '7px 10px' : '6px 14px',
        fontSize: isMobile ? '13px' : '12px',
        color: isPlayingAll ? '#fff' : '#9098C0', cursor: 'pointer',
        whiteSpace: 'nowrap', fontFamily: 'Sora, sans-serif',
      }}>
        {isPlayingAll ? '■' : '▶'}
        {!isMobile && (isPlayingAll ? ' 停止' : ' 全再生')}
      </button>
      <button onClick={onToggleLoop} style={{
        background: isLoop ? 'rgba(124,131,255,.15)' : '#1E2030',
        border: `1px solid ${isLoop ? '#7C83FF' : '#363A50'}`,
        borderRadius: '7px',
        padding: isMobile ? '7px 10px' : '6px 14px',
        fontSize: '13px',
        color: isLoop ? '#7C83FF' : '#9098C0', cursor: 'pointer',
        fontFamily: 'Sora, sans-serif',
      }}>↩{!isMobile && ' ループ'}</button>
      <select value={speed} onChange={e => onSpeedChange(parseFloat(e.target.value))} style={{
        background: '#1E2030', border: '1px solid #363A50', borderRadius: '7px',
        padding: isMobile ? '7px 6px' : '6px 10px',
        fontSize: '11px', color: '#9098C0', cursor: 'pointer',
        fontFamily: 'JetBrains Mono, monospace',
      }}>
        {speeds.map(s => <option key={s} value={s}>{s}×</option>)}
      </select>
      <div style={{
        flex: 1, fontSize: isMobile ? '11px' : '12px',
        color: playingText ? '#9098C0' : '#565B78',
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        fontFamily: 'JetBrains Mono, monospace',
        minWidth: 0,
      }}>
        {playingText || (isMobile ? '待機中...' : '再生待機中...')}
      </div>
      {playingText && (
        <button onClick={onStop} style={{
          background: '#1E2030', border: '1px solid #363A50', borderRadius: '7px',
          padding: isMobile ? '7px 10px' : '6px 14px',
          fontSize: '13px', color: '#9098C0', cursor: 'pointer', flexShrink: 0,
        }}>■</button>
      )}
    </div>
  )
}

