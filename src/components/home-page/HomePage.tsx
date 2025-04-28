import { BasicQuestionsOption } from "../basic-questions/BasicQOption";
import { DetailedQuestionsOption } from "../detailed-questions/DetailedQOption";
import { FAQOption } from "../faq/FAQOption";
import { Row } from "react-bootstrap";
import "./HomePage.css";
import { NavOption } from "../nav-option/NavOption";

interface HomePageProp {
  setPage: (page: string) => void;
}

interface OptionInfo {
  destination: string
  optionText: string;
  button: string;
}

const options: Record<string, OptionInfo> = {
  "Basic Quiz": {destination: "basicPage", optionText: "Quick and easy career guidance! Answer a few straight forward questions to receive personalized insights without the deep dive.", button: "Start Quiz"},
  "Detailed Quiz": {destination: "detailedPage", optionText: "Explore your career path in depth. Thoughtful questions will help you discover options and recommendations tailored to you.", button: "Start Quiz"},
  "FAQ": {destination: "faqPage", optionText: "Curious about how this works? Find answers to questions about the quiz, results, and next steps in your career journey.", button: "Go to FAQ"}
}



/**
 * Represents the HomePage component, which serves as the main landing page
 * for the application. It provides three primary options for navigation:
 * Basic Quiz, Detailed Quiz, and FAQ.
 *
 * @param {HomePageProp} props - The props object containing the following:
 * @param {(page: string) => void} props.setPage - A function to update the current page state.
 *
 * @returns {JSX.Element} The rendered HomePage component.
 *
 * @component
 * @example
 * // Example usage:
 * <HomePage setPage={(page) => console.log(page)} />
 *
 * @remarks
 * - The component contains three sections, each styled as a "Page-Box":
 *   - Basic Quiz: Allows users to start a basic quiz.
 *   - Detailed Quiz: Allows users to start a detailed quiz.
 *   - FAQ: Provides access to frequently asked questions.
 * - Each section includes a subtitle and a corresponding option component.
 * - The `data-testid` attributes are used for testing purposes.
 */
export function HomePage({ setPage }: HomePageProp) {
  
  return (
    <div data-testid="home-page" className="Home-page">
      <div className="Box-Container">
        <div id="basic-questions-box" className="Page-Box">
          <div
            className="subtitle"
            style={{ fontSize: "25px", fontWeight: "5px" }}
          >
            Basic Quiz
          </div>
          <Row>
            <NavOption setPage={setPage} destination="basicPage" text="Quick and easy career guidance! Answer a few straight forward questions to receive personalized insights without the deep dive." buttonText="Start Quiz"/>
          </Row>
        </div>
        <div id="detailed-questions-box" className="Page-Box">
          <div
            className="subtitle"
            style={{ fontSize: "25px", fontWeight: "5px" }}
          >
            Detailed Quiz
          </div>
          <Row>
            <DetailedQuestionsOption
              setPage={setPage}
              data-testId="detailed-option"
            />
          </Row>
        </div>
        <div id="faq-box" className="Page-Box">
          <div
            className="subtitle"
            style={{ fontSize: "25px", fontWeight: "5px" }}
          >
            FAQ
          </div>
          <Row>
            <FAQOption setPage={setPage} data-testId="faq-option" />
          </Row>
        </div>
      </div>
    </div>
  );
}
