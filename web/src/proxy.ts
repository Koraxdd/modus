import { NextResponse, type NextRequest } from "next/server"

const protectedPaths = ["/dashboard", "/onboarding"]
const authPaths = ["/login", "/register"]
const publicOnlyPaths = ["/", ...authPaths]

export function proxy(request: NextRequest) {
    const refreshToken = request.cookies.get("refreshToken")?.value
    const { pathname } = request.nextUrl

    const isProtected = protectedPaths.some((path) => pathname.startsWith(path))
    const isPublicOnly = publicOnlyPaths.includes(pathname)

    if (isProtected && !refreshToken) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    if (isPublicOnly && refreshToken) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/dashboard/:path*", "/onboarding", "/login", "/register", "/"],
}
