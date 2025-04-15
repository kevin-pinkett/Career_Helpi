import { CompletedQuiz } from "../popup/CompleteQuiz";
import { BasicQuestions } from "./BasicQuestions"
import {useState} from "react"

interface BasicQuestionsPageProp {
    setPage: (page: string) => void;
    answers: number[];
    setAnswers: (answers: number[]) => void;
    setQuestions: (questions: string[]) => void;
}

export function BasicQuestionsPage({setPage, setAnswers, setQuestions}: BasicQuestionsPageProp) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
    <div className="Basic-Questions">
    <h1>Basic Quiz</h1>
    <BasicQuestions openPopup={() => setIsPopupOpen(true)} setPage={setPage} setAnswers={setAnswers} setQuestions={setQuestions}></BasicQuestions>
    <CompletedQuiz isPopupOpen={isPopupOpen} closePopup={() => setIsPopupOpen(false)} setPage={setPage}></CompletedQuiz>
    </div>
)
}