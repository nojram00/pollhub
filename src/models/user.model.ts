import { BaseMongoModel } from "@/config/db.config";
import { ObjectId } from "mongodb";
import { comparePassword, hashPassword } from "@/utils/password-manager";
import { SessionModel } from "./session.model";
import { createSession } from "@/utils/auth-manager";

export type UserInstance = {
    email: string;
    password: string;
    username : string
}

export type UserLogin = {
    password: string;
    username : string
}

export type User = UserInstance & {
    _id: ObjectId;
}

export class UserModel extends BaseMongoModel
{
    private collection = this.database.collection("users");

    public static instance = new UserModel();

    public async registerUser(user_data : UserInstance)
    {
        user_data.password = await hashPassword(user_data.password);
        return await this.collection.insertOne(user_data);
    }

    public async loginUser(user_data : UserLogin)
    {
        const user = await this.collection.findOne({username : user_data.username});

        if(user)
        {
            const confirmed = await comparePassword(user_data.password, user.password);

            if(confirmed)
            {
                await createSession(user._id.toString());

                return true;
            }
        }

        return false;
    }

}