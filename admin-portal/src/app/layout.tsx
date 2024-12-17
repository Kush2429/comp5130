import * as React from 'react';
import type { Metadata, Viewport } from 'next';

import '@/styles/global.css';

import { UserProvider } from '@/contexts/user-context';
import { LocalizationProvider } from '@/components/core/localization-provider';
import { ThemeProvider } from '@/components/core/theme-provider/theme-provider';

export const metadata: Metadata = {
  title: 'Roomy Admin Portal',
  description: 'Roomy Admin Portal',
  generator: 'Next.js',
  manifest: '/manifest.json',
  keywords: ['nextjs', 'nextjs13', 'next13', 'pwa', 'next-pwa'],
  themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#fff' }],
  authors: [{ name: 'Roomy Team' }],
  viewport: 'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover',
  icons: [
    { rel: 'apple-touch-icon', url: 'icons/icon-128x128.png' },
    { rel: 'icon', url: '/icon-128x128.png' },
  ],
};
export const viewport = { width: 'device-width', initialScale: 1 } satisfies Viewport;

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <html lang="en">
      <body>
        <LocalizationProvider>
          <UserProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </UserProvider>
        </LocalizationProvider>
      </body>
    </html>
  );
}
