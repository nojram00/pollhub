"use server";

import { cookies } from "next/headers";

export async function getFlashMessage()
{
    const flash = (await cookies()).get("flash");

    return flash;
}

export async function setFlashMessage(message : string)
{
    (await cookies()).set("flash", message);
}