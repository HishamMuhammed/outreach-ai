import Link from 'next/link';
import { Zap } from 'lucide-react';

export function AppHeader() {
    return (
        <header className="w-full bg-transparent absolute top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group cursor-pointer">
                    <div className="bg-emerald-500/10 dark:bg-emerald-500/20 p-2 rounded-xl group-hover:bg-emerald-500/20 dark:group-hover:bg-emerald-500/30 transition-all shadow-sm border border-emerald-500/20 group-hover:border-emerald-500/40">
                        <Zap className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="font-extrabold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">
                        OutreachAI
                    </span>
                </Link>
            </div>
        </header>
    );
}
