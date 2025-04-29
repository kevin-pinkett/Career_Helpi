import { Button, } from "react-bootstrap";
import { SpeechProvider } from "../accessibility/SpeechContext";
import { ConvertToSpeech } from "../accessibility/TextToSpeech";

interface NavOptionProps {
    setPage: (page: string) => void;
    name: string;
    destination: string;
    text: string;
    buttonText: string;
  }

export function NavOption({setPage, name, destination, text, buttonText}: NavOptionProps) {
    return (
    <div>
      <div>
        <SpeechProvider>
          <ConvertToSpeech text = {`${name}. ${text}`}></ConvertToSpeech>
        </SpeechProvider>
        <p>{text}</p>
        <Button onClick={() => setPage(destination)}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
}