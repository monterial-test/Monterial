"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1.0,
            touchMultiplier: 2.0,
            smoothTouch: false, // Use native touch scrolling for best mobile performance
            infinite: false,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Global Lenis Instance for use in other components if needed
        (window as any).lenis = lenis;

        return () => {
            lenis.destroy();
            (window as any).lenis = null;
        };
    }, []);

    return <>{children}</>;
}
