'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const FOCUS_KEY = 'eng_focus_list'

export default function NavBar({ searchQuery, onSearchChange, searchDisabled }) {
  const pathname = usePathname()
  const [focusCount, setFocusCount] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const update = () => {
      try {
        const data = JSON.parse(localStorage.getItem(FOCUS_KEY) || '{}')
        setFocusCount(Object.keys(data).length)
      } catch {}
    }
    update()
    window.addEventListener('focus-updated', update)
    return () => window.removeEventListener('focus-updated', update)
  }, [])

  const tabs = [
    { href: '/patterns', label: isMobile ? 'Pattern' : '構文パターン', sub: 'P01〜P15', accent: '#7C83FF' },
    { href: '/idioms',   label: isMobile ? 'Idiom' : 'イディオムチャンク', sub: 'I01〜I15', accent: '#7CFFD4' },
    { href: '/focus',    label: isMobile ? `★${focusCount > 0 ? focusCount : ''}` : '★ フォーカス', sub: isMobile ? '' : `${focusCount}件`, accent: '#FFD97C' },
  ]

  const activeAccent = tabs.find(t => pathname.startsWith(t.href))?.accent || '#7C83FF'

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      {/* Top bar */}
      <div style={{
        background: '#161820', borderBottom: '1px solid #2A2D3E',
        padding: isMobile ? '8px 12px' : '10px 20px',
        display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '14px'
      }}>
        {!isMobile && (
          <Link href="/patterns" style={{ textDecoration: 'none' }}>
            <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '15px', color: activeAccent, whiteSpace: 'nowrap' }}>
              英語フレーズ<span style={{ color: '#9098C0', fontWeight: 400, fontSize: '12px', marginLeft: '6px' }}>04 Reference</span>
            </div>
          </Link>
        )}
        <div style={{ position: 'relative', flex: 1 }}>
          <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#565B78', fontSize: '13px', pointerEvents: 'none' }}>🔍</span>
          <input
            type="text"
            placeholder="フレーズを検索..."
            value={searchQuery || ''}
            onChange={e => onSearchChange?.(e.target.value)}
            disabled={searchDisabled}
            style={{
              width: '100%', background: '#1E2030', border: '1px solid #363A50',
              borderRadius: '8px',
              padding: isMobile ? '8px 12px 8px 32px' : '8px 14px 8px 36px',
              color: '#E8EAF6', fontSize: '14px', outline: 'none', fontFamily: 'inherit',
              opacity: searchDisabled ? 0.5 : 1,
            }}
          />
        </div>
        {!isMobile && focusCount > 0 && (
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#9098C0', background: '#1E2030', border: '1px solid #363A50', borderRadius: '6px', padding: '4px 10px', whiteSpace: 'nowrap' }}>
            ★{focusCount}
          </div>
        )}
      </div>

      {/* Tab bar */}
      <div style={{
        background: '#161820', borderBottom: '1px solid #2A2D3E',
        padding: '0', display: 'flex',
      }}>
        {tabs.map(t => {
          const active = pathname.startsWith(t.href)
          return (
            <Link key={t.href} href={t.href} style={{ textDecoration: 'none', flex: isMobile ? 1 : 'none' }}>
              <div style={{
                padding: isMobile ? '10px 4px' : '12px 20px',
                fontSize: isMobile ? '13px' : '13px',
                fontFamily: 'Sora, sans-serif', cursor: 'pointer',
                borderBottom: `2px solid ${active ? t.accent : 'transparent'}`,
                color: active ? t.accent : '#565B78',
                whiteSpace: 'nowrap', transition: 'all .15s',
                textAlign: 'center',
              }}>
                {t.label}
                {!isMobile && t.sub && (
                  <span style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', opacity: .7, marginLeft: '6px' }}>{t.sub}</span>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

