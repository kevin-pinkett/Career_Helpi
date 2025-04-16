import { CompletedQuiz } from "../popup/CompleteQuiz";
import { BasicQuestions } from "./BasicQuestions";
import { useState } from "react";

interface BasicQuestionsPageProp {
    setPage: (page: string) => void;
    answers: number[];
    setAnswers: (answers: number[]) => void;
    setQuestions: (questions: string[]) => void;
}

/**
 * Renders the Basic Questions Page component, which includes a basic quiz and a popup
 * for completing the quiz. This component manages the state for the popup visibility
 * and passes necessary props to child components.
 *
 * @param {BasicQuestionsPageProp} props - The props for the BasicQuestionsPage component.
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
            <h1>Basic Quiz</h1>
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