'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SupportPage() {
  const router = useRouter()
  const faqs = [
    {
      question: "How do I control the visualization playback speed?",
      answer: "You can adjust the playback speed using the slider on the main control bar at the bottom of the visualizer screen."
    },
    {
      question: "Can I input custom data arrays or graphs?",
      answer: "Yes! Use the Input Panel located on the top left of the visualizer to supply custom arrays, trees, or graphs depending on the algorithm."
    },
    {
      question: "How do I change the programming language for the code panel?",
      answer: "Navigate to the Settings page via the sidebar to set your default programming language (Python, JavaScript, Java, or C++)."
    },
    {
      question: "Is there a way to step backward?",
      answer: "Absolutely. Use the 'Step Back' button on the control bar or press the Left Arrow key on your keyboard to rewind the algorithm step-by-step."
    }
  ]

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

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#d7c4a6' }}>support_agent</span>
            <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: '36px', fontWeight: 600, color: '#e2e2e8', margin: 0, letterSpacing: '-0.02em' }}>
              Support Center
            </h1>
          </div>
          <p style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '16px', color: '#988f85', margin: 0 }}>
            Need help? Find answers to common questions or reach out to the community.
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* FAQ Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="glass-panel"
            style={{ padding: '32px', borderRadius: '16px' }}
          >
            <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: '18px', fontWeight: 600, color: '#d7c4a6', margin: '0 0 24px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="material-symbols-outlined">quiz</span>
              Frequently Asked Questions
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {faqs.map((faq, idx) => (
                <div key={idx} style={{ padding: '16px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(243,223,192,0.05)' }}>
                  <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: '14px', fontWeight: 600, color: '#e2e2e8', margin: '0 0 8px 0' }}>
                    {faq.question}
                  </h3>
                  <p style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '13px', color: '#988f85', margin: 0, lineHeight: 1.6 }}>
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Contact & Resources Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="glass-panel"
            style={{ padding: '32px', borderRadius: '16px' }}
          >
            <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: '18px', fontWeight: 600, color: '#d7c4a6', margin: '0 0 24px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="material-symbols-outlined">forum</span>
              Community & Resources
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              
              <a href="https://github.com/NITESH-DANGI/DSA_ALGO" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                <div style={{ padding: '20px', borderRadius: '12px', background: 'rgba(243,223,192,0.05)', border: '1px solid rgba(243,223,192,0.1)', transition: 'all 0.2s', cursor: 'pointer' }}
                     onMouseEnter={e => { e.currentTarget.style.background = 'rgba(243,223,192,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                     onMouseLeave={e => { e.currentTarget.style.background = 'rgba(243,223,192,0.05)'; e.currentTarget.style.transform = 'translateY(0)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <span className="material-symbols-outlined" style={{ color: '#f3dfc0' }}>code</span>
                    <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: '15px', fontWeight: 600, color: '#e2e2e8', margin: 0 }}>GitHub Issues</h3>
                  </div>
                  <p style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '13px', color: '#988f85', margin: 0 }}>
                    Report a bug or request a new algorithm visualization.
                  </p>
                </div>
              </a>

              <Link href="/docs" style={{ textDecoration: 'none' }}>
                <div style={{ padding: '20px', borderRadius: '12px', background: 'rgba(243,223,192,0.05)', border: '1px solid rgba(243,223,192,0.1)', transition: 'all 0.2s', cursor: 'pointer', height: '100%' }}
                     onMouseEnter={e => { e.currentTarget.style.background = 'rgba(243,223,192,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                     onMouseLeave={e => { e.currentTarget.style.background = 'rgba(243,223,192,0.05)'; e.currentTarget.style.transform = 'translateY(0)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <span className="material-symbols-outlined" style={{ color: '#f3dfc0' }}>menu_book</span>
                    <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: '15px', fontWeight: 600, color: '#e2e2e8', margin: 0 }}>Documentation</h3>
                  </div>
                  <p style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '13px', color: '#988f85', margin: 0 }}>
                    Read through our comprehensive platform guides.
                  </p>
                </div>
              </Link>

            </div>
          </motion.section>

        </div>
      </div>
    </div>
  )
}
