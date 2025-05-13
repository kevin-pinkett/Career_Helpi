import { useState } from "react";
import { DetailedQuestions } from "./DetailedQuestions";
import { CompletedQuiz } from "../popup/CompleteQuiz";

interface DetailedQuestionsPageProp {
    setPage: (page: string) => void;
    answers: string[];
    setAnswers: (answers: string[]) => void;
    setQuestions: (questions: string[]) => void;
}

/** Copilot Generated Doc
 * 
 * Renders the `DetailQuestionsPage` component, which serves as a container for detailed questions
 * and a popup for completing the quiz. It manages the state for the popup visibility and passes
 * necessary props to child components.
 *
 * @param {DetailedQuestionsPageProp} props - The props for the component.
 * @param {Function} props.setPage - Function to update the current page.
 * @param {Function} props.setAnswers - Function to update the answers.
 * @param {Function} props.setQuestions - Function to update the questions.
 *
 * @returns {JSX.Element} The rendered `DetailQuestionsPage` component.
 */
export function DetailQuestionsPage({setPage, setAnswers, setQuestions}: DetailedQuestionsPageProp) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="DetailQuestions">
      <DetailedQuestions
        openPopup={() => setIsPopupOpen(true)}
        setPage={setPage}
        setAnswers={setAnswers}
        setQuestions={setQuestions}
      ></DetailedQuestions>
      <CompletedQuiz
        isPopupOpen={isPopupOpen}
        closePopup={() => setIsPopupOpen(false)}
        setPage={setPage}
      ></CompletedQuiz>
    </div>
  );
}
