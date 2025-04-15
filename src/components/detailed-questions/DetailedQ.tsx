import {useState} from "react";
import { DetailedQuestions } from "./DetailedQuestions";
import { CompletedQuiz } from "../popup/CompleteQuiz";

interface DetailedQuestionsPageProp {
    setPage: (page: string) => void;
    answers: number[];
    setAnswers: (answers: number[]) => void;
    setQuestions: (questions: string[]) => void;
}

export function DetailQuestionsPage({setPage, setAnswers, setQuestions}: DetailedQuestionsPageProp) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
    <div className="DetailQuestions">
    <h1>Detailed Questions</h1>
    <DetailedQuestions openPopup={() => setIsPopupOpen(true)} setPage={setPage} setAnswers={setAnswers} setQuestions={setQuestions}></DetailedQuestions>
    <CompletedQuiz isPopupOpen={isPopupOpen} closePopup={() => setIsPopupOpen(false)} setPage={setPage}></CompletedQuiz>
    </div>
)
}