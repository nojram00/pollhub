import { UserModel } from "@/models/user.model";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const { email, username, password } = await req.json();
    const user = await (new UserModel()).registerUser({
        email,
        username,
        password
    });
}