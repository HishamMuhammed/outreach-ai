
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { AppHeader } from '@/components/AppHeader';

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
          disableTransitionOnChange
        >
          <AnimatedBackground />
          <nav className="fixed bottom-0 right-0 p-4 z-50">
            <ThemeSwitcher />
          </nav>
          <main className="min-h-screen relative z-10 flex flex-col">
            <AppHeader />
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
