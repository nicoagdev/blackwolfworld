import { ReactNode } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export default function StoreLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen bg-bw-black text-bw-cream">
            <Header />
            <main className="flex-grow pt-20">{children}</main>
            <Footer />
        </div>
    );
}