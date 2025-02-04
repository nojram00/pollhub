import { Guest } from "@/utils/auth-manager";
import React from "react";

export default async function AuthLayer({ children } : {
    children : React.ReactNode
})
{

    return (
        <div>
            { children }
        </div>
    );
}