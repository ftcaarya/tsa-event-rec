import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ParticleBackgroundWrapper from '@/components/ParticleBackgroundWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TSA Event Recommender',
  description: 'Find the perfect TSA competitive events for your interests and skills',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ 
        position: 'relative', 
        minHeight: '100vh', 
        overflowX: 'hidden',
        background: 'transparent'
      }}>
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <ParticleBackgroundWrapper />
        </div>
        <main style={{ 
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh'
        }}>
          {children}
        </main>
      </body>
    </html>
  );
} 