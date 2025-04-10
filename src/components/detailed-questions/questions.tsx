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
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
              <Form.Group controlId="detailedQuestions">
                <Form.Label>Questions:</Form.Label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "20px",
                  }}
                >
                  {QUESTIONS.map((question, q_index) => (
                    <span
                      key={q_index}
                      style={{
                        border: "1px solid #ccc",
                        padding: "15px",
                        borderRadius: "8px",
                        boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
                        backgroundColor: "white",
                      }}
                    >
                      <Form.Label
                        style={{
                          display: "block",
                          fontSize: "16px",
                          fontWeight: "bold",
                          marginBottom: "10px",
                        }}
                      >
                        {question}
                      </Form.Label>
                      <div
                        style={{ display: "flex", flexDirection: "column", gap: "5px" }}
                      >
                        {RESPONSES.map((response, r_index) => (
                          <Form.Check
                            style={{ flex: 1 }}
                            key={r_index}
                            type="radio"
                            name={`answers-${q_index}`}
                            label={response}
                            value={r_index}
                            checked={answers[q_index] === r_index}
                            onChange={(e) => {
                              const newAnswers = [...answers];
                              newAnswers[q_index] = parseInt(e.target.value);
                              setAnswers(newAnswers);
                            }}
                          />
                        ))}
                      </div>
                    </span>
                  ))}
                </div>
              </Form.Group>
            </div>
          );
}
    