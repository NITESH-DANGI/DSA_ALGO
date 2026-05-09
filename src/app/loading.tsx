import React from 'react';
import Skeleton from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div style={{ minHeight: '100vh', padding: '120px 24px 60px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Hero Skeleton */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '80px', gap: '24px' }}>
        <Skeleton width="200px" height="30px" borderRadius="9999px" />
        <Skeleton width="40%" height="60px" borderRadius="16px" />
        <Skeleton width="60%" height="24px" />
        <Skeleton width="50%" height="24px" />
      </div>

      {/* Grid Skeleton */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            background: 'rgba(22,24,28,0.3)',
            border: '1px solid rgba(243,223,192,0.04)',
            borderRadius: '24px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <Skeleton width="100%" height="160px" borderRadius="16px" />
            <Skeleton width="70%" height="24px" />
            <Skeleton width="100%" height="16px" />
            <Skeleton width="90%" height="16px" />
          </div>
        ))}
      </div>
    </div>
  );
}
