'use client'

export default function AudioBar({ isPlayingAll, onTogglePlayAll, isLoop, onToggleLoop, speed, onSpeedChange, playingText, onStop }) {
  const speeds = [0.7, 0.85, 1.0, 1.2, 1.5]
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200,
      background: '#161820', borderTop: '1px solid #2A2D3E',
      padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '10px'
    }}>
      <button onClick={onTogglePlayAll} style={{
        background: isPlayingAll ? '#7C83FF' : '#1E2030',
        border: `1px solid ${isPlayingAll ? '#7C83FF' : '#363A50'}`,
        borderRadius: '7px', padding: '6px 14px', fontSize: '12px',
        color: isPlayingAll ? '#fff' : '#9098C0', cursor: 'pointer',
        whiteSpace: 'nowrap', fontFamily: 'Sora, sans-serif',
      }}>
        {isPlayingAll ? '■ 停止' : '▶ 全再生'}
      </button>
      <button onClick={onToggleLoop} style={{
        background: isLoop ? 'rgba(124,131,255,.15)' : '#1E2030',
        border: `1px solid ${isLoop ? '#7C83FF' : '#363A50'}`,
        borderRadius: '7px', padding: '6px 14px', fontSize: '12px',
        color: isLoop ? '#7C83FF' : '#9098C0', cursor: 'pointer',
        fontFamily: 'Sora, sans-serif',
      }}>↩ ループ</button>
      <select value={speed} onChange={e => onSpeedChange(parseFloat(e.target.value))} style={{
        background: '#1E2030', border: '1px solid #363A50', borderRadius: '7px',
        padding: '6px 10px', fontSize: '11px', color: '#9098C0', cursor: 'pointer',
        fontFamily: 'JetBrains Mono, monospace',
      }}>
        {speeds.map(s => <option key={s} value={s}>{s}×</option>)}
      </select>
      <div style={{
        flex: 1, fontSize: '12px',
        color: playingText ? '#9098C0' : '#565B78',
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        fontFamily: 'JetBrains Mono, monospace',
      }}>
        {playingText || '再生待機中...'}
      </div>
      {playingText && (
        <button onClick={onStop} style={{
          background: '#1E2030', border: '1px solid #363A50', borderRadius: '7px',
          padding: '6px 14px', fontSize: '12px', color: '#9098C0', cursor: 'pointer',
        }}>■ 停止</button>
      )}
    </div>
  )
}
