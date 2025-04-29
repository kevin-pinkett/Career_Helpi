import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Basic_Question } from "../../interfaces/basic-question";
import { ProgressBar } from "../progress-bar/progressBar";
import { ConvertToSpeech } from "../accessibility/TextToSpeech";

import basicData from "../../data/basic-questions.json"
import "./BasicQuestions.css"
import { SpeechProvider } from "../accessibility/SpeechContext";

interface Basic_Question_Props{
  openPopup:() => void;
  setPage: (page: string) => void; // To lift back to App.tsx for use in results
  setAnswers: (answers: number[]) => void; // To lift back to App.tsx for use in results
  setQuestions: (questions: string[]) => void; // To lift back to App.tsx for use in results
}

const QUESTIONS: Basic_Question[] = Object.values(basicData)

/** Copilot Generated Doc
 * 
 * Component for rendering a series of basic questions and handling user responses.
 * 
 * @param {Basic_Question_Props} props - The properties passed to the component.
 * @param {Function} props.openPopup - Function to trigger a popup when all questions are answered.
 * @param {Function} props.setPage - Function to set the current page (not used in this component).
 * @param {Function} props.setAnswers - Function to update the answers array in the parent component.
 * @param {Function} props.setQuestions - Function to set the list of question bodies in the parent component.
 * 
 * @returns {React.JSX.Element} The rendered BasicQuestions component.
 * 
 * @description
 * This component:
 * - Loads a list of basic questions from a JSON file and initializes their state.
 * - Tracks the user's progress through the questions and updates a progress bar.
 * - Allows navigation between questions using "Previous" and "Next" buttons.
 * - Handles user responses to questions and updates the answers state.
 * - Triggers a popup when all questions are answered.
 * 
 * @remarks
 * - The `QUESTIONS` array is expected to be an imported constant containing the list of questions.
 * - Each question should conform to the `Basic_Question` interface, which includes an `id`, `body`, and `options`.
 * - The progress is calculated as the percentage of questions answered.
 * - The "Submit" button is enabled only when all questions are answered.
 * 
 * @example
 * ```tsx
 * <BasicQuestions
 *   openPopup={handleOpenPopup}
 *   setPage={setPage}
 *   setAnswers={setAnswers}
 *   setQuestions={setQuestions}
 * />
 * ```
 */
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
            <div style={{ position: "absolute", top: "10px", right: "10px" }}>
              <SpeechProvider>
                <ConvertToSpeech text = {currentQuestion.body + 
                currentQuestion.options.reduce((acc: string, option: string, index: number) => {
                  return `${acc} ${index+1}.) ${option} `;
                  }, "")
                }></ConvertToSpeech>
              </SpeechProvider> 
            </div>
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
