
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { AppHeader } from '@/components/AppHeader';
import { Dock } from '@/components/Dock';
import SmoothScrolling from '@/components/SmoothScrolling';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'OutreachAI - Transform Your Sales',
  description: 'AI-powered sales outreach generation.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <SmoothScrolling>
            <AnimatedBackground />
            <Dock />
            <main className="min-h-screen relative z-10 flex flex-col pb-24">
              <AppHeader />
              {children}
            </main>
          </SmoothScrolling>
        </ThemeProvider>
      </body>
    </html>
  );
}
