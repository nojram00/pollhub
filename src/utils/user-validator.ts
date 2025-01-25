import { z } from "zod";

const loginSchema = z.object({
    password: z.string().min(8, "Password must be at least 8 characters long"),
    username : z.string().min(6 , "Username must be at least 6 characters long")
});

const registerSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    username : z.string().min(6 , "Username must be at least 6 characters long")
})

export const Validate = {
    loginSchema, registerSchema
}