"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
    children: ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
}

export default function ScrollReveal({ 
    children, 
    width = "100%", 
    delay = 0.2,
    direction = "up"
}: ScrollRevealProps) {
    const variants = {
        hidden: { 
            opacity: 0, 
            y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
            x: direction === "left" ? 50 : direction === "right" ? -50 : 0
        },
        visible: { 
            opacity: 1, 
            y: 0, 
            x: 0 
        },
    };

    return (
        <div style={{ position: "relative", width, overflow: "hidden" }}>
            <motion.div
                variants={variants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay, ease: "easeOut" }}
            >
                {children}
            </motion.div>
        </div>
    );
}
