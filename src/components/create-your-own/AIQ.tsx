import {useState} from "react";
import {Form, Button} from "react-bootstrap";
import { SpeechProvider } from "../accessibility/SpeechContext";
import { ConvertToSpeech } from "../accessibility/TextToSpeech";
import "./AIQ.css"
import { AIQuestions} from "./AIQuestions";

interface AIQProps {
    setPage: (page: string) => void;
}

export function AIQuestionsPage({setPage}: AIQProps) {
    const [response, setResponse] = useState<string>("");
    const [quiz, setQuiz] = useState<boolean>(false);
    function updateResponse(e: React.ChangeEvent<HTMLInputElement>) {
        setResponse(e.target.value);
    }
    function handleSubmit() {
        setQuiz(true);

    }
    return (
        <div style={{maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
            <h1>Choose your Industry:</h1>
            <div className="Question-Box">      
            <div className = "Question-Page">
                <div className="Question-Box">
                <div className="AIQ-subtitle">{"What industry would you want to work in?"}
                <div style={{ margin: "10px" }}>
                    <SpeechProvider>
                        <ConvertToSpeech
                        text="What industry would you want to work in?"
                        />
                    </SpeechProvider>
                </div> 
            </div>
                <div className="Response-Box">
                <Form.Control
                as="textarea"
                className = "response-input"
                rows={5}
                value={response}
                placeholder="Type your response here"
                onChange={updateResponse}/>
                </div>
            </div>
            <Button className="Submit-Button" disabled={response === ""} onClick={handleSubmit}>Submit</Button>
            <AIQuestions industry={response} setQuiz={quiz}></AIQuestions>
            </div>
            </div>
        </div>
    );
}