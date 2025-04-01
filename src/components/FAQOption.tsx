import { Button } from "react-bootstrap";

interface FAQProps {
    page: string;
    setPage: (page: string) => void;
  }

export function FAQOption({page, setPage}: FAQProps) {
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
        <h4>FAQ</h4>
        <p>Curious about how this works? Find answers to common questions about the quiz, results, and next steps in your career journey.</p>
        <Button className="FAQ-Button" onClick={() => setPage("faqPage")}>
          Go to FAQ
        </Button>
      </div>
    </div>
  );
}