'use client';

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-bw-black">
      <div className="w-8 h-8 border-2 border-bw-gold/20 border-t-bw-gold rounded-full animate-spin" />
    </div>
  );
}