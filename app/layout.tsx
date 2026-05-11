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
import { ThemeProvider } from "../context/ThemeContext";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Monterial Constructions",
  description: "Monterial Constructions is a premier construction firm specializing in skyscrapers, infrastructure, and luxury residential projects. Explore our portfolio of innovative and sustainable building solutions.",
  keywords: ["Construction", "Infrastructure", "Engineering", "Commercial Building", "Luxury Residential", "Sustainability"],
  authors: [{ name: "Monterial Group" }],
  robots: "index, follow",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Monterial Constructions",
  "url": "https://monterial-construction.com",
  "logo": "https://monterial-construction.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1234567890",
    "contactType": "customer service",
    "areaServed": "Global",
    "availableLanguage": ["English", "Arabic"]
  },
  "sameAs": [
    "https://facebook.com/monterial",
    "https://linkedin.com/company/monterial"
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

                    <main className="flex-grow">
                      {children}
                    </main>

                    <Footer />
                  </ProjectProvider>
                </FooterProvider>
              </SecurityVerification>
            </ThemeProvider>
          </LanguageProvider>
        </div>
      </body>
    </html>
  );
}
