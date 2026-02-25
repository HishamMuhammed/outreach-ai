'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Sparkles, Clock, LogIn, LogOut, Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import { createClient } from '@/utils/supabase/client';
import { signOut } from '@/app/auth/actions';
import { type Session } from '@supabase/supabase-js';

function MobileNavItem({
    icon: Icon,
    label,
    href,
    onClick,
    isActive,
}: {
    icon: React.ElementType;
    label: string;
    href?: string;
    onClick?: () => void;
    isActive?: boolean;
}) {
    const content = (
        <motion.div
            whileTap={{ scale: 0.85 }}  // Liquid/springy tap effect
            className="relative flex flex-col items-center justify-center w-14 h-14"
        >
            {isActive && (
                <motion.div
                    layoutId="mobile-dock-active-indicator"
                    className="absolute inset-1 bg-emerald-500/20 dark:bg-emerald-500/30 rounded-2xl"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
            )}
            <Icon
                className={`w-6 h-6 relative z-10 transition-colors duration-200 ${isActive
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-slate-500 dark:text-gray-400'
                    }`}
            />
            {/* Optional text label - can omit for absolute minimal liquid look */}
            {/* <span className="text-[10px] mt-1 font-medium">{label}</span> */}
        </motion.div>
    );

    if (href) {
        return (
            <Link href={href} className="outline-none tap-highlight-transparent" aria-label={label}>
                {content}
            </Link>
        );
    }

    return (
        <button onClick={onClick} type="button" className="outline-none tap-highlight-transparent" aria-label={label}>
            {content}
        </button>
    );
}

export function MobileDock() {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [session, setSession] = useState<Session | null>(null);
    const [mounted, setMounted] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        setMounted(true);
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, [supabase.auth]);

    const cycleTheme = () => {
        if (theme === 'light') setTheme('dark');
        else if (theme === 'dark') setTheme('system');
        else setTheme('light');
    };

    const ThemeIcon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor;

    if (!mounted) return null;

    return (
        <div className="md:hidden fixed bottom-5 left-4 right-4 z-50 flex justify-center pb-safe">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="flex items-center justify-evenly w-full max-w-sm h-16 rounded-[2rem] bg-white/70 dark:bg-black/40 border border-slate-200/60 dark:border-white/10 shadow-2xl backdrop-blur-3xl"
            >
                <MobileNavItem icon={Home} label="Home" href="/" isActive={pathname === '/'} />

                {session && (
                    <>
                        <MobileNavItem icon={Sparkles} label="Generate" href="/generate" isActive={pathname === '/generate'} />
                        <MobileNavItem icon={Clock} label="History" href="/history" isActive={pathname?.startsWith('/history')} />
                    </>
                )}

                <div className="w-px h-8 bg-slate-200 dark:bg-white/10 rounded-full mx-1 opacity-50" />

                <MobileNavItem icon={ThemeIcon} label="Theme" onClick={cycleTheme} />

                {session ? (
                    <MobileNavItem icon={LogOut} label="Log Out" onClick={() => signOut()} />
                ) : (
                    <MobileNavItem icon={LogIn} label="Log In" href="/login" isActive={pathname === '/login'} />
                )}
            </motion.div>
        </div>
    );
}
