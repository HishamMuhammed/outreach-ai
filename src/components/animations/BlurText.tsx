'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface BlurTextProps {
    text: string;
    delay?: number;
    className?: string;
    direction?: 'up' | 'down' | 'left' | 'right';
    once?: boolean;
}

export const BlurText = ({
    text,
    delay = 0.05,
    className = '',
    direction = 'up',
    once = true,
}: BlurTextProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: '-50px' });

    // Map direction to Framer Motion initial y/x values
    const getDirectionOffset = () => {
        switch (direction) {
            case 'up':
                return { y: 20 };
            case 'down':
                return { y: -20 };
            case 'left':
                return { x: 20 };
            case 'right':
                return { x: -20 };
            default:
                return { y: 20 };
        }
    };

    const initialOffset = getDirectionOffset();

    return (
        <div ref={ref} className={`flex flex-wrap ${className}`}>
            {text.split(' ').map((word, index) => (
                <motion.span
                    key={index}
                    initial={{
                        opacity: 0,
                        filter: 'blur(10px)',
                        ...initialOffset,
                    }}
                    animate={
                        isInView
                            ? {
                                opacity: 1,
                                filter: 'blur(0px)',
                                x: 0,
                                y: 0,
                            }
                            : {}
                    }
                    transition={{
                        duration: 0.8,
                        ease: 'easeOut',
                        delay: index * delay,
                    }}
                    style={{ display: 'inline-block', whiteSpace: 'pre' }}
                    className={`mr-2 ${className}`}
                >
                    {word}
                </motion.span>
            ))}
        </div>
    );
};
