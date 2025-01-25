"use client"
import React, { useActionState, useRef } from "react";
import { createPoll } from "@/actions/poll-actions";
import type { Questionaire } from "@/models/poll.model";

export default function CreatePollForm()
{
    const [questionCount, setQuestionCount] = React.useState(1);
    const modalRef = useRef<HTMLDialogElement>(null);
    const [state, action, isPending] = useActionState(createPoll, null);

    React.useEffect(() => {
        if (state?.status === 200) {
            modalRef.current?.showModal();
        }
    }, [state]);

    return(
        <>
            <form action={action} className="flex flex-col items-start justify-between gap-5 w-full max-w-2xl p-10 rounded-md bg-base-200 shadow-md">
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" className="input input-bordered w-full max-w-xl"/>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" className="textarea max-w-xl w-full" name="description"></textarea>
                </div>
                <div className="flex flex-col gap-4 w-full">
                    <label className="text-center">Questions</label>
                    <div className="w-full flex flex-col gap-4">
                        {Array.from({ length: questionCount }).map((_, index) => (
                            <QuestionForm key={index} />
                        ))}

                        <div className="flex gap-2 mt-5">
                            <button type="button" className="btn btn-primary" onClick={() => setQuestionCount(questionCount + 1)}>Add Question</button>
                            <button type="button" className="btn btn-secondary" onClick={() => setQuestionCount(questionCount - 1)}>Remove Question</button>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center w-full mt-10">
                    <button type="submit" disabled={isPending} className="btn btn-success">Create Poll</button>
                </div>

                
            </form>

            <dialog className="modal" ref={modalRef}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Success!</h3>
                    <p className="py-4">Poll Uploaded!</p>
                    <div className="modal-action">
                    <form method="dialog">
                        <button className="btn">Close</button>
                    </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

function QuestionForm()
{
    const [questionData, setQuestionData] = React.useState<Questionaire>({
        question: "",
        options: [],
        type: "single",
        correctAnswer: null
    });

    const handleAddQuestion = (e : React.ChangeEvent<HTMLSelectElement>) => {
        setQuestionData({
            ...questionData,
            type: e.target.value as "single" | "multiple" | "text" | "enum"
        })
    };

    return (
        <div className="flex flex-col gap-2 bg-base-300 p-10 rounded-md shadow-md">
            <input type="hidden" name="question-data" value={JSON.stringify(questionData)} />
            <div className="flex flex-col gap-2">
                <label htmlFor="question">Question</label>
                <input type="text" id="question" className="input input-bordered w-full max-w-xs" onChange={(e) => setQuestionData({
                    ...questionData,
                    question: e.target.value
                })} />
            </div>

            <label htmlFor="type">Type</label>

            <select id="type" onChange={handleAddQuestion} className="select w-full max-w-xs">
                <option value="single">Single</option>
                <option value="multiple">Multiple</option>
                <option value="text">Text</option>
                <option value="enum">Enum</option>
            </select>

            <OptionsForm setCallback={setQuestionData} type={questionData.type as "single" | "multiple" | "text" | "enum"} />
        </div>
    )
}

function OptionsForm({ type, setCallback } : { 
    type: "single" | "multiple" | "text" | "enum", 
    setCallback : (data : React.SetStateAction<Questionaire>) => void, 
})
{
    const [numOfOptions, setNumOfOptions] = React.useState(1);

    const handleAddOption = () => {
        setNumOfOptions(numOfOptions + 1);
    };

    const removeOption = () => {
        setNumOfOptions(numOfOptions - 1);
    };

    if (type === "single") {
        return (
            <div className="flex flex-col gap-2 w-full ">
                <label htmlFor="option">Answer</label>
                <input type="text" id="option" onChange={
                    (e) => setCallback((prev) => ({
                        ...prev,
                        correctAnswer: e.target.value
                    }))
                } className="input input-bordered w-full max-w-xs"/>
            </div>
        );
    } else if (type === "multiple") {
        return (
            <div className="flex flex-col gap-2">
                <label htmlFor="option">Answer</label>
                {Array.from({ length: numOfOptions }).map((_, index) => (
                    <div key={index} className="flex gap-2 items-center">
                        <input type="text" onChange={
                            (e) => {
                                setCallback((prev) => {
                                    const options = prev.options;

                                    options[index] = {
                                        option: e.target.value,
                                        votes: 0,
                                        isCorrect: null
                                    };

                                    return {
                                        ...prev,
                                        options: options
                                    }
                                })
                            }
                        } className="input input-bordered w-full max-w-xs"/>
                        <input type="checkbox" onChange={
                            (e) => {
                                setCallback((prev) => {
                                    const options = prev.options;
                                    options[index] = {
                                        ...options[index],
                                        isCorrect: e.target.checked
                                    }

                                    return {
                                        ...prev,
                                        options: options
                                    }
                                })
                            }
                        } className="checkbox" />
                    </div>
                ))}
                <div className="flex gap-2">
                    <button type="button" className="btn btn-primary" onClick={handleAddOption}>Add Option</button>
                    <button type="button" className="btn btn-secondary" onClick={removeOption}>Remove Option</button>
                </div>
            </div>
        );
    }
    else if(type === "text") {
        return (
            <div className="flex flex-col gap-2">
                <label htmlFor="option">Answer</label>
                <textarea id="option" className="textarea" onChange={(e) => {
                    setCallback((prev) => ({
                        ...prev,
                        correctAnswer: e.target.value
                    }))
                }}></textarea>
            </div>
        );
    }
    else if(type === "enum") {
        return (
            <div className="flex flex-col gap-2">
                <label htmlFor="option">Answer</label>
                {Array.from({ length: numOfOptions }).map((_, index) => (
                    <input key={index} className="input input-bordered w-full max-w-xs"  type="text" onChange={(e) => {
                        setCallback((prev) => {
                            const correctAnswer = prev.correctAnswer as string[];
                            correctAnswer[index] = e.target.value;

                            return {
                                ...prev,
                                correctAnswer: correctAnswer
                            }
                        })
                    }} />
                ))}
                <div className="flex gap-2">
                    <button type="button" className="btn btn-primary" onClick={handleAddOption}>Add Option</button>
                    <button type="button" className="btn btn-secondary" onClick={removeOption}>Remove Option</button>
                </div>
            </div>
        );
    }
    else {
        return null;
    }
}