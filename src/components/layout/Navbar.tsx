'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { href: '/algorithms', label: 'Explore', matchPrefix: '/algorithms' },
  { href: '#', label: 'Roadmap' },
  { href: '#', label: 'Community' },
  { href: '#', label: 'Docs' },
  { href: '#', label: 'Live' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: '12px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(180deg, rgba(17,19,23,0.95) 0%, rgba(17,19,23,0.75) 100%)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(243,223,192,0.06)',
      }}
    >
      {/* Left: Logo */}
      <Link
        href="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          textDecoration: 'none',
          flexShrink: 0,
        }}
      >
        {/* Waveform icon */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
          <rect x="2" y="8" width="3" height="8" rx="1.5" fill="#d7c4a6" opacity="0.7" />
          <rect x="7" y="4" width="3" height="16" rx="1.5" fill="#f3dfc0" />
          <rect x="12" y="6" width="3" height="12" rx="1.5" fill="#d7c4a6" opacity="0.85" />
          <rect x="17" y="9" width="3" height="6" rx="1.5" fill="#d7c4a6" opacity="0.6" />
        </svg>
        <span
          style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: '18px',
            fontWeight: 600,
            color: '#e2e2e8',
            letterSpacing: '-0.01em',
          }}
        >
          AlgoFlow
        </span>
      </Link>

      {/* Center: Nav pill */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '4px 6px',
          borderRadius: '9999px',
          border: '1px solid rgba(243,223,192,0.12)',
          background: 'rgba(30,32,36,0.6)',
        }}
        className="hidden md:flex"
      >
        {NAV_LINKS.map(link => {
          const isActive = link.matchPrefix
            ? pathname.startsWith(link.matchPrefix) || pathname.startsWith('/visualize')
            : false
          return (
            <Link
              key={link.label}
              href={link.href}
              style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: '13px',
                fontWeight: 500,
                color: isActive ? '#f3dfc0' : '#988f85',
                textDecoration: 'none',
                padding: '7px 18px',
                borderRadius: '9999px',
                background: isActive ? 'rgba(243,223,192,0.08)' : 'transparent',
                transition: 'all 0.25s ease',
              }}
            >
              {link.label}
            </Link>
          )
        })}
      </div>

      {/* Right: Button + Avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
        <Link
          href="/algorithms"
          style={{
            padding: '8px 22px',
            borderRadius: '9999px',
            background: 'linear-gradient(135deg, rgba(215,196,166,0.15) 0%, rgba(243,223,192,0.10) 100%)',
            border: '1px solid rgba(243,223,192,0.2)',
            color: '#f3dfc0',
            fontFamily: 'Sora, sans-serif',
            fontSize: '13px',
            fontWeight: 500,
            textDecoration: 'none',
            transition: 'all 0.25s ease',
            letterSpacing: '0.02em',
          }}
        >
          Start Coding
        </Link>

        <div
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            border: '1px solid rgba(243,223,192,0.15)',
            background: 'rgba(40,42,46,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span className="material-symbols-outlined" style={{ color: '#988f85', fontSize: '18px' }}>person</span>
        </div>
      </div>
    </div>
  )
}
