
import Link from 'next/link';
import { Bot, FileText, MessageSquare, Zap, History, LogIn } from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import { createClient } from '@/utils/supabase/server';

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-20 text-center relative overflow-hidden">

      {/* Top Navigation */}
      <div className="absolute top-4 right-4 md:top-8 md:right-8 flex gap-4">
        {user ? (
          <Link href="/history">
            <button className="flex items-center px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium">
              <History className="h-4 w-4 mr-2" />
              History Dashboard
            </button>
          </Link>
        ) : (
          <Link href="/login">
            <button className="flex items-center px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 transition-colors text-sm font-medium shadow-lg shadow-emerald-500/20">
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </button>
          </Link>
        )}
      </div>

      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400 drop-shadow-sm">
          Transform Your Sales Outreach with AI
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Supercharge your workflow. Generate personalized scripts, extract talking points, and handle objections in seconds with OutreachAI.
        </p>

        <div>
          {user ? (
            <Link href="/generate">
              <button className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-emerald-600 px-10 font-medium text-white transition-all duration-300 hover:bg-emerald-700 hover:w-64 w-56 hover:shadow-[0_0_40px_-10px_rgba(5,150,105,0.5)]">
                <span className="mr-2">Create Your Outreach</span>
                <Zap className="h-5 w-5 transition-transform group-hover:rotate-12" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-100%] group-hover:animate-shine" />
              </button>
            </Link>
          ) : (
            <Link href="/login">
              <button className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-emerald-600 px-10 font-medium text-white transition-all duration-300 hover:bg-emerald-700 hover:w-64 w-56 hover:shadow-[0_0_40px_-10px_rgba(5,150,105,0.5)]">
                <span className="mr-2">Get Started Free</span>
                <Zap className="h-5 w-5 transition-transform group-hover:rotate-12" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-100%] group-hover:animate-shine" />
              </button>
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 text-left animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
          {[
            {
              title: "Smart Analysis",
              desc: "Deep dive into lead data to uncover hidden opportunities.",
              icon: Bot,
              color: "text-emerald-500"
            },
            {
              title: "Perfect Scripts",
              desc: "Generate tone-matched outreach scripts tailored to your prospect.",
              icon: FileText,
              color: "text-teal-500"
            },
            {
              title: "Objection Handling",
              desc: "Be prepared for any pushback with AI-suggested responses.",
              icon: MessageSquare,
              color: "text-cyan-500"
            }
          ].map((feature, i) => (
            <GlassCard key={i} className="p-8 hover:scale-105 transition-transform duration-300">
              <feature.icon className={`h-10 w-10 mb-4 ${feature.color}`} />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
