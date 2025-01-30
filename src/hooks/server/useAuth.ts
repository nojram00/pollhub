"use server"
import { User } from "@/models/user.model";
import { NextRequest } from "next/server";
export async function useAuth (request : NextRequest) : Promise<User | null>{

    const url = request.nextUrl.clone();
    url.pathname = "/api/get-auth";
    const response = await fetch(url,{
        headers : {
            Authorization : "Bearer " + request.cookies.get("session_id")?.value
        }
    });

    const data = await response.json();

    if(data.session !== null)
    {
        return data.session as User;
    }

    return null;
};