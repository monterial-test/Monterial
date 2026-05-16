"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Do not initialize Lenis on mobile devices to improve INP and TBT
        if (window.innerWidth < 768) {
            return;
        }

        const lenis = new Lenis({
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1.0,
            touchMultiplier: 2.0,
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
