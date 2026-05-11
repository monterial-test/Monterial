"use server";

import { createClient } from "@sanity/client";

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "dhtn8py6",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    useCdn: false,
    apiVersion: "2024-05-01",
    token: process.env.SANITY_WRITE_TOKEN,
});

/**
 * Updates the site settings document in Sanity
 */
export async function updateSiteSettings(data: any) {
    try {
        // Fetch the existing settings document ID or assume 'settings'
        const result = await client
            .patch("settings") // singleton ID is usually 'settings'
            .set(data)
            .commit();
        
        return { success: true, data: result };
    } catch (error: any) {
        console.error("Sanity Patch Error:", error);
        return { success: false, error: error.message };
    }
}

/**
 * Uploads a file to Sanity and links it to the settings
 */
export async function uploadCompanyProfile(file: File) {
    try {
        // 1. Upload asset to Sanity
        const asset = await client.assets.upload("file", file, {
            filename: file.name,
            contentType: file.type,
        });

        // 2. Link asset to settings document
        const result = await client
            .patch("settings")
            .set({
                companyProfileFile: {
                    _type: "file",
                    asset: {
                        _type: "reference",
                        _ref: asset._id,
                    },
                },
            })
            .commit();

        return { success: true, url: asset.url };
    } catch (error: any) {
        console.error("Sanity Upload Error:", error);
        return { success: false, error: error.message };
    }
}
