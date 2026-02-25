'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface ScrollFloatProps {
    text: string;
    className?: string;
    delay?: number;
    once?: boolean;
}

export const ScrollFloat = ({
    text,
    className = '',
    delay = 0.03,
    once = true,
}: ScrollFloatProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: '-50px' });

    // Split text into words to prevent characters from wrapping mid-word
    const words = text.split(' ');
    let globalCharIndex = 0;

    return (
        <span ref={ref} className={`inline-block ${className}`}>
            {words.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.27em] last:mr-0">
                    {Array.from(word).map((char, charIndex) => {
                        const currentIndex = globalCharIndex++;
                        return (
                            <motion.span
                                key={charIndex}
                                initial={{
                                    opacity: 0,
                                    y: 40,
                                    rotateZ: -10,
                                }}
                                animate={
                                    isInView
                                        ? {
                                            opacity: 1,
                                            y: 0,
                                            rotateZ: 0,
                                        }
                                        : {}
                                }
                                transition={{
                                    duration: 0.8,
                                    ease: [0.2, 0.65, 0.3, 0.9], // Custom spring-like standard easing
                                    delay: currentIndex * delay,
                                }}
                                style={{ display: 'inline-block' }}
                            >
                                {char}
                            </motion.span>
                        );
                    })}
                </span>
            ))}
        </span>
    );
};
