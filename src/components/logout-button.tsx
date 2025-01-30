"use client"

import { logout } from "@/utils/auth-manager";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

export default function LogoutButton()
{
    const [state, action, pending] = useActionState(logout, null);
    const router = useRouter();

    useEffect(() => {
        if(state !== null)
        {
            router.push("/login");
        }
    }, [state]);

    return(
        <form action={action}>
            {pending && (
                <div role="alert" className="alert alert-info">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="h-6 w-6 shrink-0 stroke-current">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Logging Out, Please wait....</span>
              </div>
            )}
            <button type="submit" disabled={pending}>
                Logout
            </button>
        </form>
    )
}