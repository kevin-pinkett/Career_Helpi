import {Button} from "react-bootstrap";

interface AIQuestionProps {
    setPage: (page: string) => void;
  }

export function AIQuestionsOption({setPage}: AIQuestionProps) {
    return (
    <div 
      data-testid="AI-option"
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
        <p>Already have an idea what you want to do? Input your preferences and we'll tailor a quiz for you!</p>
        <Button id="AIQuestions-Button" className="Button" onClick={() => setPage("aiPage")}>
          Start Quiz
        </Button>
      </div>
    </div>
  );
}