import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/jwt";

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Only protect /monterial-hq and its sub-paths
    if (pathname.startsWith("/monterial-hq")) {
        const token = request.cookies.get("admin_session")?.value;

        if (!token) {
            return NextResponse.next();
        }

        const payload = await verifyToken(token);
        
        if (!payload || payload.role !== "admin") {
             return NextResponse.next();
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/monterial-hq/:path*"],
};
