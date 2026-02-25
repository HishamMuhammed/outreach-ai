'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Sparkles, Clock, LogIn, LogOut, Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import { createClient } from '@/utils/supabase/client';
import { signOut } from '@/app/auth/actions';
import { type Session } from '@supabase/supabase-js';

function FluidNavItem({
    mouseX,
    icon: Icon,
    label,
    href,
    onClick,
    isActive,
    isHovered,
    onHoverEnter,
}: {
    mouseX: import('framer-motion').MotionValue<number>;
    icon: React.ElementType;
    label: string;
    href?: string;
    onClick?: () => void;
    isActive?: boolean;
    isHovered?: boolean;
    onHoverEnter?: () => void;
}) {
    const ref = useRef<HTMLDivElement>(null);

    // Magnification Physics Calculation based on cursor X position
    const distance = useTransform(mouseX, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    // The scale translates physical distance into a width size (creates the OS Dock effect)
    const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    const content = (
        <motion.div
            ref={ref}
            onMouseEnter={onHoverEnter}
            style={{ width, height: width }}
            className={`group relative flex items-center justify-center rounded-2xl transition-colors z-20 ${isActive ? 'text-emerald-500 font-bold' : 'text-slate-600 dark:text-gray-400'
                }`}
        >
            <Icon className={`w-1/2 h-1/2 relative z-20 ${isHovered && !isActive ? 'text-emerald-500' : ''} transition-colors duration-300`} />

            {/* Context Tooltip showing the label above the icon */}
            <span className="absolute -top-12 left-1/2 -translate-x-1/2 scale-0 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900/90 dark:bg-black/90 backdrop-blur-md rounded-lg opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 whitespace-nowrap shadow-xl border border-white/10 z-50 pointer-events-none">
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

export function FluidGlassBar() {
    const mouseX = useMotionValue(Infinity);
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [session, setSession] = useState<Session | null>(null);
    const [mounted, setMounted] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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

    const navItems = session
        ? [
            { icon: Home, label: 'Home', href: '/', id: 'home' },
            { icon: Sparkles, label: 'Generate', href: '/generate', id: 'gen' },
            { icon: Clock, label: 'History', href: '/history', id: 'hist' },
            { type: 'divider', id: 'div1' },
            { icon: ThemeIcon, label: `Theme: ${theme}`, onClick: cycleTheme, id: 'theme' },
            { icon: LogOut, label: 'Log Out', onClick: () => signOut(), id: 'auth' }
        ]
        : [
            { icon: Home, label: 'Home', href: '/', id: 'home' },
            { type: 'divider', id: 'div1' },
            { icon: ThemeIcon, label: `Theme: ${theme}`, onClick: cycleTheme, id: 'theme' },
            { icon: LogIn, label: 'Log In', href: '/login', id: 'auth' }
        ];

    return (
        /* Hidden on mobile (handled by MobileDock.tsx) */
        <div className="hidden md:flex fixed justify-center bottom-8 left-0 right-0 z-50 pointer-events-none">

            {/* The main Premium Glass Container (pointer-events restored for interaction) */}
            <motion.div
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => {
                    mouseX.set(Infinity);
                    setHoveredIndex(null);
                }}
                className="pointer-events-auto relative flex h-[72px] items-end gap-3 rounded-full bg-slate-50/10 dark:bg-white-[0.03] px-4 pb-4 border border-white/20 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.3)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.1)] backdrop-blur-3xl"
            >
                {navItems.map((item, index) => {
                    if (item.type === 'divider') {
                        return <div key={item.id} className="w-[1.5px] h-[36px] bg-slate-300 dark:bg-white/15 rounded-full mx-1 self-center" />;
                    }

                    const isActive = item.href ? (item.href === '/' ? pathname === '/' : pathname?.startsWith(item.href)) : false;
                    const isHovered = hoveredIndex === index;

                    return (
                        <div key={item.id} className="relative z-20">

                            {/* The Fluid Liquid Glass Background Highlighter */}
                            <AnimatePresence>
                                {isHovered && (
                                    <motion.div
                                        layoutId="fluid-glass-hover-bg"
                                        className="absolute inset-0 bg-white/40 dark:bg-white/10 backdrop-blur-lg rounded-2xl z-0 shadow-sm border border-white/40 dark:border-white/5"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 30, // Extremely snappy but fluid movement
                                            mass: 0.8
                                        }}
                                    />
                                )}
                            </AnimatePresence>

                            {/* The Icon & Scale Physics */}
                            <FluidNavItem
                                mouseX={mouseX}
                                icon={item.icon!}
                                label={item.label!}
                                href={item.href}
                                onClick={item.onClick}
                                isActive={isActive}
                                isHovered={isHovered}
                                onHoverEnter={() => setHoveredIndex(index)}
                            />
                        </div>
                    );
                })}
            </motion.div>
        </div>
    );
}
