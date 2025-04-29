import { FAQ_Question } from "../../interfaces/faq-question";
import FAQData from "../../data/faq-questions.json";
import { FAQQuestion } from "./FAQQuestion";
import "./FAQ.css"

/** Copilot Generated Doc
 * 
 * Renders the FAQPage component, which displays a list of frequently asked questions
 * and their corresponding answers in a dropdown format.
 *
 * @returns {JSX.Element} The FAQPage component containing a header and a list of FAQ questions.
 *
 * The component performs the following:
 * - Retrieves an array of FAQ questions and answers from the `FAQData` object.
 * - Maps over the array to render each question and answer using the `FAQQuestion` component.
 * - Wraps each `FAQQuestion` component in a `div` with the class name "Question-Dropdown".
 *
 * CSS Classes:
 * - `FAQ`: The main container for the FAQ page.
 * - `FAQ-Container`: The container for the list of FAQ questions.
 * - `Question-Dropdown`: The wrapper for each individual FAQ question and answer.
 */
export function FAQPage() {
    const QUESTIONS: FAQ_Question[] = Object.values(FAQData)

    return (
    <div className="FAQ">
        <h1>FAQ Page</h1>
        <div className= "FAQ-Container">
            {QUESTIONS.map((currentQuestion: FAQ_Question) => (
                <div className="Question-Dropdown" key={currentQuestion.id}>
                    <FAQQuestion question={currentQuestion.question} answer={currentQuestion.answer}></FAQQuestion>
                </div>
            ))}
        </div>
    </div>
    )
}

