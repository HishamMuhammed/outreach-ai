import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { LogOut, Zap } from 'lucide-react';
import { signOut } from '@/app/auth/actions';

export async function AppHeader() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Do not render the header on the homepage
    if (!user) {
        return null;
    }

    return (
        <header className="w-full border-b border-white/10 bg-black/20 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-emerald-500/20 p-2 rounded-lg group-hover:bg-emerald-500/30 transition-colors">
                        <Zap className="h-5 w-5 text-emerald-400" />
                    </div>
                    <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
                        OutreachAI
                    </span>
                </Link>

                <div className="flex items-center gap-4">
                    <p className="text-sm text-gray-400 hidden sm:block">
                        {user.email}
                    </p>
                    <div className="w-px h-6 bg-white/10 hidden sm:block" />
                    <form action={signOut}>
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-red-500/20 rounded-lg transition-colors group"
                        >
                            <LogOut className="h-4 w-4 group-hover:text-red-400 transition-colors" />
                            Sign Out
                        </button>
                    </form>
                </div>
            </div>
        </header>
    );
}
