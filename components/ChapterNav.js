'use client'
import { useState, useEffect } from 'react'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return isMobile
}

// ---- ChapterNav ----
export function ChapterNav({ chapters, activeChapter, onSelect, accent = '#7C83FF', labelFn }) {
  const isMobile = useIsMobile()

  return (
    <div style={{ background: '#161820', borderBottom: '1px solid #2A2D3E', padding: '8px 12px', display: 'flex', gap: '6px', overflowX: 'auto', scrollbarWidth: 'none' }}>
      <NavBtn label={isMobile ? '🏠' : 'ホーム'} active={activeChapter === null} onClick={() => onSelect(null)} accent={accent} />
      <NavBtn label="ALL" active={activeChapter === 'all'} onClick={() => onSelect('all')} accent={accent} />
      {chapters.map(ch => (
        <NavBtn key={ch.id} label={isMobile ? ch.code : labelFn(ch)} active={activeChapter === ch.id} onClick={() => onSelect(ch.id)} accent={accent} />
      ))}
    </div>
  )
}

function NavBtn({ label, active, onClick, accent }) {
  return (
    <button onClick={onClick} style={{
      padding: '5px 11px', fontSize: '12px',
      background: active ? accent : 'transparent',
      color: active ? (accent === '#7CFFD4' ? '#0F1117' : '#fff') : '#9098C0',
      border: `1px solid ${active ? 'transparent' : '#363A50'}`,
      borderRadius: '20px', cursor: 'pointer',
      fontFamily: 'Sora, sans-serif', whiteSpace: 'nowrap', transition: 'all .15s',
    }}>{label}</button>
  )
}

// ---- Sidebar: PC は固定表示、スマホはドロワー ----
export function Sidebar({ chapters, activeChapter, onSelect, accent = '#7C83FF', labelFn, countFn }) {
  const isMobile = useIsMobile()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const total = chapters.reduce((n, ch) => n + countFn(ch), 0)

  const items = [
    { id: null, label: 'ホーム', count: null },
    { id: 'all', label: 'ALL', count: total },
    ...chapters.map(ch => ({ id: ch.id, label: labelFn(ch), count: countFn(ch) }))
  ]

  const handleSelect = (id) => {
    onSelect(id)
    setDrawerOpen(false)
  }

  const SidebarContent = () => (
    <>
      <div style={{ fontSize: '10px', color: '#565B78', fontWeight: 600, letterSpacing: '.09em', textTransform: 'uppercase', marginBottom: '8px', padding: '0 6px' }}>Chapters</div>
      {items.map(item => (
        <div key={item.id ?? 'home'} onClick={() => handleSelect(item.id)} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '8px 10px', borderRadius: '7px', cursor: 'pointer', marginBottom: '2px',
          background: activeChapter === item.id
            ? `rgba(${accent === '#7CFFD4' ? '124,255,212' : '124,131,255'},.12)`
            : 'transparent',
          transition: 'background .12s',
        }}>
          <span style={{
            fontSize: '13px',
            color: activeChapter === item.id ? (accent === '#7CFFD4' ? accent : accent) : '#9098C0',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            fontWeight: activeChapter === item.id ? 600 : 400,
          }}>{item.label}</span>
          {item.count !== null && (
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#565B78', background: '#1E2030', borderRadius: '4px', padding: '1px 5px', flexShrink: 0, marginLeft: '6px' }}>{item.count}</span>
          )}
        </div>
      ))}
    </>
  )

  if (!isMobile) {
    // PC: 固定サイドバー
    return (
      <div style={{
        width: '240px', flexShrink: 0, background: '#161820',
        borderRight: '1px solid #2A2D3E', padding: '14px 10px',
        position: 'sticky', top: '148px', height: 'calc(100vh - 148px)', overflowY: 'auto',
      }}>
        <SidebarContent />
      </div>
    )
  }

  // スマホ: ドロワー
  return (
    <>
      {/* ハンバーガーボタン（画面右下に浮かぶ） */}
      <button
        onClick={() => setDrawerOpen(true)}
        style={{
          position: 'fixed', bottom: '70px', right: '16px', zIndex: 300,
          width: '44px', height: '44px', borderRadius: '50%',
          background: accent, border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,.5)',
          fontSize: '18px',
        }}
      >
        <span style={{ color: accent === '#7CFFD4' ? '#0F1117' : '#fff', lineHeight: 1 }}>☰</span>
      </button>

      {/* オーバーレイ */}
      {drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 400,
            background: 'rgba(0,0,0,.6)',
            animation: 'fadeIn .2s ease',
          }}
        />
      )}

      {/* ドロワー本体 */}
      <div style={{
        position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 500,
        width: '280px', maxWidth: '85vw',
        background: '#161820', borderRight: '1px solid #2A2D3E',
        padding: '0', overflowY: 'auto',
        transform: drawerOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform .25s cubic-bezier(.4,0,.2,1)',
        boxShadow: drawerOpen ? '4px 0 24px rgba(0,0,0,.5)' : 'none',
      }}>
        {/* ドロワーヘッダー */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 16px 12px',
          borderBottom: '1px solid #2A2D3E',
          position: 'sticky', top: 0, background: '#161820', zIndex: 1,
        }}>
          <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '13px', fontWeight: 600, color: accent }}>Chapters</span>
          <button
            onClick={() => setDrawerOpen(false)}
            style={{ background: '#1E2030', border: '1px solid #363A50', borderRadius: '6px', padding: '4px 10px', fontSize: '14px', color: '#9098C0', cursor: 'pointer' }}
          >✕</button>
        </div>
        <div style={{ padding: '10px 10px' }}>
          <SidebarContent />
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
      `}</style>
    </>
  )
}
