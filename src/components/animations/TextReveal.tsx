'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface TextRevealProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
    once?: boolean;
}

export const TextReveal = ({
    children,
    delay = 0.2,
    className = '',
    once = true,
}: TextRevealProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: '-50px' });

    return (
        <div ref={ref} className={`overflow-hidden ${className}`}>
            <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1], // Deceleration curve
                    delay: delay,
                }}
            >
                {children}
            </motion.div>
        </div>
    );
};
