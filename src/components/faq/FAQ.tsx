import { FAQ_Question } from "../../interfaces/faq-question";
import FAQData from "../../data/faq-questions.json";
import { FAQQuestion } from "./FAQQuestion";
import "./FAQ.css"

export function FAQPage() {
    const QUESTIONS: FAQ_Question[] = Object.values(FAQData)

    return (
    <div className="FAQ">
        <h1>FAQ Page</h1>
        <div className= "FAQ-Container">
            {QUESTIONS.map((currentQuestion: FAQ_Question) => (
                <div className="Question-Dropdown">
                    <FAQQuestion question={currentQuestion.question} answer={currentQuestion.answer}></FAQQuestion>
                </div>
            ))}
        </div>
    </div>
)
}

