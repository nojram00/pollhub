'use client'
import { useRouter } from "next/navigation"

export default function BackButton(){
    const router = useRouter();

    const goBack = () => {
        router.back();
    }

    return(
        <button onClick={goBack} className="btn btn-error">
            Back To Previous Page
        </button>
    )
}