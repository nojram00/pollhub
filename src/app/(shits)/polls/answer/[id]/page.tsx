import { Suspense } from "react";
import ContentHandler from "./content";

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
            <Suspense fallback={<div>Loading...</div>}>
                <ContentHandler id={id as string}/>
            </Suspense>
        </div>
    )
}