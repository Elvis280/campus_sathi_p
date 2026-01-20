import React from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
    className?: string;
}

export const ScrollReveal = ({
    children,
    width = "fit-content",
    delay = 0,
    direction = "up",
    className = ""
}: ScrollRevealProps) => {
    const getVariants = () => {
        const hidden = {
            opacity: 0,
            y: direction === "up" ? 75 : direction === "down" ? -75 : 0,
            x: direction === "left" ? 75 : direction === "right" ? -75 : 0,
        };

        return {
            hidden,
            visible: {
                opacity: 1,
                y: 0,
                x: 0,
            },
        };
    };

    return (
        <div style={{ position: "relative", width, overflow: "hidden" }} className={className}>
            <motion.div
                variants={getVariants()}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
            >
                {children}
            </motion.div>
        </div>
    );
};
