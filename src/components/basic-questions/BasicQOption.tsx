import { Button, } from "react-bootstrap";

interface BasicQuestionProps {
    setPage: (page: string) => void;
  }

/**
 * Component that renders an option to go to basic career guidance questions.
 * This component displays a brief description and a button to navigate to the basic questions page.
 *
 * @param {BasicQuestionProps} props - The props object containing the `setPage` function.
 * @param {(page: string) => void} props.setPage - A function to update the current page state.
 *
 * @returns {JSX.Element} A styled div containing a description and a button to start the quiz.
 */
export function BasicQuestionsOption({setPage}: BasicQuestionProps) {
    return (
    <div
      data-testid="basic-option"
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
        <p>Quick and easy career guidance! Answer a few straight forward questions to receive personalized insights without the deep dive.</p>
        <Button id="BasicQuestions-Button" className="Button" onClick={() => setPage("basicPage")}>
          Start Quiz
        </Button>
      </div>
    </div>
  );
}