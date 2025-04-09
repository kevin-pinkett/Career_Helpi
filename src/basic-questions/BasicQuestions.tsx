import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import {ProgressBar} from "../progress-bar/progress-bar";

export function BasicQuestions(): React.JSX.Element {
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
  const [basic_answers, setBasicAnswers] = useState<number[]>(new Array(QUESTIONS.length).fill(-1));
      const [progress, setProgress] = useState<number>(0);
      useEffect(() => {
          if (progress < 100) {
              const answeredQuestions = basic_answers.filter(answer => answer !== -1).length; 
              const newProgress = (answeredQuestions/QUESTIONS.length) * 100;
              setProgress(newProgress);
          }
      }, [basic_answers, QUESTIONS.length, progress]);
      const handleAnswerChange = (q_index: number, r_index: number) => {
          const newAnswers = [...basic_answers];
          newAnswers[q_index] = r_index;
          setBasicAnswers(newAnswers);
      }
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <Form.Group controlId="basicQuestions">
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
                    checked={basic_answers[q_index] === r_index}
                    onChange={() => 
                      handleAnswerChange(q_index, r_index)
                    }
                  />
                ))}
              </div>
            </span>
          ))}
        </div>
      </Form.Group>
      <ProgressBar progress = {progress} setProgress = {setProgress}></ProgressBar>   
    </div>
  );
}
