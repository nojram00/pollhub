"use server"
import { NextRequest, NextResponse } from "next/server";
import { useAuth } from "./hooks/server/useAuth";

const protectedRoutes : string[] = [
    '/polls/create'
]

export default async function Middleware(request : NextRequest)
{
    const session = await useAuth(request);

    console.log("Session: ", session);
    console.log("Request: ",request.nextUrl.pathname);

    if((request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/register") && session !== null)
    {
        const url = request.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
    }

    if(protectedRoutes.includes(request.nextUrl.pathname) && session === null)
    {
        const url = request.nextUrl.clone();
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}


export const config = {
    matcher : ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)']
}