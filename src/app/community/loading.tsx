import React from 'react';
import Skeleton from '@/components/ui/Skeleton';

export default function CommunityLoading() {
  return (
    <div style={{ minHeight: '100vh', paddingTop: '90px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', marginBottom: '48px' }}>
          <Skeleton width="180px" height="30px" borderRadius="9999px" />
          <Skeleton width="350px" height="50px" />
          <Skeleton width="500px" height="20px" />
        </div>

        <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
          {/* Main Feed */}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
              <Skeleton width="120px" height="36px" borderRadius="9999px" />
              <Skeleton width="120px" height="36px" borderRadius="9999px" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[...Array(4)].map((_, i) => (
                <div key={i} style={{ background: 'rgba(22,24,28,0.3)', border: '1px solid rgba(243,223,192,0.04)', borderRadius: '16px', padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <Skeleton width="40px" height="40px" borderRadius="50%" />
                    <div>
                      <Skeleton width="120px" height="16px" style={{ marginBottom: '6px' }} />
                      <Skeleton width="80px" height="12px" />
                    </div>
                  </div>
                  <Skeleton width="90%" height="24px" style={{ marginBottom: '12px' }} />
                  <Skeleton width="100%" height="16px" style={{ marginBottom: '8px' }} />
                  <Skeleton width="70%" height="16px" style={{ marginBottom: '24px' }} />
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <Skeleton width="60px" height="24px" borderRadius="8px" />
                    <Skeleton width="60px" height="24px" borderRadius="8px" />
                    <Skeleton width="60px" height="24px" borderRadius="8px" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ width: '320px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: 'rgba(22,24,28,0.3)', border: '1px solid rgba(243,223,192,0.04)', borderRadius: '16px', padding: '20px' }}>
              <Skeleton width="100%" height="40px" borderRadius="9999px" style={{ marginBottom: '24px' }} />
              <Skeleton width="120px" height="20px" style={{ marginBottom: '16px' }} />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {[...Array(8)].map((_, i) => (
                  <Skeleton key={i} width={`${60 + Math.random() * 40}px`} height="24px" borderRadius="8px" />
                ))}
              </div>
            </div>
            <div style={{ background: 'rgba(22,24,28,0.3)', border: '1px solid rgba(243,223,192,0.04)', borderRadius: '16px', padding: '20px' }}>
              <Skeleton width="150px" height="24px" style={{ marginBottom: '16px' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[...Array(3)].map((_, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Skeleton width="32px" height="32px" borderRadius="50%" />
                    <div style={{ flex: 1 }}>
                      <Skeleton width="80%" height="14px" style={{ marginBottom: '4px' }} />
                      <Skeleton width="50%" height="10px" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
