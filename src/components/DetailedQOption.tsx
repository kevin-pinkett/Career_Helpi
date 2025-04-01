import { Button, } from "react-bootstrap";

interface DetailedQuestionProps {
    page: string;
    setPage: (page: string) => void;
  }

export function DetailedQuestionsOption({page, setPage}: DetailedQuestionProps) {
    return (    <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "15px",
          borderRadius: "8px",
          boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "white",
          textAlign: "center",
          fontSize: "16px",
          maxWidth: "300px",
        }}
      >
        <h4>Detailed Quiz</h4>
        <p>Explore your career path in depth. Thoughtful questions will help you discover options and recommendations tailored to you.</p>
        <Button className="DetailedQuestions-Button" onClick={() => setPage("detailedPage")}>
          Start Quiz
        </Button>
      </div>
    </div>
  );
}