'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface FadeUpProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    once?: boolean;
}

export const FadeUp = ({
    children,
    className = '',
    delay = 0,
    once = true,
}: FadeUpProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: '-50px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1], // Very subtle spring deceleration
                delay: delay,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
