import React from 'react';
import Skeleton from '@/components/ui/Skeleton';

export default function LiveLoading() {
  return (
    <div style={{ minHeight: '100vh', paddingTop: '90px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <Skeleton width="200px" height="30px" borderRadius="9999px" />
          <Skeleton width="400px" height="50px" />
          <Skeleton width="500px" height="20px" />
        </div>

        <div style={{ display: 'flex', gap: '28px', alignItems: 'flex-start' }}>
          {/* Main Area (Questions Grid) */}
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} style={{ background: 'rgba(22,24,28,0.3)', border: '1px solid rgba(243,223,192,0.04)', borderRadius: '14px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <Skeleton width="60px" height="20px" borderRadius="8px" />
                  <Skeleton width="40px" height="20px" />
                </div>
                <Skeleton width="80%" height="24px" style={{ marginBottom: '12px' }} />
                <Skeleton width="40%" height="16px" />
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div style={{ width: '280px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: 'rgba(22,24,28,0.3)', border: '1px solid rgba(243,223,192,0.04)', borderRadius: '16px', padding: '20px' }}>
              <Skeleton width="150px" height="24px" style={{ marginBottom: '20px' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[...Array(5)].map((_, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Skeleton width="24px" height="24px" borderRadius="50%" />
                    <Skeleton width="32px" height="32px" borderRadius="50%" />
                    <div style={{ flex: 1 }}>
                      <Skeleton width="80%" height="16px" style={{ marginBottom: '6px' }} />
                      <Skeleton width="50%" height="12px" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: 'rgba(22,24,28,0.3)', border: '1px solid rgba(243,223,192,0.04)', borderRadius: '16px', padding: '20px' }}>
              <Skeleton width="150px" height="24px" style={{ marginBottom: '20px' }} />
              <Skeleton width="100%" height="12px" style={{ marginBottom: '8px' }} />
              <Skeleton width="80%" height="10px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
