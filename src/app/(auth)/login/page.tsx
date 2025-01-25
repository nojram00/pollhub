import LoginForm from "./login-form";

export default function Login()
{
    return (
        <div className="w-full min-h-screen flex items-center justify-center">
            <div className="w-full max-w-xl">
                <h1 className="text-center p-5 text-2xl font-bold">Login</h1>
                <LoginForm />
            </div>
        </div>
    )
}