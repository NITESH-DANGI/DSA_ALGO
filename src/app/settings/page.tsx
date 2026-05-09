'use client'
import { motion } from 'framer-motion'
import { useVisualizerStore, Language } from '@/store/visualizerStore'
import { useRouter } from 'next/navigation'

export default function SettingsPage() {
  const router = useRouter()
  const language = useVisualizerStore(s => s.language)
  const setLanguage = useVisualizerStore(s => s.setLanguage)
  const audioEnabled = useVisualizerStore(s => s.audioEnabled)
  const setAudioEnabled = useVisualizerStore(s => s.setAudioEnabled)

  return (
    <div style={{ minHeight: 'calc(100vh - 80px)', marginTop: '80px', padding: '40px 24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ marginBottom: '40px' }}
        >
          <button
            onClick={() => router.back()}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: 'transparent', border: 'none', color: '#988f85', cursor: 'pointer',
              fontFamily: 'Sora, sans-serif', fontSize: '14px', fontWeight: 500, padding: 0,
              marginBottom: '24px', transition: 'color 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#f3dfc0'}
            onMouseLeave={e => e.currentTarget.style.color = '#988f85'}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_back</span>
            Back
          </button>
          
          <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: '36px', fontWeight: 600, color: '#e2e2e8', margin: '0 0 12px 0', letterSpacing: '-0.02em' }}>
            Settings
          </h1>
          <p style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '16px', color: '#988f85', margin: 0 }}>
            Configure your visualization preferences and environment.
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* Preferences Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="glass-panel"
            style={{ padding: '32px', borderRadius: '16px' }}
          >
            <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: '18px', fontWeight: 600, color: '#d7c4a6', margin: '0 0 24px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="material-symbols-outlined">tune</span>
              Visualization Preferences
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              
              {/* Language Selection */}
              <div>
                <label style={{ display: 'block', fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#988f85', marginBottom: '12px' }}>
                  Default Programming Language
                </label>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {(['python', 'javascript', 'java', 'cpp'] as Language[]).map(lang => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      style={{
                        padding: '12px 24px',
                        borderRadius: '10px',
                        border: language === lang ? '1px solid rgba(243,223,192,0.4)' : '1px solid rgba(243,223,192,0.1)',
                        background: language === lang ? 'rgba(243,223,192,0.1)' : 'rgba(255,255,255,0.02)',
                        color: language === lang ? '#f3dfc0' : '#cfc5b9',
                        fontFamily: 'Sora, sans-serif',
                        fontSize: '14px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        textTransform: 'capitalize',
                      }}
                      onMouseEnter={e => {
                        if (language !== lang) {
                          e.currentTarget.style.background = 'rgba(243,223,192,0.05)'
                          e.currentTarget.style.borderColor = 'rgba(243,223,192,0.2)'
                        }
                      }}
                      onMouseLeave={e => {
                        if (language !== lang) {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                          e.currentTarget.style.borderColor = 'rgba(243,223,192,0.1)'
                        }
                      }}
                    >
                      {lang === 'cpp' ? 'C++' : lang}
                    </button>
                  ))}
                </div>
                <p style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '13px', color: '#7a756e', marginTop: '12px' }}>
                  This language will be selected by default when you open a new algorithm visualizer.
                </p>
              </div>

              <div style={{ height: '1px', background: 'rgba(243,223,192,0.08)' }} />

              {/* Audio Toggle */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontFamily: 'Sora, sans-serif', fontSize: '16px', fontWeight: 500, color: '#e2e2e8' }}>
                    Sound Effects
                  </label>
                  <span style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '13px', color: '#988f85' }}>
                    Play auditory feedback during visualization steps (e.g., swapping arrays, visiting nodes).
                  </span>
                </div>
                <button
                  onClick={() => setAudioEnabled(!audioEnabled)}
                  style={{
                    position: 'relative',
                    width: '56px',
                    height: '32px',
                    borderRadius: '16px',
                    background: audioEnabled ? '#d7c4a6' : 'rgba(255,255,255,0.1)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background 0.3s ease',
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '3px',
                      left: audioEnabled ? '27px' : '3px',
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      background: audioEnabled ? '#1a1c20' : '#cfc5b9',
                      transition: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    }}
                  />
                </button>
              </div>

            </div>
          </motion.section>

          {/* System Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="glass-panel"
            style={{ padding: '32px', borderRadius: '16px' }}
          >
            <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: '18px', fontWeight: 600, color: '#d7c4a6', margin: '0 0 24px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="material-symbols-outlined">memory</span>
              System Info
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid rgba(243,223,192,0.08)' }}>
                <span style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '14px', color: '#988f85' }}>Version</span>
                <span style={{ fontFamily: 'var(--font-space-mono), monospace', fontSize: '13px', color: '#e2e2e8', padding: '4px 8px', background: 'rgba(243,223,192,0.1)', borderRadius: '6px' }}>v2.4.0</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '14px', color: '#988f85' }}>Engine Status</span>
                <span style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '13px', color: '#d5e7ca', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#d5e7ca', boxShadow: '0 0 8px #d5e7ca' }} />
                  Operational
                </span>
              </div>
            </div>
          </motion.section>

        </div>
      </div>
    </div>
  )
}
