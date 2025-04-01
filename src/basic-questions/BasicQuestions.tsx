import React, { useState } from "react";
import { Form } from "react-bootstrap";

export function BasicQuestions(): React.JSX.Element {
    const QUESTIONS = ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7"];
    const RESPONSES = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"];
    const [basic_answers, setBasicAnswers] = useState<number[]>([]);
    return (
        <div>
            <Form.Group controlId="basicQuestions">
                <Form.Label>Questions:</Form.Label>
                <div style={{display: "flex", flexDirection: "column"}}>
                    {QUESTIONS.map((question, q_index) => (
                        <span key={q_index}>
                            <Form.Label>{question}</Form.Label>
                            {RESPONSES.map((response, r_index) => (
                                <Form.Check
                                    style={{flex: 1}}
                                    key={r_index}
                                    type="radio"
                                    name={`answers-${q_index}`}
                                    label={response}
                                    value={r_index}
                                    checked={basic_answers[q_index] === r_index}
                                    onChange={(e) => {
                                        const newAnswers = [...basic_answers];
                                        newAnswers[q_index] = parseInt(e.target.value);
                                        setBasicAnswers(newAnswers);
                                    }}
                                />
                            ))}
                        </span>
                    ))}
                </div>
            </Form.Group>
        </div>
    );
}
