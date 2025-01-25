import { BaseMongoModel } from "@/config/db.config";
import { ObjectId } from "mongodb";

type Options = {
    option: string;
    votes: number;
    isCorrect: boolean | null; // null if not a quiz
}

type Questionaire = {
    question: string;
    options: Options[];
    type : "single" | "multiple" | "text" | "enum";
    correctAnswer: string | string[] | null; // null if not a quiz
};

type Poll = {
    _id? : ObjectId;
    title: string;
    description: string;
    questions: Questionaire[];
    type: "quiz" | "poll";
}

export class PollModel extends BaseMongoModel
{
    private collection = this.database.collection("polls");
    public static instance = new PollModel();

    public async getPolls( page : number = 1, limit : number = 10)
    {
        const offset = (page - 1) * limit;
    
        const pipeline = [
            {
                $skip: offset
            },
            {
                $limit: limit
            }
        ]

        const maximum_count = await this.collection.countDocuments();
        const maximum_page = Math.ceil(maximum_count / limit);

        const polls = await this.collection.aggregate(pipeline).toArray() as Poll[];
        
        return {
            data : polls,
            current_page : page,
            maximum_page : maximum_page,
        }
    }

    public async createPoll(poll: Poll)
    {
        return await this.collection.insertOne(poll);
    }

    public async getPollById(id : string)
    {
        return await this.collection.findOne({_id: new ObjectId(id)}) as Poll;
    }
}

export type {
    Poll, Questionaire, Options
}