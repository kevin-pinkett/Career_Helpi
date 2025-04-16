import { Button, } from "react-bootstrap";

interface BasicQuestionProps {
    setPage: (page: string) => void;
  }

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