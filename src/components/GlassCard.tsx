
import * as React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

export function GlassCard({ children, className, ...props }: GlassCardProps) {
    return (
        <div
            className={cn(
                "bg-white/10 dark:bg-black/30 backdrop-blur-lg border border-white/20 dark:border-white/10 rounded-2xl shadow-xl",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
