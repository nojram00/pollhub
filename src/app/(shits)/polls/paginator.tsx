"use client"
import { useRouter } from "next/navigation"

export default function Paginator({ url, current_page, max_page } : {
    url : string,
    current_page : number
    max_page : number
}){

    const router = useRouter();

    const nextPage = () => {
        router.push(`${url}?page=${ current_page < max_page ? current_page + 1 : 1}`);
    }

    const prevPage = () => {
        router.push(`${url}?page=${current_page > 1 ? current_page - 1 : 1}`);
    }

    return(
        <div className="flex flex-row items-center justify-between gap-5">
            <button onClick={prevPage} disabled={ current_page >= 0 } className="btn link">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                </svg>
            </button>
            <span>Page {current_page} of {max_page}</span> 
            <button onClick={nextPage} disabled={ current_page <= max_page } className="btn link">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                </svg>
            </button>
        </div>
    )
}