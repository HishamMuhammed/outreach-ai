import { Building, Globe, Zap, Network, Shield, Cpu, Cloud, Database } from 'lucide-react';

export function LogoTicker() {
    // Array of generic but sleek "tech" logos utilizing Lucide icons
    const logos = [
        { icon: Globe, name: 'Acme Global' },
        { icon: Zap, name: 'Bolt Energy' },
        { icon: Network, name: 'Nexus Systems' },
        { icon: Shield, name: 'Aegis Security' },
        { icon: Building, name: 'Pinnacle Corp' },
        { icon: Cpu, name: 'Quantum Core' },
        { icon: Cloud, name: 'Stratus Cloud' },
        { icon: Database, name: 'DataFlow Inc.' },
    ];

    return (
        <div className="py-24 bg-slate-50 dark:bg-black/40 border-y border-slate-200 dark:border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
                <p className="text-sm font-bold tracking-wider text-slate-800 dark:text-gray-500 uppercase">
                    Empowering top-tier sales teams worldwide
                </p>
            </div>

            {/* The infinite ticker container */}
            <div className="relative flex overflow-hidden group w-full">
                {/* 
                    We render two identical blocks that animate continuously to the left. 
                    Using min-w-max ensures they never squish or overlap on small screens.
                */}
                <div className="flex space-x-12 sm:space-x-16 items-center w-max min-w-max animate-marquee group-hover:pause pr-12 sm:pr-16">
                    {logos.map((logo, index) => (
                        <div key={`logo-1-${index}`} className="flex items-center space-x-2 text-slate-800 dark:text-gray-500 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors opacity-70 dark:opacity-50 hover:opacity-100 cursor-default grayscale hover:grayscale-0">
                            <logo.icon className="h-6 w-6 sm:h-8 sm:w-8" />
                            <span className="text-lg sm:text-xl font-black tracking-tight whitespace-nowrap">{logo.name}</span>
                        </div>
                    ))}
                </div>
                <div className="flex space-x-12 sm:space-x-16 items-center w-max min-w-max animate-marquee group-hover:pause pr-12 sm:pr-16" aria-hidden="true">
                    {logos.map((logo, index) => (
                        <div key={`logo-2-${index}`} className="flex items-center space-x-2 text-slate-800 dark:text-gray-500 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors opacity-70 dark:opacity-50 hover:opacity-100 cursor-default grayscale hover:grayscale-0">
                            <logo.icon className="h-6 w-6 sm:h-8 sm:w-8" />
                            <span className="text-lg sm:text-xl font-black tracking-tight whitespace-nowrap">{logo.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
