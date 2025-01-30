import CreatePollForm from "./form"

export const metadata = {
    title : "Create Poll - Pollhub"
}

export default async function CreatePollPage()
{
    return (
        <div>
            <div className="flex flex-row items-center justify-center p-4">
                <h1 className="text-center text-3xl">Create Poll</h1>
            </div>

            <div className="flex flex-row items-center justify-center">
                <CreatePollForm />
            </div>
        </div>
    )
}