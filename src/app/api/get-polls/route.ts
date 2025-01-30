import { NextRequest, NextResponse } from "next/server";
import { PollModel } from "@/models/poll.model";

export async function GET(req : NextRequest) {
    const page = req.nextUrl.searchParams.get('page') ? parseInt(req.nextUrl.searchParams.get('page') as string) : 1;

    const pollModel = new PollModel();
    const polls = await pollModel.getPolls(page, 10);

    if (polls.data.length === 0) {
        return NextResponse.json({error : new Error("No polls found!")}, {
            status : 404
        });
    }
    
    return NextResponse.json(polls);
}