'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import './i18n';
import { Toaster } from 'react-hot-toast';
import NotificationHandler from '@/components/NotificationHandler';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <NotificationHandler />
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
} 