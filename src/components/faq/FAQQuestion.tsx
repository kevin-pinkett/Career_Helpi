import { useState } from "react";
import { Button, Collapse, Card } from "react-bootstrap";

interface FAQQuestionProps{
    question: string;
    answer: string;
}

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