'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { href: '/algorithms', label: 'Visualize', matchPrefix: '/algorithms' },
  { href: '#', label: 'Roadmap' },
  { href: '#', label: 'Community' },
  { href: '#', label: 'Docs' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, padding: '10px 24px 0' }}>
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 32px',
          background: 'rgba(17, 19, 23, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {/* Left: Logo */}
        <Link
          href="/"
          style={{
            color: '#f3dfc0',
            fontFamily: 'Sora, sans-serif',
            fontSize: '20px',
            fontWeight: 700,
            letterSpacing: '-0.01em',
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          AlgoFlow
        </Link>

        {/* Center: Nav Links */}
        <div style={{ display: 'flex', gap: '32px', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }} className="hidden md:flex">
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
                  fontSize: '16px',
                  fontWeight: 600,
                  color: isActive ? '#f3dfc0' : '#cfc5b9',
                  textDecoration: 'none',
                  borderBottom: isActive ? '2px solid #f3dfc0' : '2px solid transparent',
                  paddingBottom: '4px',
                  transition: 'color 0.3s',
                }}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* Right: Icons + Button + Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: '8px', color: '#f3dfc0' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px', cursor: 'pointer' }}>terminal</span>
            <span className="material-symbols-outlined" style={{ fontSize: '20px', cursor: 'pointer' }}>notifications</span>
          </div>

          <Link
            href="/algorithms"
            style={{
              background: '#f3dfc0',
              color: '#3a2f1a',
              padding: '8px 20px',
              borderRadius: '10px',
              fontFamily: 'Hanken Grotesk, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            Start Coding
          </Link>

          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: '1px solid #4c463d',
              background: '#282a2e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span className="material-symbols-outlined" style={{ color: '#cfc5b9', fontSize: '18px' }}>person</span>
          </div>
        </div>
      </nav>
    </div>
  )
}
