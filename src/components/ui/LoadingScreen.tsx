'use client'
import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function LoadingScreen() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(false)
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    // Only show on the homepage and only once per session
    const hasShown = sessionStorage.getItem('hasShownLoading')
    
    if (pathname === '/' && !hasShown) {
      setIsVisible(true)
      sessionStorage.setItem('hasShownLoading', 'true')

      // Hide loading screen after animation completes
      const timer1 = setTimeout(() => {
        setOpacity(0)
      }, 2800)

      const timer2 = setTimeout(() => {
        setIsVisible(false)
      }, 3300)

      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
      }
    } else {
      // Immediately hide if not on homepage or already shown
      setIsVisible(false)
    }
  }, [pathname])

  if (!isVisible) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      backgroundColor: '#0c0e12', color: '#e2e2e8', overflow: 'hidden',
      opacity: opacity, transition: 'opacity 0.5s ease-out',
      fontFamily: 'Sora, sans-serif'
    }}>
      {/* Animated Aurora Background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: 0, left: '-100px', height: '500px', width: '500px', borderRadius: '50%', background: 'rgba(243,223,192,0.05)', filter: 'blur(80px)', animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
        <div style={{ position: 'absolute', top: '100px', right: 0, height: '450px', width: '450px', borderRadius: '50%', background: 'rgba(215,196,166,0.05)', filter: 'blur(80px)', animation: 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
        <div style={{ position: 'absolute', bottom: 0, left: '33%', height: '400px', width: '400px', borderRadius: '50%', background: 'rgba(255,255,255,0.02)', filter: 'blur(80px)', animation: 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
      </div>

      {/* Animated Grid */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(243,223,192,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(243,223,192,0.03) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      {/* Floating Particles */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(30)].map((_, i) => (
          <span
            key={i}
            className="animate-float"
            style={{
              position: 'absolute', height: '4px', width: '4px', borderRadius: '50%',
              background: 'rgba(243,223,192,0.6)',
              top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`, animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px', padding: '0 24px' }}>
        
        {/* Animated Character */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Warm Glow */}
          <div style={{ position: 'absolute', height: '300px', width: '300px', borderRadius: '50%', background: 'rgba(243,223,192,0.1)', filter: 'blur(60px)', animation: 'pulse 4s infinite' }} />

          {/* Floating Character */}
          <div className="animate-characterFloat" style={{ position: 'relative' }}>
            {/* Hoodie Body */}
            <div style={{
              position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center',
              height: '176px', width: '144px', borderRadius: '40px',
              border: '1px solid rgba(243,223,192,0.1)',
              background: 'linear-gradient(to bottom, #1e2024, #121418)',
              boxShadow: '0 25px 50px -12px rgba(243,223,192,0.1)'
            }}>
              {/* Head */}
              <div style={{
                position: 'absolute', top: '-64px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                height: '112px', width: '112px', borderRadius: '50%',
                border: '1px solid rgba(243,223,192,0.1)',
                background: 'linear-gradient(to bottom, #2a2d33, #16181c)',
                boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)'
              }}>
                {/* Eyes */}
                <div style={{ position: 'absolute', left: '28px', top: '44px', height: '12px', width: '12px', borderRadius: '50%', background: '#f3dfc0', boxShadow: '0 0 10px #f3dfc0', animation: 'pulse 2s infinite' }} />
                <div style={{ position: 'absolute', right: '28px', top: '44px', height: '12px', width: '12px', borderRadius: '50%', background: '#f3dfc0', boxShadow: '0 0 10px #f3dfc0', animation: 'pulse 2s infinite' }} />
                {/* Smile */}
                <div style={{ position: 'absolute', bottom: '28px', height: '12px', width: '40px', borderBottom: '2px solid #f3dfc0', borderRadius: '0 0 50px 50px' }} />
              </div>

              {/* Laptop */}
              <div style={{
                position: 'absolute', bottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                height: '64px', width: '112px', borderRadius: '16px',
                border: '1px solid rgba(243,223,192,0.2)', background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(16px)'
              }}>
                <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.3em', color: '#f3dfc0' }}>CODE</div>
                <div style={{ position: 'absolute', inset: 0, borderRadius: '16px', background: 'rgba(243,223,192,0.05)' }} />
              </div>

              {/* Floating Code Icons */}
              <div className="animate-floatSlow" style={{ position: 'absolute', left: '-64px', top: '40px', borderRadius: '12px', border: '1px solid rgba(243,223,192,0.1)', background: 'rgba(243,223,192,0.05)', padding: '8px 12px', fontSize: '12px', color: '#f3dfc0', backdropFilter: 'blur(16px)' }}>{'{ }'}</div>
              <div className="animate-floatSlow2" style={{ position: 'absolute', right: '-64px', top: '64px', borderRadius: '12px', border: '1px solid rgba(243,223,192,0.1)', background: 'rgba(243,223,192,0.05)', padding: '8px 12px', fontSize: '12px', color: '#d7c4a6', backdropFilter: 'blur(16px)' }}>&lt;/&gt;</div>
              <div className="animate-floatSlow3" style={{ position: 'absolute', bottom: '-16px', left: '-60px', borderRadius: '12px', border: '1px solid rgba(243,223,192,0.1)', background: 'rgba(243,223,192,0.05)', padding: '8px 12px', fontSize: '12px', color: '#e2e2e8', backdropFilter: 'blur(16px)' }}>0101</div>
            </div>
          </div>
        </div>

        {/* Premium Rotating Loader */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Outer Glow */}
          <div style={{ position: 'absolute', height: '320px', width: '320px', borderRadius: '50%', background: 'rgba(243,223,192,0.05)', filter: 'blur(60px)', animation: 'pulse 4s infinite' }} />

          {/* Orbit Rings */}
          <div style={{ position: 'absolute', height: '288px', width: '288px', borderRadius: '50%', border: '1px solid rgba(243,223,192,0.15)', animation: 'spin 12s linear infinite' }} />
          <div style={{ position: 'absolute', height: '240px', width: '240px', borderRadius: '50%', border: '1px solid rgba(215,196,166,0.15)', animation: 'spinReverse 8s linear infinite' }} />
          <div style={{ position: 'absolute', height: '176px', width: '176px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', animation: 'spin 5s linear infinite' }} />

          {/* Orbit Dots */}
          <div style={{ position: 'absolute', height: '288px', width: '288px', animation: 'spin 10s linear infinite' }}>
            <div style={{ position: 'absolute', top: '-8px', left: '50%', transform: 'translateX(-50%)', height: '16px', width: '16px', borderRadius: '50%', background: '#f3dfc0', boxShadow: '0 0 20px #f3dfc0' }} />
          </div>
          <div style={{ position: 'absolute', height: '240px', width: '240px', animation: 'spinReverse 7s linear infinite' }}>
            <div style={{ position: 'absolute', left: '50%', top: '0', transform: 'translateX(-50%)', height: '12px', width: '12px', borderRadius: '50%', background: '#d7c4a6', boxShadow: '0 0 18px #d7c4a6' }} />
          </div>

          {/* Center Glass Card */}
          <div style={{
            position: 'relative', display: 'flex', height: '144px', width: '144px', alignItems: 'center', justifyContent: 'center',
            borderRadius: '32px', border: '1px solid rgba(243,223,192,0.1)',
            background: 'rgba(243,223,192,0.03)', backdropFilter: 'blur(24px)',
            boxShadow: '0 25px 50px -12px rgba(243,223,192,0.15)'
          }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: '32px', border: '1px solid rgba(243,223,192,0.1)' }} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{
                background: 'linear-gradient(to right, #f3dfc0, #d7c4a6)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                fontSize: '48px', fontWeight: 900, letterSpacing: '0.1em'
              }}>DSA</span>
              <span style={{ marginTop: '4px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.35em', color: '#988f85' }}>Visualizer</span>
            </div>
          </div>
        </div>

        {/* Text Section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', textAlign: 'center' }}>
          <h1 style={{
            background: 'linear-gradient(to right, #f3dfc0, #d7c4a6)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            fontSize: '48px', fontWeight: 900, letterSpacing: '-0.02em', margin: 0
          }}>Awakening Algorithms</h1>
          <p style={{ maxWidth: '576px', fontSize: '14px', lineHeight: 1.6, color: '#cfc5b9', margin: 0 }}>
            Initializing algorithms, preparing visualizations, and optimizing your coding journey...
          </p>
        </div>

        {/* Advanced Progress Bar */}
        <div style={{ position: 'relative', width: '320px', overflow: 'hidden', borderRadius: '9999px', border: '1px solid rgba(243,223,192,0.1)', background: 'rgba(255,255,255,0.03)', padding: '3px', backdropFilter: 'blur(16px)' }}>
          <div style={{ position: 'relative', height: '12px', overflow: 'hidden', borderRadius: '9999px', background: 'rgba(0,0,0,0.5)' }}>
            <div className="animate-loader" style={{
              position: 'absolute', inset: '0 0 0 0', borderRadius: '9999px',
              background: 'linear-gradient(to right, #d7c4a6, #f3dfc0)',
              boxShadow: '0 0 20px rgba(243,223,192,0.5)'
            }} />
          </div>
        </div>

        {/* Algorithm Tags */}
        <div style={{ display: 'flex', maxWidth: '768px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
          {['Binary Search', 'Dynamic Programming', 'Graphs', 'Trees', 'Recursion', 'Sorting', 'Greedy', 'Backtracking'].map((item, index) => (
            <div
              key={index}
              style={{
                position: 'relative', overflow: 'hidden', borderRadius: '9999px',
                border: '1px solid rgba(243,223,192,0.1)', background: 'rgba(255,255,255,0.03)',
                padding: '8px 20px', fontSize: '14px', color: '#cfc5b9', backdropFilter: 'blur(16px)',
                animation: `floatTag ${3 + index * 0.2}s ease-in-out infinite`,
                animationDelay: `${index * 0.15}s`,
              }}
            >
              <span style={{ position: 'relative', zIndex: 10 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Glow Line */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, height: '2px', width: '100%', overflow: 'hidden', background: 'rgba(255,255,255,0.05)' }}>
        <div className="animate-lineMove" style={{ height: '100%', width: '33.33%', background: 'linear-gradient(to right, transparent, #f3dfc0, transparent)' }} />
      </div>

      {/* Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spinReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes loader {
          0% { width: 0%; transform: translateX(0); }
          50% { width: 70%; }
          100% { width: 0%; transform: translateX(320px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); opacity: 0.4; }
          50% { transform: translateY(-20px); opacity: 1; }
        }
        @keyframes floatTag {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes lineMove {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        @keyframes characterFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(4deg); }
        }
        @keyframes floatSlow2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-16px) rotate(-4deg); }
        }
        @keyframes floatSlow3 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .animate-loader { animation: loader 2.2s ease-in-out infinite; }
        .animate-float { animation: float linear infinite; }
        .animate-characterFloat { animation: characterFloat 4s ease-in-out infinite; }
        .animate-floatSlow { animation: floatSlow 5s ease-in-out infinite; }
        .animate-floatSlow2 { animation: floatSlow2 6s ease-in-out infinite; }
        .animate-floatSlow3 { animation: floatSlow3 4.5s ease-in-out infinite; }
        .animate-lineMove { animation: lineMove 3s linear infinite; }
      `}</style>
    </div>
  )
}
