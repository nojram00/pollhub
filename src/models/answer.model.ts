import { BaseMongoModel } from "@/config/db.config";
import { ObjectId } from "mongodb";

export type Answer = {
    question: string;
    answers: string[];
    correct?: boolean | null;
}

export type AnswerInstance = {
    poll_id: ObjectId;
    data: Answer[];
}

export class AnswerModel extends BaseMongoModel {
    
    private collection = this.database.collection("answers");

    public async getAnswers() {
        return await this.collection.find().toArray();
    }

    public async submitAnswer(data: AnswerInstance) {
        return await this.collection.insertOne(data);
    }
}