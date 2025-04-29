import { BasicQuestionsOption } from "../basic-questions/BasicQOption";
import { DetailedQuestionsOption } from "../detailed-questions/DetailedQOption";
import { AIQuestionsOption } from "../create-your-own/AIQOption";
import { FAQOption } from "../faq/FAQOption";
import { Button, Row } from "react-bootstrap";
import { NavOption } from "../nav-option/NavOption";
import { OptionInfo } from "../../interfaces/nav-option";


import optionData from "../../data/nav-options.json"
import "./HomePage.css";

interface HomePageProp {
  setPage: (page: string) => void;
}

const OPTIONS: OptionInfo[] = Object.values(optionData)

/** Copilot Generated Doc
 * 
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
    <div data-testid="home-page">
      

      <div className="Box-Container">
        {OPTIONS.map((option) => (
          <div className="Page-Box">
            <p className="subtitle" style={{ fontSize: "25px"}}>{option.name}</p>
            <div style={{ display: "flex", justifyContent: "center", textAlign: "center"}}>
              <NavOption setPage={setPage} destination={option.destination} text={option.optionText} buttonText={option.button}></NavOption>
            </div>
          </div>
        ))}
      </div>
  </div>
  );
}
