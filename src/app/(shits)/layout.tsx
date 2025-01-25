import React from "react";
import Link from "next/link";

export default function ShittyLayout({ children } : {
    children: React.ReactNode
})
{
    return (
        <div className="relative flex flex-col items-center justify-center w-full gap-5">
            <header className="top-0 left-0 w-full p-5 bg-base-200">
                <div className="flex items-center justify-between w-full">
                <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box gap-5">
                    <li><Link href={"/polls"}>Polls</Link></li>
                    <li><Link href={"/polls/create"}>Create Poll</Link></li>
                    {/* <li><a>Item 3</a></li> */}
                </ul>
                </div>
            </header>
            <div className="p-10 w-full">
                {children}
            </div>
        </div>
    )
}