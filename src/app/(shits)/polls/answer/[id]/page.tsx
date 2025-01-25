import { Suspense } from "react";
import ContentHandler from "./content";
import LoadingScreen from "@/components/loading-screen";

export default async function MainPollPage({
    params
} : {
    params : Promise<{
        id : string
    }>
})
{
    const { id } = await params;    
    return(
        <div>
            <Suspense fallback={<LoadingScreen />}>
                <ContentHandler id={id as string}/>
            </Suspense>
        </div>
    )
}