import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Basic_Question } from "../../interfaces/basic-question";
import basicData from "../../data/basic-questions.json"
import "./BasicQuestions.css"

export function BasicQuestions(): React.JSX.Element {
  /** Imports basic question from JSON file and stores them in a array
   *  Format followings basic question interface
   */
  const QUESTIONS: Basic_Question[] = Object.values(basicData)
  
  const [basicAnswers, setBasicAnswers] = useState<number[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Basic_Question>(QUESTIONS[0]);
  const [currentQuestionId, setCurrentQuestionId] = useState<number>(QUESTIONS[0].id);

  function advanceQuestion() {
    const newId = currentQuestionId + 1;
    setCurrentQuestionId(newId);
    setCurrentQuestion(QUESTIONS[QUESTIONS.findIndex((question: Basic_Question) => {
      return question.id === newId
    })])
  }

  function regressQuestion() {
    const newId = currentQuestionId - 1;
    setCurrentQuestionId(newId);
    setCurrentQuestion(QUESTIONS[QUESTIONS.findIndex((question: Basic_Question) => {
      return question.id === newId
    })])
  }
  
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <Form.Group controlId="basicQuestions">
        <Form.Label className="subtitle">Questions:</Form.Label>
        
        <div className="Question-Page">

          <div className="Question-Box">
            <div className="subtitle">{currentQuestion.body}</div>
            <div className="Response-Box">
              {currentQuestion.options.map((option: string, r_index: number) => (
                <Form.Check
                style={{ flex: 1 }}
                key={r_index}
                type="radio"
                name={`answers-${currentQuestion.id}`}
                label={option}
                value={r_index}
                checked={basicAnswers[currentQuestion.id] === r_index}
                
                onChange={(e) => {
                  const newAnswers = [...basicAnswers];
                  newAnswers[currentQuestion.id] = parseInt(e.target.value);
                  setBasicAnswers(newAnswers);
                }}
              />
              ))}
            </div>
            
            {
            /*
            QUESTIONS.map((question: Basic_Question) => (
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
            ))
            */
            }
            
          </div>
          <div className="Nav-Buttons">
            <Button style={{ width: "50%" }} onClick={regressQuestion}>Previous</Button>
            <Button style={{ width: "50%" }} onClick={advanceQuestion}>Next</Button>
          </div>
        </div>
      </Form.Group>
    </div>
    
  );
}
