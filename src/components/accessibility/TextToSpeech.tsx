import {useEffect, useState} from "react"
import { Button } from "react-bootstrap";

interface ConvertToSpeechProps{
    text: string;
}

export function ConvertToSpeech({text}: ConvertToSpeechProps) {
    const [isPlaying, setPlaying] = useState<boolean>(false);
    const [utterance, setUtterance] = useState<SpeechSynthesisUtterance|null>(null);

    useEffect(() =>{
        const synth = window.speechSynthesis;
        const newUtterance = new SpeechSynthesisUtterance(text);
        setUtterance(newUtterance);

        return () => {synth.cancel()};
    }, [text]);

    function handlePlay(){
        if (utterance) {
            setPlaying(true);
            window.speechSynthesis.speak(utterance);
        }
    }
    
    function handlePause(){
        if (isPlaying){
            setPlaying(false);
            window.speechSynthesis.pause();
        }
    }

    function handleStop(){
        if (isPlaying) {
            setPlaying(false);
            window.speechSynthesis.cancel()
        }
    }
    return (<div>
        <Button onClick={handlePlay}>Play</Button>
        <Button onClick={handlePause}>Pause</Button>
        <Button onClick={handleStop}>Stop</Button>
    </div>);
}