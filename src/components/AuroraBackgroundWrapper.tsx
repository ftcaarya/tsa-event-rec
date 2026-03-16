'use client';

import dynamic from 'next/dynamic';

const Aurora = dynamic(() => import('@/components/Aurora'), { ssr: false });

export default function AuroraBackgroundWrapper() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      pointerEvents: 'none',
    }}>
      <Aurora
        colorStops={['#3b1ddb', '#6e3afa', '#b44aff']}
        amplitude={1.8}
        blend={0.7}
        speed={0.5}
      />
    </div>
  );
}
