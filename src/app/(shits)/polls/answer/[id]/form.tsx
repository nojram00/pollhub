"use client"

import { Questionaire } from "@/models/poll.model";
import { submitAnswers } from "@/actions/poll-actions";
import React, { useActionState, useEffect, useRef, use } from "react";
import { PollModel } from "@/models/poll.model";

type ModifiedPoll = { 
    _id : string,
    title: string;
    description: string;
    questions: Questionaire[];
    type: "quiz" | "poll"; 

};

export default function AnswerPollForm({ data } : { data : ModifiedPoll })
{
    const [state, action, pending] = useActionState(submitAnswers, null);
    const modalRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if(state?.status === 200)
        {
            modalRef.current?.showModal();
        }
    }, [state]);

    return(
        <React.Fragment>
            <form action={action} className="flex flex-col gap-5 w-full items-center p-10">
                <input type="hidden" name="poll-id" value={data._id} />
                { data.questions.map((question, index) => (
                    <div key={index} className="card bg-base-200 max-w-2xl w-full p-10">
                        <label>{question.question}</label>
                        <p>{question.type}</p>
                        { question.type === "multiple" && (
                            <div className="flex flex-col gap-2 mt-5">
                                { question.options.map((option, optIndex) => (
                                    <div key={optIndex} className="flex gap-2 items-center justify-start">
                                        <input type="checkbox" className="checkbox" id={`option-${optIndex}`} name={`question-option-${index}`} value={option.option}/>
                                        <label htmlFor={`option-${optIndex}`}>{option.option}</label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}

                <div>
                    <button type="submit" disabled={pending} className="btn btn-primary">Submit Answers</button>
                </div>
            </form>

            <dialog className="modal" ref={modalRef}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Success!</h3>
                    <p className="py-4">Answer Submitted!</p>
                    <div className="modal-action">
                    <form method="dialog">
                        <button className="btn">Close</button>
                    </form>
                    </div>
                </div>
            </dialog>
        </React.Fragment>
    )
}