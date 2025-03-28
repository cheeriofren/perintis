import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kebijakan Tracker',
  description: 'Platform Pelacakan Kebijakan Publik Indonesia',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#ffffff',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Perintis',
  },
  formatDetection: {
    telephone: false,
  },
}; 