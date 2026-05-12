import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/jwt";

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Only protect /admin and its sub-paths
    if (pathname.startsWith("/admin")) {
        const token = request.cookies.get("admin_session")?.value;

        if (!token) {
            // No token found, we allow access only if they are on the login view 
            // However, our admin page handles the login view itself if !isAuthenticated.
            // To make it fully secure on server-side, check for token validity.
            return NextResponse.next();
        }

        const payload = await verifyToken(token);
        
        if (!payload || payload.role !== "admin") {
             // Invalid token, treat as not logged in
             return NextResponse.next();
        }

        // If logged in and trying to access /admin/login (if we had one), redirect to /admin
        // For now, /admin is the only path.
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/admin/:path*"],
};
