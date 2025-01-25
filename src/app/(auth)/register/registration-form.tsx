"use client";

import { register } from "@/actions/auth-actions";
import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";

export default function RegistrationForm()
{
    const [state, action, pending] = useActionState(register, null);
    const modalRef = useRef<HTMLDialogElement>(null);
    const errorModalRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if(state?.code === 200)
        {
            modalRef.current?.showModal();
        }
        else if(state?.code === 500)
        {
            errorModalRef.current?.showModal();
        }
        else if(state?.code === 400)
        {
            if(typeof state.error === "object")
            {
                let errors = "Credentials are invalid. Please check the following: \n";
                state.error.forEach((error : any) => {
                    errors += "-" + error.message + "\n";
                })

                alert(errors);
            }
        }
    }, [state])
 
    return(
        <>
            <form action={action} className="flex flex-col gap-4 card bg-base-200 p-10">
                <input disabled={pending} type="text" className="input input-bordered max-w-lg w-full" placeholder="Email Address" name="email" />
                <input disabled={pending} type="text" className="input input-bordered max-w-lg w-full" placeholder="Username" name="username" />
                <input disabled={pending} type="password" className="input input-bordered max-w-lg w-full"  placeholder="Password" name="password"/>
                <div className="flex justify-left">
                    <button type="submit" disabled={pending} className="btn btn-primary max-w-xs lg:w-20 w-full">Login</button>
                </div>
                <div>
                    <span>Already have an account? <Link href={"/login"} className="link">Login here</Link></span>
                </div>
            </form>

            <dialog className="modal" ref={modalRef}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Succes!</h3>
                    <p className="py-4">Registration Success! Please go to login page to use your new account.</p>
                    <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Close</button>
                    </form>
                    </div>
                </div>
            </dialog>

            <dialog className="modal" ref={errorModalRef}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Registration failed</h3>
                    <p className="py-4">Something went wrong. Please try again</p>
                    <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Close</button>
                    </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}