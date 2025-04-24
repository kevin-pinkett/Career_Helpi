import { CompletedQuiz } from "../popup/CompleteQuiz";
import { BasicQuestions } from "./BasicQuestions";
import { useState } from "react";

interface BasicQuestionsPageProp {
    setPage: (page: string) => void;
    answers: number[] | string[];
    setAnswers: (answers: number[]) => void;
    setQuestions: (questions: string[]) => void;
}

/**
 * Renders the Basic Questions Page component, including the basic quiz and a completion popup
 *
 * @param {BasicQuestionsPageProp} props - BasicQuestionsPage component props.
 * @param {Function} props.setPage - Function to update the current page.
 * @param {Function} props.setAnswers - Function to update the answers for the quiz.
 * @param {Function} props.setQuestions - Function to update the questions for the quiz.
 *
 * @returns {JSX.Element} The rendered Basic Questions Page component.
 */
export function BasicQuestionsPage({ setPage, setAnswers, setQuestions }: BasicQuestionsPageProp) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
        <div className="Basic-Questions">
            <BasicQuestions 
                openPopup={() => setIsPopupOpen(true)} 
                setPage={setPage} 
                setAnswers={setAnswers} 
                setQuestions={setQuestions}
            />
            <CompletedQuiz 
                isPopupOpen={isPopupOpen} 
                closePopup={() => setIsPopupOpen(false)} 
                setPage={setPage}
            />
        </div>
    );
}