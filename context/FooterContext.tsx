"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { client } from "../lib/sanity";

// ... (interface FooterData and DEFAULT_FOOTER_DATA definitions ...)

interface FooterData {
    headOffice: string;
    headOfficeMapsUrl: string;
    branch1: string;
    branch1MapsUrl: string;
    branch2: string;
    branch2MapsUrl: string;
    openingHours: string;
    whatsapp: string;
    phone: string;
    email: string;
    facebookUrl: string;
    linkedinUrl: string;
    profilePdfUrl?: string;
}

const DEFAULT_FOOTER_DATA: FooterData = {
    headOffice: "Building B219, The Courtyard – sheikh Zayed – giza",
    headOfficeMapsUrl: "https://maps.google.com/?q=Building+B219+The+Courtyard+Sheikh+Zayed+Giza",
    branch1: "Vila 51w, khafra gate, Hadayek Al ahram – giza",
    branch1MapsUrl: "https://maps.google.com/?q=Hadayek+Al+Ahram+Giza",
    branch2: "1 Egypt – Aswan Agricultural Road, Front of the Intercity station – Asfwan – Esna center – Luxor",
    branch2MapsUrl: "https://maps.google.com/?q=Luxor+Egypt",
    openingHours: "Saturday to Thursday: 9AM - 5PM",
    whatsapp: "+2 010 912 649 48",
    phone: "+2 011 110 492 14",
    email: "info@monterial-constructions.com",
    facebookUrl: "#",
    linkedinUrl: "#"
};

interface FooterContextType {
    footerData: FooterData;
    updateFooterData: (newData: Partial<FooterData>) => void;
}

const FooterContext = createContext<FooterContextType | undefined>(undefined);

export function FooterProvider({ children }: { children: React.ReactNode }) {
    const [footerData, setFooterData] = useState<FooterData>(DEFAULT_FOOTER_DATA);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                // Fetch the singleton settings document with resolved PDF URL
                const settings = await client.fetch(`*[_type == "settings"][0] {
                    ...,
                    "profilePdfUrl": companyProfileFile.asset->url
                }`);
                if (settings) {
                    // Filter out internal sanity fields
                    const { _id, _type, _rev, _updatedAt, _createdAt, companyProfileFile, ...cleanSettings } = settings;
                    setFooterData({ ...DEFAULT_FOOTER_DATA, ...cleanSettings });
                }
            } catch (error) {
                console.error("Failed to fetch settings from Sanity", error);
            }
        };

        fetchSettings();
    }, []);

    const updateFooterData = (newData: Partial<FooterData>) => {
        const updated = { ...footerData, ...newData };
        setFooterData(updated);
        // We'll stop using localStorage as the source of truth
    };

    return (
        <FooterContext.Provider value={{ footerData, updateFooterData }}>
            {children}
        </FooterContext.Provider>
    );
}

export function useFooter() {
    const context = useContext(FooterContext);
    if (context === undefined) {
        throw new Error("useFooter must be used within a FooterProvider");
    }
    return context;
}
