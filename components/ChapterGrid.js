'use client'
import { timeAgoLabel } from '@/lib/progress'

function chapterTexts(ch) {
  const texts = []
  ch.sections?.forEach(s => {
    ;(s.phrases || []).forEach(p => texts.push(p))
    ;(s.compare || []).forEach(c => texts.push(c.phrase))
    ;(s.rows || []).forEach(r => texts.push(r.example))
  })
  return texts
}

export default function ChapterGrid({ chapters, type, accent, onSelect, onShowAll, focusMap = {}, visits = {}, lastChapterId = null }) {
  const lastChapter = lastChapterId ? chapters.find(ch => ch.id === lastChapterId) : null

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

      {/* 前回の続き */}
      {lastChapter && (
        <div
          onClick={() => onSelect(lastChapter.id)}
          style={{
            display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap',
            background: `${accent}0D`, border: `1px solid ${accent}44`, borderRadius: '12px',
            padding: '14px 16px', marginBottom: '20px', cursor: 'pointer', transition: 'all .15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = accent }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = `${accent}44` }}
        >
          <span style={{ fontSize: '11px', color: accent, fontFamily: 'Sora, sans-serif', fontWeight: 600, whiteSpace: 'nowrap' }}>▶ 前回の続き</span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: accent, background: `${accent}14`, border: `1px solid ${accent}33`, borderRadius: '4px', padding: '2px 8px' }}>{lastChapter.code}</span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#E8EAF6' }}>
            {type === 'p' ? lastChapter.title : (lastChapter.titleJa || lastChapter.title)}
          </span>
          {visits[lastChapter.id] && (
            <span style={{ fontSize: '11px', color: '#565B78', marginLeft: 'auto' }}>{timeAgoLabel(visits[lastChapter.id])}</span>
          )}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
        {chapters.map(ch => {
          const texts = chapterTexts(ch)
          const count = texts.length
          const starCount = texts.filter(t => focusMap[t]).length
          const visitedLabel = timeAgoLabel(visits[ch.id])
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

              {/* 学習状況フッター */}
              {(starCount > 0 || visitedLabel) && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid #2A2D3E' }}>
                  {starCount > 0 && (
                    <span style={{ fontSize: '11px', color: '#FFD97C', background: 'rgba(255,215,100,.1)', border: '1px solid rgba(255,215,100,.25)', borderRadius: '4px', padding: '1px 7px' }}>★ {starCount}</span>
                  )}
                  {visitedLabel && (
                    <span style={{ fontSize: '10px', color: '#565B78', marginLeft: 'auto' }}>{visitedLabel}</span>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
