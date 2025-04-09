import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Basic_Question } from "../../interfaces/basic-question";
import basicData from "../../data/basic-questions.json"
import "./BasicQuestions.css"

export function BasicQuestions(): React.JSX.Element {
  const [basicAnswers, setBasicAnswers] = useState<number[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);

  /** Imports basic question from JSON file and stores them in a array
   *  Format followings basic question interface
   */
  const QUESTIONS: Basic_Question[] = Object.values(basicData)
  function handleSubmit():void{

  }
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <Form.Group controlId="basicQuestions">
        <Form.Label className="subtitle">Questions:</Form.Label>
        
        <div>
        
          <div>
            {QUESTIONS.map((question: Basic_Question) => (
              <div className="Question-Box"
                key={question.id}
                style={{
                  visibility: question.id === currentQuestion ? "visible" : "hidden",
                }}>
                  
                <Form.Label className="subtitle">
                  {question.body}
                </Form.Label>

                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  {
                    question.options.map((option: string, r_index: number) => (
                    <Form.Check
                      style={{ flex: 1 }}
                      key={r_index}
                      type="radio"
                      name={`answers-${question.id}`}
                      label={option}
                      value={r_index}
                      checked={basicAnswers[question.id] === r_index}
                      
                      onChange={(e) => {
                        const newAnswers = [...basicAnswers];
                        newAnswers[question.id] = parseInt(e.target.value);
                        setBasicAnswers(newAnswers);
                      }}
                    />
                    ))}
                </div>
              </div>
            ))}
          </div>
          <Button onClick={() => setCurrentQuestion(currentQuestion + 1)}>Next</Button>
          <Button onClick={() => setCurrentQuestion(currentQuestion - 1)}>Previous</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </Form.Group>
    </div>
    
  );
}
