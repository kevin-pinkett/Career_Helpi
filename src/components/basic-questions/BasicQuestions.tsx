import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Basic_Question } from "../../interfaces/basic-question";
import basicData from "../../data/basic-questions.json"
import "./BasicQuestions.css"

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
        <Form.Label className="subtitle">Questions:</Form.Label>
        
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "20px",
          }}>

          {QUESTIONS.map((question: Basic_Question) => (
            
            <span className="Question-Box"
              key={question.id}
              style={{
                visibility: question.id === 1 ? "visible" : "hidden",
              }}>
                
              <Form.Label className="subtitle">
                {question.body}
              </Form.Label>

              <div
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                {
                  question.options.map((option: string, r_index: number) => (
                  <Form.Check
                    style={{ flex: 1 }}
                    key={r_index}
                    type="radio"
                    name={`answers-${question.id}`}
                    label={option}
                    value={r_index}
                    checked={basic_answers[question.id] === r_index}
                    onChange={(e) => {
                      const newAnswers = [...basic_answers];
                      newAnswers[question.id] = parseInt(e.target.value);
                      setBasicAnswers(newAnswers);
                    }}
                  />
                  ))
                }
              </div>
            </span>
          ))}
        </div>
      </Form.Group>
    </div>
  );
}
