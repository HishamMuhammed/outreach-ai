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
        <div className="py-24 bg-black/40 border-y border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
                <p className="text-sm font-semibold tracking-wider text-gray-500 uppercase">
                    Empowering top-tier sales teams worldwide
                </p>
            </div>

            {/* The infinite ticker container */}
            <div className="relative flex overflow-hidden group">
                {/* 
                    We render two identical blocks that animate continuously to the left. 
                    Adding a custom Tailwind animate-marquee class will make this loop seamlessly. 
                */}
                <div className="flex space-x-16 items-center min-w-full justify-around animate-marquee group-hover:pause">
                    {logos.map((logo, index) => (
                        <div key={`logo-1-${index}`} className="flex items-center space-x-2 text-gray-500 hover:text-emerald-400 transition-colors opacity-50 hover:opacity-100 cursor-default grayscale hover:grayscale-0">
                            <logo.icon className="h-8 w-8" />
                            <span className="text-xl font-bold tracking-tight">{logo.name}</span>
                        </div>
                    ))}
                </div>
                <div className="flex space-x-16 items-center min-w-full justify-around animate-marquee group-hover:pause absolute top-0" style={{ left: '100%' }}>
                    {logos.map((logo, index) => (
                        <div key={`logo-2-${index}`} className="flex items-center space-x-2 text-gray-500 hover:text-emerald-400 transition-colors opacity-50 hover:opacity-100 cursor-default grayscale hover:grayscale-0">
                            <logo.icon className="h-8 w-8" />
                            <span className="text-xl font-bold tracking-tight">{logo.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
