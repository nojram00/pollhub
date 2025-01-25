import { Suspense } from "react"
import DataTable from "./data-table"
import LoadingScreen from "@/components/loading-screen";

export default async function Polls({
    searchParams
} : {
    searchParams? : Promise<{
        page: number;
    }>
})
{
    const page = searchParams ? (await searchParams).page : 1;
    return (
        <div>
            <div className="flex flex-row items-center justify-center p-4">
                <h1 className="text-center text-3xl">Polls</h1>
            </div>
            <Suspense fallback={<LoadingScreen />}>
                <DataTable page={page}/>
            </Suspense>
        </div>
    )
}