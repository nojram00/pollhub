import { SessionModel } from "@/models/session.model";
import { NextResponse } from "next/server";

export async function GET(request : Request){
    const auth = request.headers.get("Authorization");

    const session = auth?.split(" ")[1];

    if(session !== undefined)
    {
        const user = await SessionModel.instance.getSession(session as string);

        if(user !== null)
        {
            return NextResponse.json({
                session: user
            });
        }
    }

    return NextResponse.json({
        session: null,
        message : "No session found"
    }, {
        status : 404
    });
    
}