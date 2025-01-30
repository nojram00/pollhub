"use client"
import Image from "next/image";

export default function MainLoadingScreen()
{
    return(
        <div>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="flex flex-col items-center justify-center gap-5">
                    <Image src="/tenor.gif" width={200} height={200} alt="loading"/>
                </div>
            </div>
        </div>
    )
}