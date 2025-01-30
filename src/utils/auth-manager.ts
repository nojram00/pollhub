"use server";
import { SessionModel } from "@/models/session.model";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function Auth() {

    const session = (await cookies()).get("session_id");
    const auth = await SessionModel.instance.getSession(session?.value as string);
    if(auth === null)
    {
        return false;
    }

    return true;
}

export async function Guest()
{
    const session = (await cookies()).get("session_id");
    const auth = await SessionModel.instance.getSession(session?.value as string);
    if(auth !== null)
    {
        return false;
    }

    return true;
}

export async function logout() {
    const session = (await cookies()).get("session_id");
    return await SessionModel.instance.deleteSession(session?.value as string);
}

export async function getSession() {
    const session = (await cookies()).get("session_id");
    return await SessionModel.instance.getSession(session?.value as string);
}

export async function createSession(user_id : string) {
    const c = await cookies();
    const session = await SessionModel.instance.createSession(user_id);
    c.set("session_id", session.data.session_id);
}