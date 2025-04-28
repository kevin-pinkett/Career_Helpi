import {useEffect, useState} from "react"
import "./TextToSpeech.css";

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

        newUtterance.onstart = () => {
            console.log(newUtterance.text)
        }

        newUtterance.onend = () => {
            setPlaying(false);
        };

        return () => {synth.cancel()};
    }, [ text]);

    function handlePlay(){
        if (utterance) {
            setPlaying(true);
            window.speechSynthesis.speak(utterance);
        }
    }

    function handleStop(){
        if (isPlaying) {
            setPlaying(false);
            window.speechSynthesis.cancel()
        }
    }

    return (<div>
        <img className="play-button" onClick={isPlaying ? handleStop : handlePlay} alt = {isPlaying ? "⏹️" : "▶️"} src = {isPlaying ? "/assets/Pause.png" : "assets/Play.png"}></img>
    </div>);
}