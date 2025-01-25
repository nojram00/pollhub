import { PollModel } from "@/models/poll.model";
import Link from "next/link";
import Paginator from "./paginator";

export default async function DataTable({ page } : { page : number }){
    const { data, current_page, maximum_page } = await new PollModel().getPolls(page, 10);

    if (data.length === 0){
        return <div>No polls available to display...</div>
    }

    return(
        <div className="flex flex-col items-center justify-center w-full">
            <div className="flex flex-col gap-5 w-full items-center p-10">
                { data.map((poll, index) => (
                    <div key={index} className="card bg-base-200 max-w-2xl w-full p-10">
                        <div className="card-body">
                            <h2 className="card-title">{poll.title}</h2>
                            <p className="mt-5">{poll.description === "" ? "No Description" : poll.description}</p>
                            <div className="card-actions justify-end mt-10">
                                <hr className="w-full mb-5"/>
                                <Link href={`/polls/answer/${poll._id}`} className="btn btn-primary">Take Poll</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Paginator url="/polls" current_page={current_page} max_page={maximum_page}/>
        </div>
    )
}