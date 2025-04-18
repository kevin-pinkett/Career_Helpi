import { Button, } from "react-bootstrap";

interface DetailedQuestionProps {
    setPage: (page: string) => void;
  }

/**
  * Component that renders an option to go to detailed career guidance questions.
 * This component displays a brief description and a button to navigate to the detailed questions page.
 *
 * @param {DetailedQuestionProps} props - The props object containing:
 *   - `setPage`: A function to update the current page state.
 *
 * @returns {JSX.Element} A styled div containing a description and a button
 * to start the detailed questions quiz.
 */
export function DetailedQuestionsOption({setPage}: DetailedQuestionProps) {
    return (
    <div 
      data-testid="detailed-option"
      style={{ 
        display: "flex", 
        justifyContent: "center", 
        gap: "20px", 
        marginTop: "20px" }}>
      <div
        style={{
          textAlign: "center",
          fontSize: "20px",
          maxWidth: "300px",
        }}>
        <p>Explore your career path in depth. Thoughtful questions will help you discover options and recommendations tailored to you.</p>
        <Button id="DetailedQuestions-Button" className="Button" onClick={() => setPage("detailedPage")}>
          Start Quiz
        </Button>
      </div>
    </div>
  );
}