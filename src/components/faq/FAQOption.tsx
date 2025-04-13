import { Button } from "react-bootstrap";

interface FAQProps {
    setPage: (page: string) => void;
  }

export function FAQOption({setPage}: FAQProps) {
    return (    <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
      <div
        style={{
          textAlign: "center",
          fontSize: "20px",
          maxWidth: "300px",
        }}
      >
        <p>Curious about how this works? Find answers to questions about the quiz, results, and next steps in your career journey.</p>
        <Button id="FAQ-Button" className="Button" onClick={() => setPage("faqPage")}>
          Go to FAQ
        </Button>
      </div>
    </div>
  );
}