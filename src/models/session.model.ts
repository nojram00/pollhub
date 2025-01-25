import { BaseMongoModel } from "@/config/db.config";
import { v4 as uuid4 } from "uuid";

export type SessionData = {
    user_id : string;
    session_id : string;
}

export class SessionModel extends BaseMongoModel
{
    private colletion = this.database.collection("sessions");

    public static instance = new SessionModel();

    public async createSession(user_id : string)
    {
        const data : SessionData = {
            user_id : user_id,
            session_id : uuid4()
        }
        const result = await this.colletion.insertOne(data);

        return {
            result : result,
            data : data
        }
    }

    public async getSession(session_id : string)
    {
        return await this.colletion.findOne({session_id}) as SessionData | null;
    }

    public async deleteSession(session_id : string)
    {
        return await this.colletion.deleteOne({session_id});
    }

}