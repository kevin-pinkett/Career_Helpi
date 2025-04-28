import { BasicQuestionsOption } from "../basic-questions/BasicQOption";
import { DetailedQuestionsOption } from "../detailed-questions/DetailedQOption";
import { AIQuestionsOption } from "../create-your-own/AIQOption";
import { FAQOption } from "../faq/FAQOption";
import { Row } from "react-bootstrap";
import "./HomePage.css";

interface HomePageProp {
  setPage: (page: string) => void;
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
            <BasicQuestionsOption setPage={setPage} />
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
        <div id="create-your-own-box" className="Page-Box">
          <div
            className="subtitle"
            style={{ fontSize: "25px", fontWeight: "5px" }}
          >
            Create Your Own Quiz
          </div>
          <Row>
            <AIQuestionsOption setPage={setPage} data-testId="ai-option" />
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
