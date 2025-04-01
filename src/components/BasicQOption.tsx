import { Button, } from "react-bootstrap";

interface BasicQuestionProps {
    page: string;
    setPage: (page: string) => void;
  }

export function BasicQuestionsOption({page, setPage}: BasicQuestionProps) {
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
        <h4>Basic Questions</h4>
        <p>Quick and easy career guidance! Answer a few straightforward questions to receive personalized insights without the deep dive.</p>
        <Button className="BasicQuestions-Button" onClick={() => setPage("basicPage")}>
          Start Quiz
        </Button>
      </div>
    </div>
  );
}