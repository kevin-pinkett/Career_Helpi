import { useState } from "react";
import { Button, Collapse, Card } from "react-bootstrap";

interface FAQQuestionProps{
    question: string;
    answer: string;
}

export function FAQQuestion({question, answer}: FAQQuestionProps){
    const [open, setOpen] = useState<boolean>(false);
    const [color, setColor] = useState<string>("FE604D");
    
    function dropDown(): void {
        setOpen(!open);
        if (open) {
            setColor("d34f40");
        } else {
            setColor("FE604D");
        }
    }

    return <div>
        <Button style={{
            backgroundColor: `${color}`
        }}
        className="question" onClick = {dropDown}>{question}</Button>
        <Collapse in={open}>
            <div>
                <Card body className="answer">
                    {answer}
                </Card>
            </div>
        </Collapse>
    </div>
}