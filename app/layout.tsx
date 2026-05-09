import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Gelateria Vernaci',
  description: 'Il gusto autentico della Sicilia. Gelato artigianale, granite e molto altro.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Vernaci',
  },
  openGraph: {
    title: 'Gelateria Vernaci',
    description: 'Il gusto autentico della Sicilia.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#1B4332',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className="bg-background text-text-primary font-body antialiased">
        {children}
      </body>
    </html>
  );
}
