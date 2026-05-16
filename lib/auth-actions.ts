"use server";

import { signToken } from "./jwt";
import { cookies } from "next/headers";

export async function verifyAdminPassword(password: string) {
    const correctPassword = process.env.ADMIN_PASSWORD;
    
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!correctPassword) {
        return { success: false, error: "Server Configuration Error" };
    }

    if (password === correctPassword) {
        // Generate Token
        const token = await signToken({ role: "admin" });
        
        // Set Cookie
        const cookieStore = await cookies();
        cookieStore.set("admin_session", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 3600, // 1 hour
            path: "/",
        });

        return { success: true };
    }

    return { success: false, error: "Invalid Credentials" };
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete("admin_session");
}

export async function checkSession() {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;
    return !!token;
}
