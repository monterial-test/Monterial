import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NextLink from "next/link";
import { FooterProvider } from "../context/FooterContext";
import { ProjectProvider } from "../context/ProjectContext";
import { LanguageProvider } from "../context/LanguageContext";
import Footer from "../components/Footer";
import SecurityVerification from "../components/SecurityVerification";
import ContentProtection from "../components/ContentProtection";
import Header from "../components/Header";
import SmoothScroll from "../components/SmoothScroll";
import { ThemeProvider } from "../context/ThemeContext";
import React from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Monterial Construction | Premium Engineering & Infrastructure",
    template: "%s | Monterial Construction"
  },
  description: "Monterial Construction is a premier global firm specializing in skyscrapers, infrastructure, and luxury residential projects. Excellence in engineering since 2010.",
  keywords: ["Construction", "Infrastructure", "Engineering", "Architecture", "Luxury Building", "Monterial"],
  authors: [{ name: "Monterial Group" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://monterial-construction.com",
    title: "Monterial Construction | Building the Future",
    description: "Leading construction company delivering modern architectural and infrastructure projects.",
    siteName: "Monterial Construction",
    images: [{
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Monterial Construction Portfolio"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Monterial Construction",
    description: "Excellence in infrastructure and modern building solutions.",
    images: ["/og-image.jpg"],
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://monterial-construction.com/#organization",
      "name": "Monterial Construction",
      "url": "https://monterial-construction.com",
      "logo": "https://monterial-construction.com/logo.webp",
      "sameAs": [
        "https://facebook.com/monterial",
        "https://linkedin.com/company/monterial"
      ]
    },
    {
      "@type": "LocalBusiness",
      "name": "Monterial Construction Head Office",
      "image": "https://monterial-construction.com/construction_hero.png",
      "@id": "https://monterial-construction.com/#localbusiness",
      "url": "https://monterial-construction.com",
      "telephone": "+1234567890",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Building B219, The Courtyard",
        "addressLocality": "Sheikh Zayed",
        "addressRegion": "Giza",
        "addressCountry": "EG"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 30.0131,
        "longitude": 30.9833
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Saturday", "Sunday"],
        "opens": "09:00",
        "closes": "17:00"
      }
    }
  ]
};

const sitelinksSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "SiteNavigationElement",
      "position": 1,
      "name": "Home",
      "description": "Our home page with latest news and company overview.",
      "url": "https://monterial-construction.com"
    },
    {
      "@type": "SiteNavigationElement",
      "position": 2,
      "name": "Projects",
      "description": "Explore our portfolio of high-end construction projects.",
      "url": "https://monterial-construction.com/projects"
    },
    {
      "@type": "SiteNavigationElement",
      "position": 3,
      "name": "About Us",
      "description": "Learn about our legacy, mission, and vision.",
      "url": "https://monterial-construction.com/about"
    },
    {
      "@type": "SiteNavigationElement",
      "position": 4,
      "name": "Contact",
      "description": "Get in touch with our engineering team.",
      "url": "https://monterial-construction.com/contact"
    }
  ]
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
      </head>
      <body suppressHydrationWarning>
        <div className="min-h-full flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(sitelinksSchema) }}
          />
          <LanguageProvider>
            <ThemeProvider>
              <SecurityVerification>
                <ContentProtection />
                <FooterProvider>
                  <ProjectProvider>
                    <Header />

                    <SmoothScroll>
                      <main className="flex-grow">
                        {children}
                      </main>
                    </SmoothScroll>

                    <Footer />
                  </ProjectProvider>
                </FooterProvider>
              </SecurityVerification>
            </ThemeProvider>
          </LanguageProvider>
          <Analytics />
          <SpeedInsights />
        </div>
      </body>
    </html>
  );
}
