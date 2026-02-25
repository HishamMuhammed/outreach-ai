'use client';

import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';

interface SpotlightCardProps {
    children: React.ReactNode;
    className?: string;
    spotlightColor?: string;
}

export const SpotlightCard = ({ children, className = '', spotlightColor = 'rgba(16, 185, 129, 0.15)' }: SpotlightCardProps) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className={`group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-xl shadow-lg transition-transform duration-500 hover:shadow-2xl ${className}`}
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 dark:group-hover:opacity-60"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              ${spotlightColor},
              transparent 80%
            )
          `,
                }}
            />
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </div>
    );
};
