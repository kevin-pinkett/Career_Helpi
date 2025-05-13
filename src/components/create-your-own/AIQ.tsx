import {useState} from "react";
import {Form, Button} from "react-bootstrap";
import { SpeechProvider } from "../accessibility/SpeechContext";
import { ConvertToSpeech } from "../accessibility/TextToSpeech";
import "./AIQ.css"
import { AIQuestions} from "./AIQuestions";
import { CompletedQuiz } from "../popup/CompleteQuiz";

interface AIQProps {
    setPage: (page: string) => void;
    setQuestions: (questions: string[]) => void;
    answers: string[];
    setAnswers: (answers: string[]) => void;
}

export function AIQuestionsPage({setPage, setQuestions, setAnswers, answers}: AIQProps) {
    const [response, setResponse] = useState<string>("");
    const [quiz, setQuiz] = useState<boolean>(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    function updateResponse(e: React.ChangeEvent<HTMLInputElement>) {
        setResponse(e.target.value);
    }
    function handleSubmit() {
        setQuiz(true);

    }
    return (
        <div style={{margin: "0 auto", padding: "20px" }}>
            <div>      
            <div className = "AIQ-Question-Page">
                <div className="AIQ-Question-Box">
                    <div className="AIQ-subtitle">{"What industry would you want to work in?"}
                        <div style={{ margin: "10px" }}>
                            <SpeechProvider>
                                <ConvertToSpeech
                                text="What industry would you want to work in?"
                                />
                            </SpeechProvider>
                        </div> 
                    </div> 
                    <div style={{fontSize: "var(--small-text)"}} className="AIQ-Response-Input">
                        <Form.Control
                        style={{fontSize: "var(--small-text)"}}
                        as="textarea"
                        className = "Response"
                        rows={5}
                        value={response}
                        placeholder="Type your response here"
                        onChange={updateResponse}/>
                    </div>
                </div>
                <div className="AIQ-Nav-Buttons"> 
                    <Button className="AIQ-Submit-Button" disabled={response === ""} onClick={handleSubmit}>Submit</Button> 
                </div>
            </div>
            <AIQuestions industry={response} setQuiz={quiz} openPopup={() => setIsPopupOpen(true)} setQuestionBodies={setQuestions} setAnswers={setAnswers} answers={answers}></AIQuestions>
            <CompletedQuiz isPopupOpen={isPopupOpen} closePopup={() => setIsPopupOpen(false)} setPage={setPage}></CompletedQuiz>
            </div>

        </div>
    );
}