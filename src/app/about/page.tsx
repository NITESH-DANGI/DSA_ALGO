import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px', overflow: 'hidden', position: 'relative' }}>
      
      {/* Glow Effects */}
      <div style={{
        position: 'absolute', top: '20%', left: '10%', width: '40vw', height: '40vw',
        background: 'radial-gradient(circle, rgba(215,196,166,0.03) 0%, rgba(12,14,18,0) 70%)',
        borderRadius: '50%', filter: 'blur(60px)', zIndex: -1, pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '5%', width: '30vw', height: '30vw',
        background: 'radial-gradient(circle, rgba(248,113,113,0.03) 0%, rgba(12,14,18,0) 70%)',
        borderRadius: '50%', filter: 'blur(60px)', zIndex: -1, pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 16px', borderRadius: '9999px',
            background: 'rgba(243,223,192,0.06)', border: '1px solid rgba(243,223,192,0.12)',
            marginBottom: '20px',
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#d7c4a6' }}>info</span>
            <span style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '11px', fontWeight: 600, color: '#f3dfc0', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              About The Project
            </span>
          </div>

          <h1 style={{
            fontFamily: 'Sora, sans-serif', fontSize: '44px', fontWeight: 600,
            color: '#e2e2e8', margin: '0 0 20px 0', letterSpacing: '-0.03em', lineHeight: 1.15,
          }}>
            Built by <span style={{ color: '#d7c4a6' }}>Nitesh Dangi</span>
          </h1>
          
          <p style={{
            fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '18px',
            color: '#cfc5b9', lineHeight: 1.6, margin: '0 auto', maxWidth: '600px'
          }}>
            A developer passionate about crafting beautiful, high-performance web experiences and making complex concepts accessible to everyone.
          </p>
        </div>

        {/* Main Content Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* Why AlgoFlow? */}
          <div style={{
            background: 'rgba(22,24,28,0.6)', border: '1px solid rgba(243,223,192,0.08)',
            borderRadius: '24px', padding: '40px', position: 'relative', overflow: 'hidden'
          }}>
            <h2 style={{
              fontFamily: 'Sora, sans-serif', fontSize: '24px', fontWeight: 600,
              color: '#e2e2e8', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '12px'
            }}>
              <span className="material-symbols-outlined" style={{ color: '#f3dfc0', fontSize: '28px' }}>psychology</span>
              Why I Built AlgoFlow
            </h2>
            <div style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '16px', color: '#cfc5b9', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p>
                When I first started learning Data Structures and Algorithms, I found myself staring at dry textbooks and static code snippets. I struggled to build the mental models required to truly understand how algorithms like Merge Sort or Dijkstra's actually worked under the hood.
              </p>
              <p>
                I built AlgoFlow because I wanted to see the algorithms come alive. I wanted a platform that wasn't just a basic tool, but a premium, visually engaging experience that makes learning DSA intuitive, interactive, and less intimidating for beginners.
              </p>
            </div>
          </div>

          {/* What I Learned */}
          <div style={{
            background: 'rgba(22,24,28,0.6)', border: '1px solid rgba(243,223,192,0.08)',
            borderRadius: '24px', padding: '40px'
          }}>
            <h2 style={{
              fontFamily: 'Sora, sans-serif', fontSize: '24px', fontWeight: 600,
              color: '#e2e2e8', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '12px'
            }}>
              <span className="material-symbols-outlined" style={{ color: '#4ade80', fontSize: '28px' }}>school</span>
              What I Learned
            </h2>
            <div style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '16px', color: '#cfc5b9', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p>
                Building AlgoFlow was a massive technical challenge that pushed my skills to the next level. Here are the key takeaways from the journey:
              </p>
              <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <span className="material-symbols-outlined" style={{ color: '#d7c4a6', fontSize: '20px', marginTop: '2px' }}>check_circle</span>
                  <span><strong>State Management & Reactivity:</strong> Managing the complex, step-by-step state of algorithms while keeping the UI responsive required deep dives into React's custom hooks and state management patterns.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <span className="material-symbols-outlined" style={{ color: '#d7c4a6', fontSize: '20px', marginTop: '2px' }}>check_circle</span>
                  <span><strong>Performance Optimization:</strong> Rendering large arrays and graph networks taught me how to optimize DOM updates and leverage requestAnimationFrame for smooth 60fps animations.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <span className="material-symbols-outlined" style={{ color: '#d7c4a6', fontSize: '20px', marginTop: '2px' }}>check_circle</span>
                  <span><strong>Premium UI/UX Design:</strong> I learned how to move beyond generic libraries to build a bespoke "luxury tech" aesthetic, mastering glassmorphism, precise typography (Sora/Hanken), and subtle micro-interactions.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Let's Connect */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(243,223,192,0.05) 0%, rgba(215,196,166,0.02) 100%)',
            border: '1px solid rgba(243,223,192,0.15)',
            borderRadius: '24px', padding: '40px', textAlign: 'center'
          }}>
            <h2 style={{
              fontFamily: 'Sora, sans-serif', fontSize: '24px', fontWeight: 600,
              color: '#f3dfc0', margin: '0 0 16px 0'
            }}>
              Let's Connect
            </h2>
            <p style={{
              fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '16px',
              color: '#cfc5b9', lineHeight: 1.6, margin: '0 auto 24px auto', maxWidth: '500px'
            }}>
              I'm always open to discussing new opportunities, collaborations, or just chatting about code.
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
              <a href="https://github.com/NITESH-DANGI" target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                padding: '12px 24px', borderRadius: '9999px',
                background: 'rgba(243,223,192,0.1)', border: '1px solid rgba(243,223,192,0.2)',
                color: '#f3dfc0', fontFamily: 'Sora, sans-serif', fontSize: '14px', fontWeight: 500,
                textDecoration: 'none', transition: 'all 0.2s',
              }}>
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                GitHub Profile
              </a>
              
              <Link href="/algorithms" style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                padding: '12px 24px', borderRadius: '9999px',
                background: 'linear-gradient(135deg, #f3dfc0 0%, #d7c4a6 100%)',
                color: '#111317', fontFamily: 'Sora, sans-serif', fontSize: '14px', fontWeight: 600,
                textDecoration: 'none', boxShadow: '0 4px 14px rgba(243,223,192,0.25)',
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>play_arrow</span>
                Explore Algorithms
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
