import { NextResponse, type NextRequest } from "next/server"

const protectedPaths = ["/dashboard", "/onboarding"]
const authPaths = ["/login", "/register"]
const publicOnlyPaths = ["/", ...authPaths]

export function proxy(request: NextRequest) {
    const token = request.cookies.get("token")?.value
    const { pathname } = request.nextUrl

    const isProtected = protectedPaths.some((path) => pathname.startsWith(path))
    const isPublicOnly = publicOnlyPaths.includes(pathname)

    if (isProtected && !token) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    if (isPublicOnly && token) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/onboarding/:path*",
        "/login",
        "/register",
        "/",
    ],
}
