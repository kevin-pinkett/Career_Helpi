import {useEffect, useState} from "react"
import "./TextToSpeech.css";

interface ConvertToSpeechProps{
    text: string;
}

let currentSetPlaying: ((playing: boolean) => void) | null = null;

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

        synth.addEventListener('cancel', () => {
            setPlaying(false);
        })

        return () => {synth.cancel()};
    }, [ text]);

    function handlePlay(){
        if (utterance) {
            window.speechSynthesis.cancel(); // <-- Cancel any currently playing speech first
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
        <img className="play-button" onClick={isPlaying ? handleStop : handlePlay} alt = {isPlaying ? "⏹️" : "▶️"} src = {isPlaying ? "assets/Pause.png" : "assets/Play.png"}></img>
    </div>);
}