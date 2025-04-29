import {useState} from "react";
import {Form} from "react-bootstrap";
import { SpeechProvider } from "../accessibility/SpeechContext";
import { ConvertToSpeech } from "../accessibility/TextToSpeech";
import "./AIQ.css"

interface AIQProps {
    setPage: (page: string) => void;
}

export function AIQuestionsPage({setPage}: AIQProps) {
    const [response, setResponse] = useState<string>("");
    function updateResponse(e: React.ChangeEvent<HTMLInputElement>) {
        setResponse(e.target.value);
    }
    return (
        <div className="AIQ">
            <h1>Choose your Industry:</h1>
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
        </div>
    )
}