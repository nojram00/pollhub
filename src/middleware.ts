import { NextRequest, NextResponse } from "next/server";

const protectedRoutes : string[] = [
    '/polls/create'
]

export default async function Middleware(request : NextRequest)
{
    const { protocol, host } = request.nextUrl;
    const session = await fetch(`${protocol}//${host}/api/get-auth`, {})
    const data : { session : any | null } = await session.json();

    // console.log("Session: ",session.json());
    console.log("Request: ",request.nextUrl.pathname);

    if(request.nextUrl.pathname === "/login" && data !== null)
    {
        const url = request.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
    }

    if(protectedRoutes.includes(request.nextUrl.pathname) && data.session === null)
    {
        const url = request.nextUrl.clone();
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }


    return NextResponse.next();
}


export const config = {
    matcher : ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|*.gif).*)']
}