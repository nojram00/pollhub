import Image from "next/image";

export default function LoadingScreen() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-3">
            <Image src="/tenor.gif" alt="Logo" width={400} height={400} />
            <h2 className="text-center text-3xl mt-5">Loading...</h2>
        </div>
    )
}