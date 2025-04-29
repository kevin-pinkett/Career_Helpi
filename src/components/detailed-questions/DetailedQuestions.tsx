import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Detailed_Question } from "../../interfaces/detailed-question"
import { ProgressBar } from "../progress-bar/progressBar";
import detailedData from "../../data/detailed-questions.json"
import "./DetailedQuestions.css"

interface Detailed_Question_Props{
  openPopup:() => void;
  setPage: (page: string) => void;
  setAnswers: (answers: string[]) => void;
  setQuestions: (questions: string[]) => void;
}


/**
 * Component representing a detailed questionnaire interface.
 * 
 * @param {object} props - The properties passed to the component.
 * @param {() => void} props.openPopup - Function to trigger a popup when the questionnaire is completed.
 * @param {(answers: number[]) => void} props.setAnswers - Function to update the answers for the questionnaire.
 * @param {(questions: string[]) => void} props.setQuestions - Function to set the list of question bodies.
 * @param {(page: number) => void} props.setPage - Function to set the current page of the questionnaire.
 * 
 * @returns {React.JSX.Element} A JSX element rendering the detailed questionnaire interface.
 * 
 * @description
 * This component renders a detailed questionnaire interface, allowing users to navigate through questions,
 * select answers, and track their progress. It imports questions from a JSON file and manages the state
 * for answers, progress, and the currently displayed question. The component triggers a popup when all
 * questions are answered.
 * 
 * @remarks
 * - The `QUESTIONS` array is populated from a JSON file and follows the `Detailed_Question` interface.
 * - Progress is calculated as a percentage of answered questions.
 * - The `advanceQuestion` and `regressQuestion` functions handle navigation between questions.
 * - The `handleAnswerChange` function updates the answers and triggers state updates.
 * - A `ProgressBar` component is used to visually display the progress.
 * 
 * @example
 * ```tsx
 * <DetailedQuestions
 *   openPopup={handlePopup}
 *   setPage={setPage}
 *   setAnswers={setAnswers}
 *   setQuestions={setQuestions}
 * />
 * ```
 */
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
  //const [popupTriggered, setPopupTriggered] = useState(false);
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
  
  /*useEffect(() => {
    if (progress === 100 && !popupTriggered) {
      openPopup();
      setPopupTriggered(true);
    }
  }, [progress, popupTriggered, openPopup]);
  */

  function updateResponse(e: React.ChangeEvent<HTMLInputElement>) {
    setResponse(response + e.target.value);
    handleAnswerChange(currentQuestion.id, e.target.value);
  }

  function advanceQuestion() {
    let newId: number;
    newId = (currentQuestionId === num_questions ? QUESTIONS[num_questions-1].id : currentQuestionId + 1);
    setCurrentQuestionId(newId);
    setCurrentQuestion(QUESTIONS[QUESTIONS.findIndex((question: Detailed_Question) => {
      return question.id === newId;
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
      <Form.Group controlId="detailedQuestions">
        
        <div className="Detailed-Page">

          <div className="Detailed-Question-Box">
            <div className="Detailed-Question-Question">{currentQuestion.body}</div>
            <Form.Control
            as="textarea"
            className = "Response-Input"
            rows={5}
            value={detailedAnswers[currentQuestion.id] || ""}
            placeholder="Type your response here"
            onChange={updateResponse}/>
            

            <ProgressBar progress={progress} setProgress={setProgress}></ProgressBar>
          </div>
          <div className="Nav-Buttons">
            <Button style={{ width: "45%" }} onClick={regressQuestion}>Previous</Button>
            <Button style={{ width: "45%" }} onClick={advanceQuestion}>Next</Button>
            <Button className="Submit-Button" disabled={progress !== 100} onClick={openPopup}>Submit</Button>
          </div>
        </div>
      </Form.Group>    
  );
}