import {useState, useEffect } from "react";
import { getGPTResponse } from "../../AIQIntegration";
import { AIQuestion } from "../../interfaces/ai-question";
import { Form, Button } from "react-bootstrap";
import { ProgressBar } from "../progress-bar/progressBar";
import { SpeechProvider } from "../accessibility/SpeechContext";
import { ConvertToSpeech } from "../accessibility/TextToSpeech";

interface AIQuestionProps {
    openPopup: () => void;
    industry: string;
    setQuiz: boolean;
    setQuestionBodies: (questions: string[]) => void;
    setAnswers: (answers: string[]) => void;
    answers: string[] | number[];
}
export function AIQuestions({openPopup, industry, setQuiz, setQuestionBodies, setAnswers, answers}: AIQuestionProps): React.JSX.Element {
    const [questions, setQuestions] = useState<AIQuestion[]>([]);
    const [stringAnswers, setStringAnswers] = useState<string[]>(new Array(questions.length).fill(""));
    const [hasFetched, setHasFetched] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState<AIQuestion>({id: 0, body: ""});
    const [currentQuestionId, setCurrentQuestionId] = useState<number>(0);
    const [progress, setProgress] = useState<number>(0);
    useEffect(() => {
        if (questions.length > 0) {
            setCurrentQuestion(questions[0]);
            setCurrentQuestionId(questions[0].id);
            setAnswers(new Array(questions.length).fill(""));
        }
    }, [questions, setAnswers])

    const [loading, setLoading] = useState<boolean>(false);
    
    useEffect(() => {
        const fetchQuestions = async () => {
            setLoading(true);
            try {
                const response = await getGPTResponse(industry);
                const new_questions = response.map((question: AIQuestion) => question);
                const new_question_bodies = response.map((question: AIQuestion) => question.body);
                setQuestionBodies(new_question_bodies);
                setQuestions(new_questions);
                setHasFetched(true);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
            finally {
                setLoading(false);
            }

        };
        if (setQuiz && !hasFetched) {
            fetchQuestions();
        }
    }, [industry, setQuiz, setQuestions, setQuestionBodies, hasFetched]);

    useEffect(() => {
        if (progress < 100 && questions.length > 0) {
          const answeredQuestions = stringAnswers.filter(answer => answer !== "").length; 
          const newProgress = (answeredQuestions/questions.length) * 100;
          setProgress(newProgress);
          }
          }, [answers, questions.length, progress, stringAnswers]);

    const handleAnswerChange = (q_index: number, response: string) => {
        if (questions.length > 0) {
            const newAnswers = [...stringAnswers];
            newAnswers[q_index] = response;
            setAnswers(newAnswers);
            setStringAnswers(newAnswers);
        }
    }

    function updateResponse(e: React.ChangeEvent<HTMLInputElement>) {
        if (currentQuestionId !== null) {
            handleAnswerChange(currentQuestionId-1, e.target.value);
        }
      }
    
    
    function advanceQuestion() {
        if (currentQuestionId !== null) {
            let newId: number;
            newId = (currentQuestionId === questions.length ? questions[questions.length-1].id : currentQuestionId + 1);
            setCurrentQuestionId(newId);
            setCurrentQuestion(questions[questions.findIndex((question: AIQuestion) => {
                return question.id === newId;
            })])
        }
        
    }

    function regressQuestion() {
        if (currentQuestionId !== null && questions.length > 0) {
        let newId: number;
        newId = (currentQuestionId === 1 ? questions[0].id : currentQuestionId - 1);
        setCurrentQuestionId(newId);
        setCurrentQuestion(questions[questions.findIndex((question: AIQuestion) => {
        return question.id === newId
        })])
        }
    }
    return (
        <div style={{width: "100%"}}>
            {loading ? (
                <div className="Loading-Screen">
                <img src="assets/Helpi Mascot (thinkingclear).png" alt="Loading Ozzie" style={{
                    width: "20%",
                    height: "20%",
                    margin: "30px",
                }}></img>
                <span style={{color: "var(--text-color-2)"}}>Ozzie is deciding what questions to ask...</span>
            </div>
            ) : ( <div>
                {setQuiz && hasFetched ? (
                    <Form.Group controlId="aiQuestions">
                      <Form.Label className="subtitle"></Form.Label>
                      <div className="AIQ-Question-Page">
              
                        <div className="AIQ-Question-Box">
                          <div className="AIQ-Question-Question">{currentQuestion?.body}
                            <div style={{ margin: "10px" }}>
                                <SpeechProvider>
                                    <ConvertToSpeech
                                        text = {currentQuestion?.body}
                                    />
                                </SpeechProvider>
                            </div> 
                          </div>
                          <div className="AIQ-Response-Input">
                            <Form.Control
                            style={{fontSize: "var(--small-text)"}}
                            as="textarea"
                            className = "Response"
                            rows={5}
                            value={currentQuestionId !== null ? answers[currentQuestionId - 1] || "" : ""}
                            placeholder="Type your response here"
                            onChange={updateResponse}/>
                          </div>
                          <ProgressBar progress={progress} setProgress={setProgress}></ProgressBar>
                        </div>
                        <div className="AIQ-Nav-Buttons">
                          <Button style={{ width: "45%", fontSize: "var(--small-text)" }} onClick={regressQuestion}>Previous</Button>
                          <Button style={{ width: "45%", fontSize: "var(--small-text)" }} onClick={advanceQuestion}>Next</Button>
                          <Button className="Submit-Button" disabled={progress !== 100} onClick={openPopup}>Submit</Button>
                        </div>
                      </div>
                    </Form.Group>
                ) : (<div></div>)}
                </div>
                )
            }
        </div>
    );
}