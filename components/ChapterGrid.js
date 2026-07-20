'use client'

export default function ChapterGrid({ chapters, type, accent, onSelect, onShowAll }) {
  return (
    <div style={{ padding: 'clamp(16px, 4vw, 32px)', paddingBottom: '100px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '18px', fontWeight: 700, color: '#E8EAF6', marginBottom: '4px' }}>
            {type === 'p' ? '構文パターンを選ぶ' : 'イディオムチャンクを選ぶ'}
          </div>
          <div style={{ fontSize: '12px', color: '#565B78' }}>
            気になる章をタップして学習を始めましょう
          </div>
        </div>
        <button onClick={onShowAll} style={{
          background: '#1E2030', border: '1px solid #363A50', borderRadius: '7px',
          padding: '8px 16px', fontSize: '12px', color: '#9098C0', cursor: 'pointer',
          fontFamily: 'Sora, sans-serif', whiteSpace: 'nowrap',
        }}>
          全{chapters.length}章をまとめて表示
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
        {chapters.map(ch => {
          const count = ch.sections?.reduce((n, s) => n + (s.phrases?.length || 0) + (s.rows?.length || 0) + (s.compare?.length || 0), 0) || 0
          const title = type === 'p' ? ch.title : (ch.titleJa || ch.title)
          const sub = type === 'p' ? ch.chunk : ch.title

          return (
            <div
              key={ch.id}
              onClick={() => onSelect(ch.id)}
              style={{
                background: '#161820', border: '1px solid #2A2D3E', borderRadius: '12px',
                padding: '16px', cursor: 'pointer', transition: 'all .15s',
                display: 'flex', flexDirection: 'column', gap: '8px',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.background = 'rgba(255,255,255,.02)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#2A2D3E'; e.currentTarget.style.background = '#161820' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: accent, background: `${accent}14`, border: `1px solid ${accent}33`, borderRadius: '4px', padding: '2px 8px' }}>{ch.code}</span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#565B78', background: '#1E2030', borderRadius: '4px', padding: '1px 6px' }}>{count}</span>
              </div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#E8EAF6', lineHeight: '1.4' }}>{title}</div>
              {sub && sub !== title && (
                <div style={{ fontFamily: type === 'p' ? 'JetBrains Mono, monospace' : 'inherit', fontSize: '12px', color: accent, opacity: .85 }}>{sub}</div>
              )}
              <div style={{
                fontSize: '11px', color: '#565B78', lineHeight: '1.6',
                overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
              }}>{ch.desc}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
