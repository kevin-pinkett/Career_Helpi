import React, { useState } from "react";
import {Form} from "react-bootstrap";



export function DetailedQuestions(): React.JSX.Element {
    const QUESTIONS = ["I value consistency and sustainability over potential and growth", "I don't mind putting in extra hours if it means more chances for promotion and upwards mobility in the workplace"
        ,"Work-life balance is of utmost importance to me and I desire flexibility with my job","Ethics does not matter to me in regards to what company I work for as long as I am compensated well",
        "I prefer working within groups, socializing and creating bonds with the people I collaborate with","I value smaller workplaces with more interconnected groups and sectors",
        "I think of my future career as a way to realize my best self, rather than an avenue to make money"]
        const RESPONSES = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"];
    const [answers, setAnswers] = useState<number[]>([]);
    return (
        <div>
            <Form.Group controlId="detailedQuestions">
                <Form.Label>Questions:</Form.Label>
                <div>
                {QUESTIONS.map((question, index) => (
                        <div key={index}>
                            <Form.Label>{question}</Form.Label>
                            <Form.Select
                                value={answers[index] ?? ""}
                                onChange={(e) => {
                                    const newAnswers = [...answers];
                                    newAnswers[index] = parseInt(e.target.value);
                                    setAnswers(newAnswers);
                                }}
                            >
                                <option value="">Select an option</option>
                                {RESPONSES.map((response, responseIndex) => (
                                    <option key={responseIndex} value={responseIndex}>{response}</option>
                                ))}
                            </Form.Select>
                        </div>
                    ))}
                </div>
                    
            </Form.Group>
        </div>
    )
}
    