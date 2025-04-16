import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Basic_Question } from "../../interfaces/basic-question";
import { ProgressBar } from "../progress-bar/progressBar";

import basicData from "../../data/basic-questions.json"
import "./BasicQuestions.css"

interface Basic_Question_Props{
  openPopup:() => void;
  setPage: (page: string) => void; // To lift back to App.tsx for use in results
  setAnswers: (answers: number[]) => void; // To lift back to App.tsx for use in results
  setQuestions: (questions: string[]) => void; // To lift back to App.tsx for use in results
}

const QUESTIONS: Basic_Question[] = Object.values(basicData)

export function BasicQuestions({openPopup, setPage, setAnswers, setQuestions}: Basic_Question_Props): React.JSX.Element {
  /** Imports basic question from JSON file and stores them in a array
   *  Format followings basic question interface
   */
  
  
  useEffect(() => {
    const questionBodies = QUESTIONS.map((question: Basic_Question) => question.body);
    setQuestions(questionBodies);
  }, [setQuestions]);



  const [basicAnswers, localSetBasicAnswers] = useState<number[]>(new Array(QUESTIONS.length).fill(-1));
  const [currentQuestion, setCurrentQuestion] = useState<Basic_Question>(QUESTIONS[0]);
  const [currentQuestionId, setCurrentQuestionId] = useState<number>(QUESTIONS[0].id);
  const [progress, setProgress] = useState<number>(0);
  const [popupTriggered, setPopupTriggered] = useState(false);
  const num_questions = QUESTIONS.length;

  function advanceQuestion() {
    let newId: number;
    newId = (currentQuestionId === num_questions ? QUESTIONS[num_questions - 1].id : currentQuestionId + 1);
    setCurrentQuestionId(newId);
    setCurrentQuestion(QUESTIONS[QUESTIONS.findIndex((question: Basic_Question) => {
      return question.id === newId
    })])
  }

  function regressQuestion() {
    let newId: number;
    newId = (currentQuestionId === 1 ? QUESTIONS[0].id : currentQuestionId - 1);
    setCurrentQuestionId(newId);
    setCurrentQuestion(QUESTIONS[QUESTIONS.findIndex((question: Basic_Question) => {
      return question.id === newId
    })])
  }

  useEffect(() => {
    if (progress < 100) {
      const answeredQuestions = basicAnswers.filter(answer => answer !== -1).length; 
      const newProgress = (answeredQuestions/QUESTIONS.length) * 100;
      setProgress(newProgress);
      }
      }, [basicAnswers, progress]);

  const handleAnswerChange = (q_index: number, r_index: number) => {
          const newAnswers = [...basicAnswers];
          newAnswers[q_index] = r_index;
          setAnswers(newAnswers);
          localSetBasicAnswers(newAnswers);
  }

  useEffect(() => {
    if (progress === 100 && !popupTriggered) {
      openPopup();
      setPopupTriggered(true);
    }
  }, [progress, popupTriggered, openPopup]);

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <Form.Group controlId="basicQuestions">
        <Form.Label className="subtitle"></Form.Label>
        
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
                  handleAnswerChange(currentQuestion.id, r_index)
                }}
              />
              ))}
            </div>
            
          </div>
          <div className="Nav-Buttons">
            <Button style={{ width: "45%" }} onClick={regressQuestion}>Previous</Button>
            <Button style={{ width: "45%" }} onClick={advanceQuestion}>Next</Button>
            <Button className="Submit-Button" disabled={progress !== 100} onClick={openPopup}>Submit</Button>
          </div>
        </div>
      </Form.Group>
      <ProgressBar progress={progress} setProgress={setProgress}></ProgressBar>
    </div>
  );
}
