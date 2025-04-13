import {useState} from "react";
import { DetailedQuestions } from "./DetailedQuestions";
import { CompletedQuiz } from "../popup/CompleteQuiz";

interface DetailedQuestionsPageProp {
    setPage: (page: string) => void;
}

export function DetailQuestionsPage({setPage}: DetailedQuestionsPageProp) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    return (
    <div className="DetailQuestions">
    <h1>Detailed Questions</h1>
    <DetailedQuestions openPopup={() => setIsPopupOpen(true)} setPage={setPage}></DetailedQuestions>
    <CompletedQuiz isPopupOpen={isPopupOpen} closePopup={() => setIsPopupOpen(false)} setPage={setPage}></CompletedQuiz>
    </div>
)
}