import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-bw-black text-bw-cream">
      <main className="flex-grow">{children}</main>
    </div>
  );
}