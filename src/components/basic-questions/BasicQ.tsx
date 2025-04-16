import { CompletedQuiz } from "../popup/CompleteQuiz";
import { BasicQuestions } from "./BasicQuestions";
import { useState } from "react";

/**
 * Props for the BasicQuestionsPage component.
 * @property setPage - Function to update the current page.
 * @property answers - Array of numbers representing the user's answers.
 * @property setAnswers - Function to update the user's answers.
 * @property setQuestions - Function to update the list of questions.
 */
interface BasicQuestionsPageProp {
    setPage: (page: string) => void;
    answers: number[];
    setAnswers: (answers: number[]) => void;
    setQuestions: (questions: string[]) => void;
}

/**
 * BasicQuestionsPage Component
 * 
 * This component renders the basic questions page of the quiz. It includes:
 * - A title for the quiz.
 * - The `BasicQuestions` component for displaying and interacting with the quiz questions.
 * - The `CompletedQuiz` popup component that appears when the quiz is completed.
 * 
 * @param setPage - Function to navigate between pages.
 * @param setAnswers - Function to update the user's answers.
 * @param setQuestions - Function to update the list of questions.
 * @returns A JSX element representing the basic questions page.
 */
export function BasicQuestionsPage({ setPage, setAnswers, setQuestions }: BasicQuestionsPageProp) {
    // State to manage whether the popup is open or closed.
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
        <div className="Basic-Questions">
            <h1>Basic Quiz</h1>
            {/* Render the BasicQuestions component */}
            <BasicQuestions 
                openPopup={() => setIsPopupOpen(true)} 
                setPage={setPage} 
                setAnswers={setAnswers} 
                setQuestions={setQuestions}
            />
            {/* Render the CompletedQuiz popup */}
            <CompletedQuiz 
                isPopupOpen={isPopupOpen} 
                closePopup={() => setIsPopupOpen(false)} 
                setPage={setPage}
            />
        </div>
    );
}