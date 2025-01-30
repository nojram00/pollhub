"use client"

import Image from "next/image"
import { useEffect } from "react"

export default function ErrorPage({
    error,
    reset
} : {
    error : Error & { digest? : string },
    reset : () => void
})
{

    useEffect(() => {
        console.error(error);
    }, [error])

    return(
        <div className="flex w-full flex-col items-center justify-center gap-5 p-10">
            <Image src="/banana-cat-transparent.gif" alt="Logo" width={400} height={400} />
            <h2>Opps!</h2>
            <span>Something went wrong! Please check the browser console for errors...</span>

            <div className="card-actions justify-end">
                <button onClick={reset} className="btn btn-primary">Reload</button>
            </div>

        </div>
    )
}