import RegistrationForm from "./registration-form";

export default function Register()
{
    return(
        <div className="w-full min-h-screen flex items-center justify-center">
            <div className="w-full max-w-xl">
                <h1 className="text-center p-5 text-2xl font-bold">Register</h1>
                <RegistrationForm />
            </div>
        </div>
    )
}