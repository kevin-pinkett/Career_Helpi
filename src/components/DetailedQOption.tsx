import { Button, } from "react-bootstrap";

interface DetailedQuestionProps {
    page: string;
    setPage: (page: string) => void;
  }

export function DetailedQuestionsOption({page, setPage}: DetailedQuestionProps) {
    return (    <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
      <div
        style={{
          textAlign: "center",
          fontSize: "20px",
          maxWidth: "300px",
        }}
      >
        <p>Explore your career path in depth. Thoughtful questions will help you discover options and recommendations tailored to you.</p>
        <Button className="DetailedQuestions-Button" onClick={() => setPage("detailedPage")}>
          Start Quiz
        </Button>
      </div>
    </div>
  );
}