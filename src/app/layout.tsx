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
      <body className={inter.className} style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden' }}>
        <ParticleBackgroundWrapper />
        <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
      </body>
    </html>
  );
} 