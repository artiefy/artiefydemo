'use client';
import DotGrid from '~/components/ui/DotGrid';

export default function PatternBg() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full">
      <DotGrid
        dotSize={10}
        gap={15}
        baseColor="#1e293b"
        activeColor="#5227FF"
        proximity={120}
        shockRadius={250}
        shockStrength={5}
        resistance={750}
        returnDuration={1.5}
        className="w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
