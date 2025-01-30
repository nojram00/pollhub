import { SessionModel } from "@/models/session.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request : NextRequest){
    const cookies = request.cookies;

    const session = cookies.get("session_id");

    if(session === undefined)
    {
        return NextResponse.json({
            session: null,
            message : "No session found"
        });
        // const url = request.nextUrl.clone()
        // url.pathname = "/login"
        // return NextResponse.redirect(url);
    }

    const user = await SessionModel.instance.getSession(session.value as string);

    // return NextResponse.json({
    //     session: user
    // })
    return NextResponse.next()
}