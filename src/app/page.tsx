import Link from 'next/link';
import { Bot, FileText, MessageSquare, Zap, History, LogIn, ArrowRight, CheckCircle2, Link as LinkIcon, Phone, Search } from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import { LogoTicker } from '@/components/LogoTicker';
import { createClient } from '@/utils/supabase/server';

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden overflow-x-hidden">
      {/* Top Navigation */}
      <div className="absolute top-4 right-4 md:top-8 md:right-8 flex gap-4 z-50">
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

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-4 text-center lg:pt-48 lg:pb-32">
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-4 ring-1 ring-emerald-500/20">
            <Zap className="h-4 w-4" />
            <span>OutreachAI 2.0 is now live</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 drop-shadow-sm">
            Close More Deals<br />With AI Precision
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Stop wasting hours on prospect research. Generate deeply personalized, multi-channel sales scripts in seconds, tailored perfectly to every lead.
          </p>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={user ? "/generate" : "/login"}>
              <button className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-emerald-600 px-10 font-medium text-white transition-all duration-300 hover:bg-emerald-700 hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(5,150,105,0.6)]">
                <span className="mr-2">{user ? "Create Campaign" : "Start For Free"}</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
            {!user && (
              <Link href="/login">
                <button className="inline-flex h-14 items-center justify-center rounded-full px-10 font-medium text-gray-300 transition-colors hover:text-white hover:bg-white/5">
                  View Demo
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Hero 3D floating dashboard mockup */}
        <div className="max-w-6xl mx-auto mt-20 relative animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 bottom-0 top-1/2" />
          <GlassCard className="p-4 md:p-8 border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl skew-y-2 md:-rotate-2 transform-gpu">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="text-xs text-gray-500 font-medium ml-4">Campaign Generator</div>
            </div>
            <div className="space-y-4">
              <div className="h-8 w-1/3 bg-white/5 rounded-md animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-white/5 rounded flex items-center px-4"><span className="text-xs text-emerald-400/50">"Our AI detected that this prospect recently implemented Next.js..."</span></div>
                <div className="h-4 w-5/6 bg-white/5 rounded"></div>
                <div className="h-4 w-4/6 bg-white/5 rounded"></div>
              </div>
              <div className="flex gap-4 pt-4">
                <div className="h-24 w-1/3 bg-emerald-500/10 rounded-lg border border-emerald-500/20 p-4">
                  <FileText className="h-6 w-6 text-emerald-400 mb-2" />
                  <div className="h-2 w-1/2 bg-emerald-400/40 rounded"></div>
                </div>
                <div className="h-24 w-1/3 bg-cyan-500/10 rounded-lg border border-cyan-500/20 p-4">
                  <LinkIcon className="h-6 w-6 text-cyan-400 mb-2" />
                  <div className="h-2 w-1/2 bg-cyan-400/40 rounded"></div>
                </div>
                <div className="h-24 w-1/3 bg-teal-500/10 rounded-lg border border-teal-500/20 p-4">
                  <Phone className="h-6 w-6 text-teal-400 mb-2" />
                  <div className="h-2 w-1/2 bg-teal-400/40 rounded"></div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* LOGO TICKER */}
      <LogoTicker />

      {/* FEATURE ZIG-ZAG */}
      <section className="py-24 px-4 w-full max-w-7xl mx-auto space-y-32 relative z-10">

        {/* Feature 1 */}
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center justify-center p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Bot className="h-8 w-8" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Intelligent Prospect Research</h2>
            <p className="text-lg text-gray-400 leading-relaxed">
              Stop spending 30 minutes reading through company "About Us" pages. OutreachAI instantly synthesizes prospect data to uncover the hidden pain points and angles that actually convert.
            </p>
            <ul className="space-y-3 pt-4">
              {['Deep account analysis', 'Pain-point identification', 'Pre-emptive objection handling'].map((item, i) => (
                <li key={i} className="flex items-center text-gray-300">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mr-3" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 w-full">
            <GlassCard className="p-6 border-white/5 bg-gradient-to-br from-white/5 to-transparent relative">
              <div className="absolute inset-0 bg-emerald-500/5 blur-3xl -z-10 rounded-full" />
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center"><Search className="h-5 w-5 mr-2 text-emerald-400" /> Generated Analysis</h3>
              <div className="text-sm text-gray-300 space-y-4 font-mono leading-relaxed opacity-80">
                <p>&#62; Target: Vercel (VP of Product)</p>
                <p>&#62; Insight: Recent focus on edge network latency and App Router migrations.</p>
                <p>&#62; Angle: Position DevPulse as a caching layer perfectly tailored for Vercel's serverless architecture, directly addressing deployment speed.</p>
                <p className="text-emerald-400 animate-pulse">_</p>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Feature 2: Reverse */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-20">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center justify-center p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Zap className="h-8 w-8" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Omni-Channel Scripts</h2>
            <p className="text-lg text-gray-400 leading-relaxed">
              A great email isn't enough. OutreachAI concurrently generates perfectly formatted scripts for Email, LinkedIn DMs, and Cold Calling—ensuring you have the right touch for every medium.
            </p>
            <ul className="space-y-3 pt-4">
              {['Optimized Subject Lines', '300-char LinkedIn limits', 'Conversational phone scripts'].map((item, i) => (
                <li key={i} className="flex items-center text-gray-300">
                  <CheckCircle2 className="h-5 w-5 text-cyan-500 mr-3" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 w-full flex flex-col gap-4">
            <GlassCard className="p-4 border-l-4 border-l-emerald-500 bg-white/5">
              <div className="text-xs text-gray-500 mb-1 uppercase font-bold tracking-wider">Email Script</div>
              <div className="text-sm text-gray-300 line-clamp-2">"Hi Lee, noticed your team's huge push on App Router performance..."</div>
            </GlassCard>
            <GlassCard className="p-4 border-l-4 border-l-cyan-500 bg-white/5 ml-8 transform transition-transform hover:-translate-y-1">
              <div className="text-xs text-gray-500 mb-1 uppercase font-bold tracking-wider">LinkedIn DM</div>
              <div className="text-sm text-gray-300 line-clamp-2">"Great talk on Edge computing at React Conf! I built DevPulse to tackle..."</div>
            </GlassCard>
            <GlassCard className="p-4 border-l-4 border-l-teal-500 bg-white/5 ml-16 transform transition-transform hover:-translate-y-1">
              <div className="text-xs text-gray-500 mb-1 uppercase font-bold tracking-wider">Cold Call / Voicemail</div>
              <div className="text-sm text-gray-300 line-clamp-2">"Hey Lee, I'll be brief. I know latency is a huge focus right now..."</div>
            </GlassCard>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center justify-center p-3 rounded-xl bg-teal-500/10 text-teal-400">
              <History className="h-8 w-8" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Cloud Synced History</h2>
            <p className="text-lg text-gray-400 leading-relaxed">
              Never lose a winning script. Every campaign you generate is securely archived in the cloud, allowing you to instantly revisit and iterate on your best performing outreach efforts.
            </p>
          </div>
          <div className="flex-1 w-full">
            <GlassCard className="p-6 bg-black/40 border-white/10">
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`p-4 rounded-lg bg-white/5 border border-white/5 ${i === 1 ? 'ring-1 ring-emerald-500/50' : ''}`}>
                    <div className="h-3 w-2/3 bg-gray-500/20 rounded mb-2"></div>
                    <div className="h-2 w-1/2 bg-gray-500/10 rounded"></div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* CTA FOOTER */}
      <section className="mt-20 py-32 px-4 relative z-10 border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-emerald-900/20 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-white px-4">
            Ready to scale your outreach?
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Join the top sales professionals leveraging AI to book more meetings in less time.
          </p>
          <Link href={user ? "/generate" : "/login"}>
            <button className="group relative inline-flex h-16 items-center justify-center overflow-hidden rounded-full bg-emerald-600 px-12 font-medium text-white transition-all duration-300 hover:bg-emerald-500 hover:shadow-[0_0_50px_-10px_rgba(5,150,105,0.8)] focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-black">
              <span className="text-lg font-bold mr-2">{user ? "Go to Dashboard" : "Create Free Account"}</span>
              <Zap className="h-5 w-5 transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-100%] group-hover:animate-shine" />
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
