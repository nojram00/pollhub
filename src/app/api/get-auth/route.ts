import { SessionModel } from "@/models/session.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request : Request){
    const auth = request.headers.get("Authorization");

    const session = auth?.split(" ")[1];

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

    const user = await SessionModel.instance.getSession(session as string);

    // return NextResponse.json({
    //     session: user
    // })
    return NextResponse.json({
        session: user
    });
}