import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{
      backgroundImage: "url('/tenor.gif')",
      backgroundRepeat : "no-repeat",
      backgroundSize : "cover",
    }}
    className="w-full min-h-screen relative">
      <div className="w-full h-full bg-black bg-opacity-75 absolute">
        <div className="flex flex-col items-center justify-center w-full h-full gap-20">
          <div className="card bg-base-200/50 p-10 gap-5 shadow-md">
            <h1 className="text-center text-2xl">Welcome to Pollhub!</h1>
            <p>Where you can create and answer polls!</p>
          </div>
          <div className="card bg-base-200/50 p-10 gap-5 shadow-md">
            <span>To Start, just click <Link href={"/polls"} className="hover:underline">here</Link></span>
          </div>
        </div>
      </div>
    </div>
  );
}
