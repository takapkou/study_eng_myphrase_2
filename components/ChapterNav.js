'use client'

export function ChapterNav({ chapters, activeChapter, onSelect, accent = '#7C83FF', labelFn }) {
  return (
    <div style={{ background: '#161820', borderBottom: '1px solid #2A2D3E', padding: '8px 20px', display: 'flex', gap: '6px', overflowX: 'auto', scrollbarWidth: 'none' }}>
      <NavBtn label="ALL" active={activeChapter === 'all'} onClick={() => onSelect('all')} accent={accent} />
      {chapters.map(ch => (
        <NavBtn key={ch.id} label={labelFn(ch)} active={activeChapter === ch.id} onClick={() => onSelect(ch.id)} accent={accent} />
      ))}
    </div>
  )
}

function NavBtn({ label, active, onClick, accent }) {
  return (
    <button onClick={onClick} style={{
      padding: '5px 13px', fontSize: '12px',
      background: active ? accent : 'transparent',
      color: active ? (accent === '#7CFFD4' ? '#0F1117' : '#fff') : '#9098C0',
      border: `1px solid ${active ? 'transparent' : '#363A50'}`,
      borderRadius: '20px', cursor: 'pointer',
      fontFamily: 'Sora, sans-serif', whiteSpace: 'nowrap', transition: 'all .15s',
    }}>{label}</button>
  )
}

export function Sidebar({ chapters, activeChapter, onSelect, accent = '#7C83FF', labelFn, countFn }) {
  const total = chapters.reduce((n, ch) => n + countFn(ch), 0)
  return (
    <div style={{
      width: '240px', flexShrink: 0, background: '#161820',
      borderRight: '1px solid #2A2D3E', padding: '14px 10px',
      position: 'sticky', top: '148px', height: 'calc(100vh - 148px)', overflowY: 'auto',
    }}>
      <div style={{ fontSize: '10px', color: '#565B78', fontWeight: 600, letterSpacing: '.09em', textTransform: 'uppercase', marginBottom: '8px', padding: '0 6px' }}>Chapters</div>
      {[{ id: 'all', label: 'ALL', count: total }, ...chapters.map(ch => ({ id: ch.id, label: labelFn(ch), count: countFn(ch) }))].map(item => (
        <div key={item.id} onClick={() => onSelect(item.id)} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '6px 10px', borderRadius: '7px', cursor: 'pointer', marginBottom: '1px',
          background: activeChapter === item.id ? `rgba(${accent === '#7CFFD4' ? '124,255,212' : '124,131,255'},.1)` : 'transparent',
        }}>
          <span style={{ fontSize: '12px', color: '#9098C0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.label}</span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#565B78', background: '#1E2030', borderRadius: '4px', padding: '1px 5px', flexShrink: 0, marginLeft: '6px' }}>{item.count}</span>
        </div>
      ))}
    </div>
  )
}
