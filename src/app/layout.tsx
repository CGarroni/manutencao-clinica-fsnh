// src/app/layout.tsx
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ClientProviders } from '@/components/ClientProviders';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Manutenção Clínica — FSNH',
  description: 'Sistema de Gestão de Ordens de Serviço e Equipamentos Hospitalares',
  manifest: '/manifest.json',
  themeColor: '#0a2342',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Manutenção FSNH',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/icon-192.png" />
      </head>
      <body className="font-sans antialiased bg-[#0a2342] text-gray-800">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}