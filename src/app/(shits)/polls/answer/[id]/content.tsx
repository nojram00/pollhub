
import { PollModel } from "@/models/poll.model"
import AnswerPollForm from "./form";
export default async function ContentHandler({
    id
} : {
    id : string
})
{

    const data = await (new PollModel()).getPollById(id);

    return (
        <div className="flex flex-col items-center justify-center w-full gap-5 p-10">

            <div className="w-full p-10 card bg-base-200 max-w-2xl">
                <div className="card-body flex flex-col">
                    <h2 className="card-title">{data.title}</h2>
                    <p>{data.description}</p>
                    <p>Questions: {data.questions.length}</p>
                </div>
            </div>

            <AnswerPollForm data={{
                ...data,
                _id: data._id?.toString() as string
            }} />
        </div>
    )
}