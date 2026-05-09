import React from 'react';

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function Skeleton({
  width = '100%',
  height = '20px',
  borderRadius = '8px',
  className = '',
  style = {}
}: SkeletonProps) {
  return (
    <div
      className={className}
      style={{
        width,
        height,
        borderRadius,
        background: 'linear-gradient(90deg, rgba(30,32,36,0.6) 25%, rgba(243,223,192,0.08) 50%, rgba(30,32,36,0.6) 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite linear',
        ...style
      }}
    />
  );
}
