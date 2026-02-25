
'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeSwitcher() {
    const { setTheme, resolvedTheme } = useTheme();

    return (
        <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="rounded-full p-2 bg-black/5 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/20 hover:bg-black/10 dark:hover:bg-white/20 transition-colors shadow-sm"
            aria-label="Toggle theme"
        >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500 dark:text-yellow-500" />
            <Moon className="absolute top-2 left-2 h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-slate-700 dark:text-emerald-400" />
            <span className="sr-only">Toggle theme</span>
        </button>
    );
}
