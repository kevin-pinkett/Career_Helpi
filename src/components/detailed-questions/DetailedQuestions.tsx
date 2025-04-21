import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Detailed_Question } from "../../interfaces/detailed-question"
import { ProgressBar } from "../progress-bar/progress-bar";
import detailedData from "../../data/detailed-questions.json"
import "./DetailedQuestions.css"

interface Detailed_Question_Props{
  openPopup:() => void;
  setPage: (page: string) => void;
  setAnswers: (answers: string[]) => void;
  setQuestions: (questions: string[]) => void;
}


export function DetailedQuestions({openPopup, setPage, setAnswers, setQuestions}: Detailed_Question_Props): React.JSX.Element {
    /** Imports detailed question from JSON file and stores them in a array
   *  Format followings basic question interface
   */
  const QUESTIONS: Detailed_Question[] = Object.values(detailedData)

  const [detailedAnswers, setDetailedAnswers] = useState<string[]>(new Array(QUESTIONS.length).fill(""));
  const [response, setResponse] = useState<string>("");
  const [currentQuestion, setCurrentQuestion] = useState<Detailed_Question>(QUESTIONS[0]);
  const [currentQuestionId, setCurrentQuestionId] = useState<number>(QUESTIONS[0].id);
  const [progress, setProgress] = useState<number>(0);
  const [popupTriggered, setPopupTriggered] = useState(false);
  const num_questions = QUESTIONS.length;

  useEffect(() => {
      const questionBodies = QUESTIONS.map((question: Detailed_Question) => question.body);
      setQuestions(questionBodies);
    }, [QUESTIONS, setQuestions]);



  useEffect(() => {
    if (progress < 100) {
      const answeredQuestions = detailedAnswers.filter(answer => answer !== "").length; 
      const newProgress = (answeredQuestions/QUESTIONS.length) * 100;
      setProgress(newProgress);
      }
      }, [detailedAnswers, QUESTIONS.length, progress]);
  
  const handleAnswerChange = (q_index: number, response: string) => {
    const newAnswers = [...detailedAnswers];
      newAnswers[q_index] = response;
      setAnswers(newAnswers);
      setDetailedAnswers(newAnswers);
    }
  
  useEffect(() => {
    if (progress === 100 && !popupTriggered) {
      openPopup();
      setPopupTriggered(true);
    }
  }, [progress, popupTriggered, openPopup]);

  function updateResponse(e: React.ChangeEvent<HTMLInputElement>) {
    setResponse(e.target.value);
    handleAnswerChange(currentQuestion.id, e.target.value);
  }

  function advanceQuestion() {
    let newId: number;
    newId = (currentQuestionId === num_questions ? QUESTIONS[num_questions - 1].id : currentQuestionId + 1);
    setCurrentQuestionId(newId);
    setCurrentQuestion(QUESTIONS[QUESTIONS.findIndex((question: Detailed_Question) => {
      return question.id === newId
    })])
  }

  function regressQuestion() {
    let newId: number;
    newId = (currentQuestionId === 1 ? QUESTIONS[0].id : currentQuestionId - 1);
    setCurrentQuestionId(newId);
    setCurrentQuestion(QUESTIONS[QUESTIONS.findIndex((question: Detailed_Question) => {
      return question.id === newId
    })])
  }
  
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <Form.Group controlId="detailedQuestions">
        <Form.Label className="subtitle"></Form.Label>
        
        <div className="Question-Page">

          <div className="Question-Box">
            <div className="subtitle">{currentQuestion.body}</div>
            <div className="Response-Box">
              <Form.Control
              as="textarea"
              className = "response-input"
              rows={5}
              value={detailedAnswers[currentQuestion.id]} 
              onChange={updateResponse}/>
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

 /*
{currentQuestion.options.map((option: string, r_index: number) => (

  <Form.Check
  
  style={{ flex: 1 }}
  key={r_index}
  type="radio"
  name={`answers-${currentQuestion.id}`}
  label={option}
  value={r_index}
  checked={detailedAnswers[currentQuestion.id] === r_index}
  onChange={(e) => {
    handleAnswerChange(currentQuestion.id, r_index);
  }}
  
  
/>
))}
*/