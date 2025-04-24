import { Button } from "react-bootstrap";
import { ConvertToSpeech } from "../accessibility/TextToSpeech";

interface FAQProps {
    setPage: (page: string) => void;
  }

/**
 * Component that renders an FAQ option with a brief description and a button
 * to navigate to the FAQ page.
 *
 * @param {FAQProps} props - The props for the FAQOption component.
 * @param {(page: string) => void} props.setPage - Function to update the current page.
 *
 * @returns {JSX.Element} A styled div containing a description and a button to navigate to the FAQ page.
 */
export function FAQOption({setPage}: FAQProps) {
    return (
    <div
      data-testid="faq-option"
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
        <p>Curious about how this works? Find answers to questions about the quiz, results, and next steps in your career journey.</p>
        <ConvertToSpeech text = {"Frequently asked questions. Curious about how this works? Find answers to questions about the quiz, results, and next steps in your career journey."}></ConvertToSpeech>
        <Button id="FAQ-Button" className="Button" onClick={() => setPage("faqPage")}>
          Go to FAQ
        </Button>
      </div>
    </div>
  );
}