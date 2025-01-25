import BackButton from "@/components/back-button";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title : "Page Not Found - Pollhub",
    description : "The page you are looking for does not exist...",
}

export default function NotFound()
{
    return (
        <div className="flex flex-col min-h-screen p-10 items-center justify-center w-full h-full gap-3">
            <Image src="/banana-cat-transparent.gif" alt="Logo" width={200} height={200} />
            <h2 className="text-center text-3xl mt-5">Page Not Found</h2>
            <span className="text-center">The page you are looking for does not exist...</span>
            <span className="text-center">Please check the URL and try again...</span>

            <div className="p-10 flex justify-end gap-5">
                <BackButton />
                <Link href="/" className="btn btn-primary">Go Home</Link>
            </div>
        </div>
    )
}