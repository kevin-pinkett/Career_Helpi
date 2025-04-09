import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Basic_Question } from "../../interfaces/basic-question";
import basicData from "../../data/basic-questions.json"

export function BasicQuestions(): React.JSX.Element {
  const [basic_answers, setBasicAnswers] = useState<number[]>([]);

  /** Imports basic question from JSON file and stores them in a array
   *  Format followings basic question interface
   */
  const QUESTIONS: Basic_Question[] = Object.values(basicData)
  /*
  const QUESTIONS = [
    "I prefer to work in a team.",
    "I enjoy working with numbers/data.",
    "I am comfortable with technology.",
    "I prefer working outdoors.",
    "I am a strong leader.",
    "I prefer to work in a dynamic environment.",
    "I like to travel often.",
    "Q8"
  ];
  const RESPONSES = [
    "Strongly Disagree",
    "Disagree",
    "Neutral",
    "Agree",
    "Strongly Agree",
  ];
  */
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <Form.Group controlId="basicQuestions">
        <Form.Label>Questions:</Form.Label>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "20px",
          }}>
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
                    checked={basic_answers[q_index] === r_index}
                    onChange={(e) => {
                      const newAnswers = [...basic_answers];
                      newAnswers[q_index] = parseInt(e.target.value);
                      setBasicAnswers(newAnswers);
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
