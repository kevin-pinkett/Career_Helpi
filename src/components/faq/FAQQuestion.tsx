import { useState } from "react";
import { Button, Collapse, Card } from "react-bootstrap";

interface FAQQuestionProps{
    question: string;
    answer: string;
}

/**
 * A functional component that displays a question and its corresponding answer.
 * The answer is shown or hidden based on the component's state.
 *
 * @param {FAQQuestionProps} props - The props for the FAQQuestion component.
 * @param {string} props.question - The question to be displayed.
 * @param {string} props.answer - The answer to the question.
 *
 * @returns {JSX.Element} A collapsible FAQ question and answer component.
 */
export function FAQQuestion({question, answer}: FAQQuestionProps){
    const [open, setOpen] = useState<boolean>(false);

    return <div>
        <Button className="question" onClick = {() => {setOpen(!open)}}>{question}</Button>
        <Collapse in={open}>
            <div style={{ visibility: open ? "visible" : "hidden"}}>
                <Card body className="answer" data-testid="collapsed-answer">
                    {answer}
                </Card>
            </div>
        </Collapse>
    </div>
}