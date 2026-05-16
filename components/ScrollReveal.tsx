"use client";

import { motion } from "framer-motion";
import { useState, useEffect, ReactNode } from "react";

interface ScrollRevealProps {
    children: ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
    distance?: number;
}

export default function ScrollReveal({ 
    children, 
    width = "100%", 
    delay = 0,
    direction = "up",
    distance = 40
}: ScrollRevealProps) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    const variants = {
        hidden: { 
            opacity: 0, 
            y: direction === "up" ? distance : direction === "down" ? -distance : 0,
            x: direction === "left" ? distance : direction === "right" ? -distance : 0,
            scale: isMobile ? 1 : 0.98, // Skip scale on mobile for performance
        },
        visible: { 
            opacity: 1, 
            y: 0, 
            x: 0,
            scale: 1,
        },
    };

    return (
        <motion.div
            style={{ position: "relative", width }}
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: isMobile ? "-20px" : "-50px" }}
            transition={isMobile ? {
                duration: 0.5,
                delay: delay,
                ease: "easeOut"
            } : { 
                type: "spring",
                stiffness: 50,
                damping: 20,
                mass: 1,
                delay: delay,
                opacity: { duration: 0.8 }
            }}
        >
            {children}
        </motion.div>
    );
}
