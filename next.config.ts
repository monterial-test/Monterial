import type { NextConfig } from "next";

const securityHeaders = [
    {
        key: 'Content-Security-Policy',
        value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' *.vercel-analytics.com *.vercel-speed-insights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: cdn.sanity.io; font-src 'self' data:; connect-src 'self' *.sanity.io *.vercel-analytics.com *.vercel-speed-insights.com; media-src 'self' data: blob:; frame-src 'self';",
    },
    {
        key: 'X-Frame-Options',
        value: 'DENY',
    },
    {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
    },
    {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin',
    },
    {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=()',
    },
    {
        key: 'Strict-Transport-Security',
        value: 'max-age=31536000; includeSubDomains; preload',
    },
];

const nextConfig: NextConfig = {
    poweredByHeader: false,
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
                port: '',
            },
        ],
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: securityHeaders,
            },
        ];
    },
};

// Bundle Analyzer configuration
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
