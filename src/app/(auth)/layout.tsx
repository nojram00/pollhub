import { Guest } from "@/utils/auth-manager";
import React from "react";

export default async function AuthLayer({ children } : {
    children : React.ReactNode
})
{
    await Guest();

    return (
        <div>
            { children }
        </div>
    );
}