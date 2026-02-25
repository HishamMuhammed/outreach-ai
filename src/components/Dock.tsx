'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Sparkles, Clock, LogIn, LogOut, Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import { createClient } from '@/utils/supabase/client';
import { signOut } from '@/app/auth/actions';

function DockIcon({
    mouseX,
    icon: Icon,
    label,
    href,
    onClick,
    isActive
}: {
    mouseX: import('framer-motion').MotionValue<number>;
    icon: React.ElementType;
    label: string;
    href?: string;
    onClick?: () => void;
    isActive?: boolean;
}) {
    const ref = useRef<HTMLDivElement>(null);

    const distance = useTransform(mouseX, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    const content = (
        <motion.div
            ref={ref}
            style={{ width, height: width }}
            className={`group relative flex items-center justify-center rounded-2xl border border-slate-200/50 dark:border-white/10 ${isActive ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-slate-50/50 dark:bg-white/5 text-slate-700 dark:text-gray-400'} hover:bg-slate-100 dark:hover:bg-white/10 transition-colors backdrop-blur-md`}
        >
            <Icon className="w-1/2 h-1/2" />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 px-2 py-1 text-xs font-medium text-white bg-slate-900 dark:bg-black rounded-lg opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 whitespace-nowrap shadow-xl border border-white/10">
                {label}
            </span>
        </motion.div>
    );

    if (href) {
        return (
            <Link href={href}>
                {content}
            </Link>
        );
    }

    return (
        <button onClick={onClick} type="button">
            {content}
        </button>
    );
}

import { type Session } from '@supabase/supabase-js';

export function Dock() {
    const mouseX = useMotionValue(Infinity);
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [session, setSession] = useState<Session | null>(null);
    const [mounted, setMounted] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        // eslint-disable-next-line
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
        <div className="hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <motion.div
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(Infinity)}
                className="mx-auto flex h-16 items-end gap-4 rounded-3xl bg-white/40 dark:bg-black/40 border border-slate-200/50 dark:border-white/10 px-4 pb-3 shadow-2xl backdrop-blur-2xl"
            >
                <DockIcon mouseX={mouseX} icon={Home} label="Home" href="/" isActive={pathname === '/'} />

                {session ? (
                    <>
                        <DockIcon mouseX={mouseX} icon={Sparkles} label="Generate" href="/generate" isActive={pathname === '/generate'} />
                        <DockIcon mouseX={mouseX} icon={Clock} label="History" href="/history" isActive={pathname?.startsWith('/history')} />
                    </>
                ) : (
                    null
                )}

                {/* Separator */}
                <div className="w-px h-10 bg-slate-300 dark:bg-white/10 rounded-full mx-1 self-center" />

                <DockIcon mouseX={mouseX} icon={ThemeIcon} label={`Theme: ${theme}`} onClick={cycleTheme} />

                {session ? (
                    <DockIcon mouseX={mouseX} icon={LogOut} label="Log Out" onClick={() => signOut()} />
                ) : (
                    <DockIcon mouseX={mouseX} icon={LogIn} label="Log In" href="/login" isActive={pathname === '/login'} />
                )}
            </motion.div>
        </div>
    );
}
