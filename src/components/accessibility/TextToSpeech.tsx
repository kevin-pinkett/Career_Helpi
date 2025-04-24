import {useEffect, useState} from "react"
import { Button } from "react-bootstrap";

interface ConvertToSpeechProps{
    text: string;
}

export function ConvertToSpeech({text}: ConvertToSpeechProps) {
    const [isPlaying, setPlaying] = useState<boolean>(false);
    const [utterance, setUtterance] = useState<SpeechSynthesisUtterance|null>(null);

    const synth = window.speechSynthesis;

    useEffect(() =>{
        const newUtterance = new SpeechSynthesisUtterance(text);
        setUtterance(newUtterance);

        return () => {synth.cancel()};
    }, [synth, text]);

    function handlePlay(){
        if (utterance) {
            setPlaying(true);
            synth.speak(utterance);
        }
    }

    function handleStop(){
        if (isPlaying) {
            setPlaying(false);
            synth.cancel()
        }
    }
    
    return (<div>
        <Button onClick={isPlaying ? handleStop : handlePlay}>{synth.speaking ? "Stop" : "Play"}</Button>
    </div>);
}