import React from "react";
import Link from "next/link";
import { getSession, logout } from "@/utils/auth-manager";
import LogoutButton from "@/components/logout-button";

export default async function ShittyLayout({ children } : {
    children: React.ReactNode
})
{
    const session = await getSession();

    return (
        <div className="relative flex flex-col items-center justify-center w-full gap-5">
            <header className="top-0 left-0 w-full p-5 bg-base-200">
                <div className="flex items-center justify-between w-full">
                    <ul className="menu menu-vertical w-full lg:menu-horizontal bg-base-200 rounded-box gap-5">
                        <li><Link href={"/polls"}>Polls</Link></li>
                        <li><Link href={"/polls/create"}>Create Poll</Link></li>
                        {/* <li><a>Item 3</a></li> */}
                        <div className="flex-1"></div>
                        { session === null && (
                            <>
                                <li><Link href={"/login"}>Login</Link></li>
                                <li><Link href={"/register"}>Register</Link></li>
                            </>
                        )}

                        { session !== null && (
                            <>
                                <li><LogoutButton/></li>
                            </>
                        )}
                    </ul>

                </div>
            </header>
            <div className="p-10 w-full">
                {children}
            </div>
        </div>
    )
}