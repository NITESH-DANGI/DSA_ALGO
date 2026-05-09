
import Link from 'next/link'
import ParticleCanvas from './ParticleCanvas'

export default function HeroSection() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingTop: '80px',
      }}
    >
      {/* Particle background */}
      <ParticleCanvas />

      {/* Floating system labels */}
      <span className="sys-label animate-float" style={{ position: 'absolute', top: '30%', left: '8%', animationDelay: '0s' }}>
        SYS.NODE.A7
      </span>
      <span className="sys-label animate-float" style={{ position: 'absolute', top: '40%', right: '10%', animationDelay: '1.5s' }}>
        LATENCY: 32MS
      </span>
      <span className="sys-label animate-float" style={{ position: 'absolute', top: '65%', right: '14%', animationDelay: '3s' }}>
        MEM.ALLOC.OK
      </span>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '0 24px',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 20px',
            borderRadius: '9999px',
            background: 'rgba(243, 223, 192, 0.06)',
            border: '1px solid rgba(243, 223, 192, 0.12)',
            marginBottom: '48px',
            fontFamily: 'Hanken Grotesk, sans-serif',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase' as const,
            color: '#988f85',
          }}
        >
          <span style={{ fontSize: '14px' }}>⚙</span>
          ALGO_CORE V2.4.0 ACTIVE
        </div>

        {/* Heading */}
        <h1 style={{ margin: '0 0 24px 0', lineHeight: 1 }}>
          <span
            style={{
              display: 'block',
              fontFamily: 'Sora, sans-serif',
              fontSize: 'clamp(40px, 7vw, 72px)',
              fontWeight: 300,
              letterSpacing: '-0.03em',
              color: '#e2e2e8',
              lineHeight: 1.1,
            }}
          >
            Watch Algorithms
          </span>
          <span
            style={{
              display: 'block',
              fontFamily: 'Sora, sans-serif',
              fontSize: 'clamp(40px, 7vw, 72px)',
              fontWeight: 300,
              fontStyle: 'italic',
              letterSpacing: '-0.03em',
              color: '#d7c4a6',
              lineHeight: 1.1,
              marginTop: '8px',
            }}
          >
            Think
          </span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: 'Hanken Grotesk, sans-serif',
            fontSize: '16px',
            lineHeight: 1.7,
            color: '#988f85',
            maxWidth: '520px',
            margin: '0 auto 48px',
          }}
        >
          Immerse yourself in high-fidelity, interactive visualizations. Understand
          complex logic through refined surfaces and dynamic neural paths.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' as const }}>
          <a
            href="/algorithms"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '14px 32px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #d7c4a6, #f3dfc0)',
              color: '#1a1c20',
              fontFamily: 'Hanken Grotesk, sans-serif',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
              textDecoration: 'none',
              boxShadow: '0 4px 24px rgba(215,196,166,0.2)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
          >
            Start Visualizing
          </a>
          <Link
            href="/algorithms"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '14px 32px',
              borderRadius: '12px',
              background: 'transparent',
              color: '#988f85',
              fontFamily: 'Hanken Grotesk, sans-serif',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
              textDecoration: 'none',
              border: '1px solid rgba(243, 223, 192, 0.2)',
              transition: 'transform 0.2s, border-color 0.3s',
            }}
          >
            Explore Algorithms
          </Link>
        </div>
      </div>
    </section>
  )
}
