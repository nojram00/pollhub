"use server";

import { Answer, AnswerInstance, AnswerModel } from "@/models/answer.model";
import type { Questionaire, Poll } from "@/models/poll.model";
import { PollModel } from "@/models/poll.model";
import { ObjectId } from "mongodb";

export async function createPoll(response : unknown, formData : FormData)
{
    // console.log(formData);

    const questionData = formData.getAll("question-data").map(data => JSON.parse(data as unknown as string) as Questionaire);

    console.log(questionData);

    const pollData = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        questions: questionData,
        type: "poll"
    } as Poll;

    const result  = await (new PollModel()).createPoll(pollData);

    console.log("Poll created: ", result);

    if (result.acknowledged)
    {
        return {
            status: 200,
            message: "Poll created successfully"
        }
    }
}

export async function submitAnswers(reponse : unknown, formData : FormData)
{
    console.log(formData);

    const pollData = await (new PollModel()).getPollById(formData.get("poll-id") as string);

    const questions = pollData.questions;

    const pollType = pollData.type;

    const answers : Array<Answer> = [];
    questions.forEach((question, index) => {
        const a = formData.getAll(`question-option-${index}`) as string[]
        answers.push({
            question: question.question,
            answers: a,
            correct : pollType === "quiz" && question.type === "single" ? a.includes(question.correctAnswer as string) : null
        })
    })

    const answerInstance : AnswerInstance = {
        poll_id: new ObjectId(pollData._id?.toString() as string),
        data : answers
    }

    const result = await (new AnswerModel()).submitAnswer(answerInstance);

    if(result.acknowledged)
    {
        return {
            status: 200,
            message: "Answers submitted successfully"
        }
    }
}