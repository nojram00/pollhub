"use server";
import { UserModel, UserLogin, UserInstance } from "@/models/user.model";
import { Validate } from "@/utils/user-validator";
import { redirect } from "next/navigation";

export async function login(response : unknown, formData : FormData)
{
    const instance : UserLogin = {
        username : formData.get("username") as string,
        password : formData.get("password") as string
    }

    const validated = Validate.loginSchema.safeParse(instance);

    console.log(validated);

    if(!validated.success)
    {
        return {
            code : 400,
            error : validated.error.errors
        }
    }

    const result = await UserModel.instance.loginUser(instance);

    if(result)
    {
        return redirect("/polls");
    }

    return {
        code : 500,
        error : "Invalid credentials"
    }

}

export async function register(response : unknown, formData : FormData)
{
    const instance : UserInstance = {
        email : formData.get("email") as string,
        password : formData.get("password") as string,
        username : formData.get("username") as string
    } 

    const validated = Validate.registerSchema.safeParse(instance);

    if(!validated.success)
    {
        return {
            code : 400,
            error : validated.error.errors
        }
    }

    const result = await UserModel.instance.registerUser(instance);

    if (result)
    {
        return {
            code : 200,
            message : "User registered successfully"
        };
    }

    return {
        code : 500,
        error : "Failed to register user"
    }
}