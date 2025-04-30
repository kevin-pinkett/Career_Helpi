import {useState, useEffect } from "react";
import { getGPTResponse } from "../../AIQIntegration";
import { AIQuestion } from "../../interfaces/ai-question";
import { Form, Button } from "react-bootstrap";
import { ProgressBar } from "../progress-bar/progressBar";
import { SpeechProvider } from "../accessibility/SpeechContext";
import { ConvertToSpeech } from "../accessibility/TextToSpeech";

interface AIQuestionProps {
    industry: string;
    setQuiz: boolean;
}
export function AIQuestions({industry, setQuiz}: AIQuestionProps): React.JSX.Element {
    const [questions, setQuestions] = useState<AIQuestion[]>([]);
    const [hasFetched, setHasFetched] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState<AIQuestion | null>(null);
    const [currentQuestionId, setCurrentQuestionId] = useState<number | null>(null);
    const [answers, setAnswers] = useState<string[]>([]);
    const [progress, setProgress] = useState<number>(0);
    //const [response, setResponse] = useState<string>("")
    useEffect(() => {
        if (questions.length > 0) {
            setCurrentQuestion(questions[0]);
            setCurrentQuestionId(questions[0].id);
            setAnswers(new Array(questions.length).fill(""));
        }
    }, [questions])

    const [loading, setLoading] = useState<boolean>(false);
    
    useEffect(() => {
        const fetchQuestions = async () => {
            setLoading(true);
            try {
                const response = await getGPTResponse(industry);
                const new_questions = response.map((question: AIQuestion) => question);
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
    }, [industry, setQuiz, hasFetched]);

    useEffect(() => {
        if (progress < 100 && questions.length > 0) {
          const answeredQuestions = answers.filter(answer => answer !== "").length; 
          const newProgress = (answeredQuestions/questions.length) * 100;
          setProgress(newProgress);
          }
          }, [answers, questions.length, progress]);

    const handleAnswerChange = (q_index: number, response: string) => {
        const newAnswers = [...answers];
        newAnswers[q_index] = response;
        setAnswers(newAnswers);
    }

    function updateResponse(e: React.ChangeEvent<HTMLInputElement>) {
        if (currentQuestionId !== null) {
            handleAnswerChange(currentQuestionId-1, e.target.value);
        }
        //setResponse(response + e.target.value);
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
        <div>
            {loading ? (
                <div className="Loading-Screen">
                <img src="assets/Helpi Mascot (thinkingclear).png" alt="Loading Ozzie" style={{
                    width: "25%",
                    height: "25%",
                    margin: "30px",
                }}></img>
                <span>Ozzie is deciding what questions to ask...</span>
            </div>
            ) : ( <div>
                {setQuiz && hasFetched ? (
                    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
                    <Form.Group controlId="aiQuestions">
                      <Form.Label className="subtitle"></Form.Label>
                      <div className="AIQ-Question-Page">
              
                        <div className="AIQ-Question-Box">
                          <div className="AIQ-Question-Question">{currentQuestion?.body}
                            <div style={{ margin: "10px" }}>
                                <SpeechProvider>
                                    <ConvertToSpeech
                                        text = {currentQuestion?.body ?? null}
                                    />
                                </SpeechProvider>
                            </div> 
                          </div>
                          <div className="AIQ-Response-Input">
                            <Form.Control
                            as="textarea"
                            className = "Response"
                            rows={5}
                            value={currentQuestionId !== null ? answers[currentQuestionId - 1] || "" : ""}
                            placeholder="Type your response here"
                            onChange={updateResponse}/>
                            
                          </div>
                        </div>
                        <div className="Nav-Buttons">
                          <Button style={{ width: "45%" }} onClick={regressQuestion}>Previous</Button>
                          <Button style={{ width: "45%" }} onClick={advanceQuestion}>Next</Button>
                          <Button className="Submit-Button" disabled={progress !== 100}>Submit</Button>
                        </div>
                      </div>
                    </Form.Group>
                    <ProgressBar progress={progress} setProgress={setProgress}></ProgressBar>
                  </div>
                ) : (<div></div>)}
                </div>
                )
            }
        </div>
    );
}